"use strict";

import {Controller} from "@hotwired/stimulus";

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    close() {
        this.dispatch('close');

        if (this.element instanceof HTMLDialogElement) {
            this.element.close();
        } else {
            this.element.remove();
        }
    }
}
