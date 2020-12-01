import { TimeLine, Animation } from "./animation";

let tl = new TimeLine();
tl.start();
tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 100, 1000, null, 0, v => `translateX(${v}px)`));
document.querySelector("#pause-btn").addEventListener("click", () => tl.pause());
document.querySelector("#resume-btn").addEventListener("click", () => tl.resume());