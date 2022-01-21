
# joystick-js
Configurable javascript based joystick used for vitrualy controlling entities from a webbased page.

## Documentation
You can find the documentation [here](https://gusdeboer.github.io/joystick-js/docs/)

## Install
```npm install @gusdeboer/joystick-js```

## Basic usage
```js
import joystick from '../index.js'; 

joystick("#joystick");
```

## Options
```js
import joystick from '../index.js'; 

joystick("#joystick", {
    min: 0,             // Override default min value, applies to both x and y
    max: 100,           // Override default max value, applies to both x and y
    minY: -50,          // Specific Y axis min value
    maxY: 50,           // Specific Y axis max value
    minX: -50,          // Specific X axis min value
    maxX: 50,           // Specific X axis min value
    snapBack: false,    // Disables snapping back on release
    round: false,       // Disable output round
    precision: 2,       // Apply precision on output value
    disableX: true,     // Disable x axis value output and stick movement
    disableY: true      // Disable y axis value output and stick movement
});
```

## Basic styling
```css
.joystick {
    height: 200px;
    width: 200px;
    display: inline-block;
    border: 3px solid white;
    position: relative;
    border-radius: 100%;
    display: inline-block;
}

.joystick span.stick {
    position: absolute;
    height: 30%;
    width: 30%;
    background: white;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    pointer-events: none !important;
}
```
