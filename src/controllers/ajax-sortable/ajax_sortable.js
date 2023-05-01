"use strict";

import Sortable from 'stimulus-sortable';

/* stimulusFetch: 'lazy' */
export default class AjaxSortableController extends Sortable {

    static values = {
        itemsSelector: String,
        url: String
    }

    async onUpdate({item: t, newIndex: a}) {

        const items = this.element.querySelectorAll(this.itemsSelectorValue);
        const imageIds = [];
        
        items.forEach((item, index) => imageIds.push(item.dataset.sortableItemId));

        const request = new Request(this.urlValue, {
            body: JSON.stringify(imageIds),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            method: 'PATCH'
        });

        fetch(request)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error.message);
            })
    }
}

