# @barbieswimcrew/stimulus-components
This package contains a list of useful stimulus components that can be conveniently reused in numerous projects.

## Components
- [AjaxSortable](src/controllers/ajax-sortable) - This component uses "Stimulus Sortable" and sends an ajax request "onUpdate" to save the changed items order.
- [DirtyForm](src/controllers/dirty-form) - If there is a form on the current page, this component checks if there are unsaved changes and warns the user when leaving the page that the changes will be lost.
- [ThemeSwitch](src/controllers/theme-switch) - Provides a function to switch the theme between "light" and "dark" and stores the selected configuration in the localStorage.

## Installation

`yarn add @barbieswimcrew/stimulus-components`

## Usage
To use one of the included controllers simply consume in bootstrap.js as follows:

```js
import { startStimulusApp } from "@symfony/stimulus-bridge";
//...
import ThemeSwitchController from "@barbieswimcrew/stimulus-components/src/controllers/theme-switch/theme_switch";
//...
export const app = startStimulusApp(
    require.context(
        "@symfony/stimulus-bridge/lazy-controller-loader!./controllers",
        true,
        /\.(j|t)sx?$/
    )
);
//...
app.register("theme-switch", ThemeSwitchController);
//...

```
