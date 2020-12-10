/**
 * 新增事件派发
 */
let element = document.documentElement;
let isListeningMouse = false;

element.addEventListener("mousedown", e => {
    let context = Object.create(null);
    contexts.set("mouse" + (1 << e.button), context);
    start(e, context);

    let mousemove = e => {
        let button = 1;
        while (button <= e.buttons) {
            if (button & e.buttons) {
                let key;
                if (button === 2)
                    key = 4;
                else if (button === 4)
                    key = 2;
                else 
                    key = button;
                let context = contexts.get("mouse" + key);
                move(e, context);
            } 
            button = button << 1;
        }
        contexts.get("mouse" + e.button);
        move(e);
    }
    let mouseup = e => {
        let context = contexts.get("mouse" + (1 << e.button));
        end(e, context);
        contexts.delete("mouse" + (1 << e.button));
        move(e);
        if (e.buttons === 0) {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            isListeningMouse = false;
        }
    }
    if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
    }
});

let contexts = new Map();

element.addEventListener("touchstart", e => {
    for (let touch of e.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
});
element.addEventListener("touchmove", e => {
    for (let touch of e.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
});
element.addEventListener("touchend", e => {
    for (let touch of e.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
});
element.addEventListener("touchcancel", e => {
    for (let touch of e.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch);
        contexts.delete(touch.identifier);
    }
});

let start = (point, context) => {
    context.startX = point.clientX, startY = point.clientY;
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;
    context.handler = setTimeout(() => {
        console.log("press");
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context. handler = null;
    }, 500);
}
let move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if (!isPan && (dx + dy) ** 2 > 100) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log("panStart");
    }
    if (context.isPan) {
        console.log("isPan");
        clearTimeout(context.handler);
    }
}
let end = (point, context) => {
    if (context.isTap) {
        console.log("tap end");
        dispatch("tap", {});
        clearTimeout(context.handler);
    }
    if (context.isPan) {
        console.log("pan end");
    }
    if (context.isPress) {
        console.log("press end");
    }
    console.log("end");
}
let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log("cancel");
}
// 事件派发
function dispatch (type, properties) {
    // or new CustomEvent
    let event = new Event(type);
    for (let name of properties) {
        event[name] = properties[name];
    }
    event.dispatchEvent(event);
    console.log(event);
}