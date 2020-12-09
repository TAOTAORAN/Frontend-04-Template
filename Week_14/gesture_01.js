/**
 * 抽象出mouse和gesture的滑动
 */

let element = document.documentElement;

// mouse
element.addEventListener("mousedown", e => {
    start(e);
    let mousemove = e => {
        move(e);
    }
    let mouseup = e => {
        move(e);
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseup);
    }
    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
});

// gesture
/* 与mouse区别：
    1. 同时触发
    2. 支持多点
*/
element.addEventListener("touchstart", e => {
    for (let touch of e.changedTouches) {
        start(touch);
    }
});
element.addEventListener("touchmove", e => {
    for (let touch of e.changedTouches) {
        move(touch);
    }
});
element.addEventListener("touchend", e => {
    for (let touch of e.changedTouches) {
        end(touch);
    }
});
element.addEventListener("touchcancel", e => {
    // 与touchend的区别：异常结束的touch
    // 比如手指在屏幕上移动，touchmove弹窗打断了
    for (let touch of e.changedTouches) {
        cancel(touch);
    }
});

let handler;
let startX, startY;
// pan来源于摄影术语 表示平移摄像机 此处表示触点的移动
let isPan, isTap = true, isPress = false;

let start = (point) => {
    startX = point.clientX, startY = point.clientY;
    isPan = false;
    // 直接触发一次点击tap
    isTap = true;
    isPress = false;
    // 超过0.5s被认为是长按press 而不是点击
    handler = setTimeout(() => {
        console.log("press");
        isTap = false;
        isPan = false;
        isPress = true;
        // 防止多次clearTimeout导致异常
        handler = null;
    }, 500);
}
let move = (point) => {
    let dx = point.clientX - startX, dy = point.clientY - startY;
    // 允许move 10px的误差 (经验值：一倍屏5px，二倍屏10px，三倍屏15px)
    // 超过10px 被认为进入Pan状态
    if (!isPan && (dx + dy) ** 2 > 100) {
        isTap = false;
        isPan = true;
        isPress = false;
        console.log("panStart");
    }
    if (isPan) {
        console.log("isPan");
        clearTimeout(handler);
    }
}
let end = (point) => {
    if (isTap) {
        console.log("tap end");
        clearTimeout(handler);
    }
    if (isPan) {
        console.log("pan end");
    }
    if (isPress) {
        console.log("press end");
    }
    console.log("end");
}
let cancel = (point) => {
    clearTimeout(handler);
    console.log("cancel");
}