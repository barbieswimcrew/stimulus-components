"use strict";

import {Controller} from "@hotwired/stimulus";

/* stimulusFetch: 'lazy' */
export default class extends Controller {
    close() {
        this.element.close();
    }
}
