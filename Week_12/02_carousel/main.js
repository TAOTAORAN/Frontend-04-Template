import { Component, creatElement } from "./framework.js"

class Carousel extends Component {
    constructor () {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute (name, value) {
        this.attributes[name] = value;
    }
    render () {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this.attributes.src) {
            // img默认是可拖拽，建议使用div
            // let child = document.createElement("img");
            let child = document.createElement("div");
            // child.src = record;
            child.style.backgroundImage = `url(${record})`;
            this.root.appendChild(child);
        }

        let position = 0;
        // 鼠标拖动轮播
        this.root.addEventListener("mousedown", e => {
            console.log("mousedown");
            let startX = e.clientX;
            let children = this.root.children;
            let move = e => {
                let x = e.clientX - startX;
                let current = position - Math.round((x - x % 500) / 500);
                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    // 循环取数小技巧
                    pos = (pos + children.length) % children.length;
                    child[pos].style.transition = "none";
                    child[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
                }
                console.log("move");
                // for (let child of children) {
                //     child.style.transition = "none";
                //     child.style.transform = `translateX(${-position * 500 + x}px)`;
                // }
            }
            let up = e => {
                console.log("up");
                let x = e.clientX - startX;
                position = position - Math.round(x / 500);
                for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    child[pos].style.transition = "none";
                    child[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`;
                }
                // this.root.removeEventListener("mousemove", move);
                // this.root.removeEventListener("mouseup", up);
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }
            // this.root.addEventListener("mousemove", move);
            // this.root.addEventListener("mouseup", up);
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });

        // 自动轮播
        /*
        let currentIndex = 0;
        setInterval(()=>{
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;
            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translate(${100 - nextIndex * 100}%)`;

            setTimeout (() => {
                next.style.transition = "";
                current.style.transform = `translate(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translate(${- nextIndex * 100}%)`;
                currentIndex = nextIndex;
            }, 16);
        }, 3000);
        */
        return this.root;
    }
    mountTo (parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];

let a = <Carousel src={d}/>

a.mountTo(document.body);