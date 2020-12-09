/**
 * 1.全局变量的优化
 * 考虑到手势可能有多个手指
 * 鼠标有左右键等等的区分(浏览器模型里 至少支持五个键的down&up)
 * 表示状态的变量用全局的显然不合适
 * 2.
 */
let element = document.documentElement;

element.addEventListener("mousedown", e => {
    // 养成这也创建object的习惯 避免object的原始属性添乱
    let context = Object.create(null);
    contexts.set("mouse" + (1 << e.button), context);
    start(e, context);

    let mousemove = e => {
        let button = 1;
        // 由于e.buttons得到掩码的形式的按键码
        // 因此以移位操作遍历掩码 由此得到按下哪些按键
        while (button <= e.buttons) {
            if (button & e.buttons) {
                let context = contexts.get("mouse" + button);
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
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseup);
    }
    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
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

// 被优化的全局变量
// let handler;
// let startX, startY;
// let isPan, isTap = true, isPress = false;

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