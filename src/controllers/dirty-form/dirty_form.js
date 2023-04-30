"use strict";

import { Controller } from "@hotwired/stimulus";
import DirtyForm from "dirty-form";

/* stimulusFetch: 'lazy' */
export default class DirtyFormController extends Controller {
    connect() {
        if (this.element.nodeName !== "BODY") {
            throw new Error(
                "This controller needs to be connected to the <body> element!"
            );
        }

        const forms = this.element.querySelectorAll("form");

        for (const form of forms) {
            new DirtyForm(form);
        }
    }
}

