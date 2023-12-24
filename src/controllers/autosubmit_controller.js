import { Controller } from "@hotwired/stimulus";
import debounce from 'debounce';

/* stimulusFetch: 'lazy' */
export default class AutoSubmitController extends Controller {

    static values = {
        time: {
            type: Number,
            default: 300
        }
    }

    initialize() {
        this.debouncedSubmit = debounce(
            this.debouncedSubmit.bind(this),
            this.timeValue
        );
    }

    submit(e) {
        this.element.requestSubmit();
    }

    debouncedSubmit() {
        this.submit();
    }
}
