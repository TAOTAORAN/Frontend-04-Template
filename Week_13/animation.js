/* js处理帧的常用方式

// 可控性不太好 不建议使用
 setInterval (() => {}, 16)

 let tick = () => {
    setTimeout (tick, 16);
 }

 let tick = () => {
     // 浏览器执行下一帧的时候执行这段代码
     // 与浏览器帧率相关 如果浏览器降帧 requestAnimationFrame也会随之降低触发频率
    let handler = requestAnimationFrame(tick);
    cancelAnimationFrame(handler);
 }
 */
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick_handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start");
const PAUSE_START = Symbol("pause_start");
const PAUSE_TIME = Symbol("pause_time");

export class TimeLine {
    constructor () {
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }
    start () {
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () => {
            let now = Date.now();
            for (let animation of this[ANIMATIONS]) {
                let t;
                if (this[START_TIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME] - animation.delay;
                } else {
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
                }
                if (animation.duration < t) {
                    this[ANIMATIONS].delete(animation);
                    t = animation.duration;
                }
                if (t > 0)
                    animation.receive(t);
            }
            console.log("tick");
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }
    pause () {
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume () {
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }
    reset () {
        this.pause();
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        let startTime = Date.now();
        this[TICK_HANDLER] = null;
        this[PAUSE_START] = 0;
        this[PAUSE_TIME] = 0;
    }
    add (animations, startTime) {
        // 如果参数个数小于2
        if (arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animations);
        this[START_TIME].set(animation, startTime);
    }
    remove () {}
}

export class Animation {
    constructor (object, property, startVal, endVal, duration, delay, timingFunction, template) {
        timingFunction = timingFunction || (v => v);
        template = template || (v => v);
        this.object = object;
        this.property = property;
        this.startVal = startVal;
        this.endVal = endVal;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        this.template = template;
    }

    receive (time) {
        let range = this.startVal - this.endVal;
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startVal + range * progress);
    }
}