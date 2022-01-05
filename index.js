export default function joystick(el, options = {}) {

    const joystick = document.querySelector(el);
    const joystickHeight = joystick.offsetHeight;
    const joystickWidth = joystick.offsetWidth;
    const resetOnStop = options.resetOnStop || false;
    const precision = options.precision || false;

    // TODO
    // 1. Multi-touch support
    // 2. Vertical or horizonal only
    // 3. Fix rouding, default to 0 decimals
    // 4. Validate min / max

    let dragging = false;

    let x = {
        min: options.minX || options.min || 0,
        max: options.maxX || options.max || 100,
        value: 0
    }

    let y = {
        min: options.minY || options.min || 0,
        max: options.maxY || options.max || 100,
        value: 0
    }

    // Create and append stick
    const stick = document.createElement("span");
    stick.classList.add("stick");
    joystick.appendChild(stick);

    // Define all listeners, for mouse and touch
    joystick.addEventListener("mouseup", (e) => {
        reset(e);
    });
    joystick.addEventListener("mousedown", (e) => {
        dragging = true;
    });
    joystick.addEventListener("mousemove", (e) => {
        move(e);
    });

    joystick.addEventListener("touchend", (e) => {
        e.preventDefault();
        reset(e);
    });
    joystick.addEventListener("touchstart", (e) => {
        e.preventDefault();
        dragging = true;
    });

    joystick.addEventListener("touchmove", (e) => {
        e.preventDefault();
        move(e);
    });

    let move = (e) => {

        if (!dragging) {
            return;
        }

        let offsetX;
        let offsetY;
        // Determine mouse or touch
        if (typeof e.touches !== 'undefined') {
            var bcr = e.target.getBoundingClientRect();
            offsetX = e.targetTouches[0].clientX - bcr.x;
            offsetY = e.targetTouches[0].clientY - bcr.y;
        } else {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
        }

        // Move stick relative to joystick offset and mouse position
        stick.style.left = offsetX + "px";
        stick.style.top = offsetY + "px";

        // Joystick dimensions
        let yPercentage = (offsetY / joystickHeight) * 100;
        let xPercentage = (offsetX / joystickWidth) * 100;

        // val = ((percentage * (max - min) / 100) + min)
        x.value = (xPercentage * (x.max - x.min)) / 100 + x.min;
        y.value = (yPercentage * (y.max - y.min)) / 100 + y.min;

        // Dispatch input change event
        joystick.dispatchEvent(new CustomEvent("change", { detail: getValues() }));
    };

    let reset = (e) => {

        // Stop dragging
        dragging = false;

        if (!resetOnStop) {
            return;
        }
        // Reset range sliders to center position
        x.value = (x.min + x.max) / 2;
        y.value = (y.min + y.max) / 2;

        // Reset stick to center position
        stick.style.left = joystick.offsetWidth / 2 + "px";
        stick.style.top = joystick.offsetHeight / 2 + "px";

        joystick.dispatchEvent(new CustomEvent("change", { detail: getValues() }));
    };

    let getValues = () => {
        let xValue = x.value;
        let yValue = y.value;

        if (precision) {
            xValue = x.value.toFixed(precision);
            yValue = y.value.toFixed(precision);
        }

        return { x: xValue, y: yValue }
    };
}