"use strict";

import { Controller } from "@hotwired/stimulus";

/**
 * This stimulus controller makes it easy to fetch html from any URL to display in a modal window.
 *
 * Usage:
 * ==============================================
 * Register the controller once to the <body> tag:
 *
 * <body {{ stimulus_controller('ajax-modal') }}>
 *
 * Add a <template> tag and define the <dialog> inside of it. Register both, the template and the dialog, as targets:
 *
 * <template {{ stimulus_target('ajax-modal', 'template') }}>
 *     <dialog class="p-0 rounded shadow-lg"
 *             {{ stimulus_target('ajax-modal', 'dialog') }}>
 *         <svg class="animate-spin h-8 w-8 m-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
 *             <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
 *             <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
 *         </svg>
 *     </dialog>
 * </template>
 *
 * Add a stimulus action to a button as shown below and set the url which shall be fetched via ajax:
 *
 * <button {{ stimulus_action('ajax-modal', 'open', 'click', {
 *    url: 'https://www.google.de'
 * }) }}>Click here</button>
 *
 * To close the modal, create a button in the html response and register the closing action as follows:
 *
 * <button {{ stimulus_action('ajax-modal', 'close') }}>Close modal</button>
 * 
 * To submit a <form> inside the modal to retrieve new HTML content just add the submit action to the form as follows:
 * 
 * <form action="/some/url" method="POST" {{ stimulus_action('ajax-modal', 'submit', 'submit') }}>
 */

/* stimulusFetch: 'lazy' */
export default class AjaxModalController extends Controller {
    static targets = ["template", "dialog", "trigger"];

    static values = {
        closeOnOutsideClick: {
            type: Boolean,
            default: false,
        },
    };

    connect() {
        if (this.element.nodeName !== "BODY") {
            throw new Error(
                "This controller needs to be connected to the BODY!"
            );
        }
    }

    templateTargetConnected(template) {
        this.element.insertAdjacentHTML("beforeend", template.innerHTML);
    }

    dialogTargetConnected(dialog) {
        if (this.closeOnOutsideClickValue) {
            dialog.onclick = (e) => {
                if (e.target.nodeName === "DIALOG") this.close();
            };
        }

        // we need to register to the cancel event to make sure
        // the same things happen as at the "usual" close event
        dialog.oncancel = () => {
            this.close();
        };
    }

    open(e) {
        // only open modal if not already open
        if (this.dialogTarget.open === false) {
            this.dialogTarget.showModal();
        }

        this._fetchAndReplaceHTML(e.params.url, 'GET');
    }

    close() {
        this.dialogTarget.close();

        // reset the dialogs default content
        this.dialogTarget.innerHTML =
            this.templateTarget.content.querySelector("dialog").innerHTML;
    }

    submit(e) {
        e.preventDefault();

        const element = e.currentTarget;

        if (element.nodeName !== "FORM") {
            throw new Error(
                "This action needs to be connected to a <form> element!"
            );
        }

        this._fetchAndReplaceHTML(element.action, element.method);
    }

    _fetchAndReplaceHTML(url, method) {
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            method: method,
        })
            .then((response) => response.text())
            .then((data) => {
                this.dialogTarget.innerHTML = data;
            });
    }
}
