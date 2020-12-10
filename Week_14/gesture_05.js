/**
 * 封装
 */
let element = document.documentElement;

export class Dispatcher {
    constructor (element) {
        
    }
    dispatch (type, properties) {
        let event = new Event(type);
    for (let name of properties) {
        event[name] = properties[name];
    }
    event.dispatchEvent(event);
    console.log(event);
    }
}

/**
 * 解耦：
 * 以上功能可以分为三个部分：listen => recognized => dispatch
 * 
 * new Listener(new Recognizer(new Dispatcher))
 */

 export class Listener {
     constructor (element, recognized) {
        let isListeningMouse = false;
        let contexts = new Map();

        element.addEventListener("mousedown", e => {
            let context = Object.create(null);
            contexts.set("mouse" + (1 << e.button), context);
            recognized(e, context);
        
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
                recognized(e);
            }
            let mouseup = e => {
                let context = contexts.get("mouse" + (1 << e.button));
                recognized(e, context);
                contexts.delete("mouse" + (1 << e.button));
                recognized(e);
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
        
        element.addEventListener("touchstart", e => {
            for (let touch of e.changedTouches) {
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognized(touch, context);
            }
        });
        element.addEventListener("touchmove", e => {
            for (let touch of e.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognized(touch, context);
            }
        });
        element.addEventListener("touchend", e => {
            for (let touch of e.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognized(touch, context);
                contexts.delete(touch.identifier);
            }
        });
        element.addEventListener("touchcancel", e => {
            for (let touch of e.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognized(touch);
                contexts.delete(touch.identifier);
            }
        });
     }
 }

 export class Recognizer {
    constructor (dispatcher) {
        this.dispatcher = dispatcher;
    }
    start(point, context) {
        context.startX = point.clientX, startY = point.clientY;
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY,
        }]
    
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
    move(point, context){
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (!isPan && (dx + dy) ** 2 > 100) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            this.dispatcher.dispatch("panStart", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
            })
            console.log("panStart");
        }
        if (context.isPan) {
            this.dispatcher.dispatch("pan", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
            })
            // console.log("isPan");
            clearTimeout(context.handler);
        }
    
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY,
        });
    }
    end(point, context){
        if (context.isTap) {
            console.log("tap end");
            this.dispatcher.dispatch("tap", {});
            clearTimeout(context.handler);
        }
        if (context.isPress) {
            this.dispatcher.dispatch("press end", {});
            console.log("press end");
        }
        console.log("end");
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        let v, d;
        if (!context.points.length) {
            v = 0;
        }
        d = Math.sqrt((point.clientX - contexts.points[0].x) ** 2 + (point.clientY - contexts.points[0].y) ** 2);
        v = d / (Date.now() - context.points[0].t)
        
        if (v > 1.5) {
            // console.log("flick");
            this.dispatcher.dispatch("flick", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                velocity: v,
            })
            context.ifFlick = true;
        } else {
            context.ifFlick = false;
        }
        if (context.isPan) {
            // console.log("pan end");
            this.dispatcher.dispatch("pan end", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                ifFlick: context.ifFlick,
            })
        }
    }
    cancel(point, context){
        clearTimeout(context.handler);
        // console.log("cancel");
        this.dispatcher.dispatch("cancel", {});
    }
 }

 export function enableGesture (element) {
    new Listener(element, new Recognizer(new Dispatcher(element)));
 }