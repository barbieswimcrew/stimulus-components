'use strict';

import { Controller } from "@hotwired/stimulus";
import tippy from "tippy.js"

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-subtle.css';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static values = {
        animation: {
            type: String,
            default: 'shift-away-subtle'
        },
        content: {
            type: String,
            default: 'Marker'
        }
    };

    connect() {
        tippy(this.element, {
            animation: this.animationValue,
            content: this.contentValue,
            hideOnClick: false,
        });
    }
}
