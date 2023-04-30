# @barbieswimcrew/stimulus-components
This package contains a list of useful stimulus components that can be conveniently reused in numerous projects.

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
