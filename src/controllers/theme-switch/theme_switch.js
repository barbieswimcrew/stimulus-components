"use strict";

import { Controller } from "@hotwired/stimulus";

const CLS_DARK_MODE = "dark";

/* stimulusFetch: 'lazy' */
export default class ThemeSwitchController extends Controller {
    connect() {
        if (this.element.nodeName !== "HTML") {
            throw new Error(
                "This controller needs to be connected to the HTML!"
            );
        }

        // manually set theme as fallback if user did not set before
        if (localStorage.darkMode === undefined) {
            localStorage.darkMode = window
                .matchMedia("(prefers-color-scheme: dark)")
                .matches.toString();
        }
    }

    toggle() {
        if (localStorage.darkMode === "true") {
            localStorage.darkMode = "false";
            this.element.classList.remove(CLS_DARK_MODE);
        } else {
            localStorage.darkMode = "true";
            this.element.classList.add(CLS_DARK_MODE);
        }
    }
}

