function creatElement (type, attribute, ...children) {
    let element;
    if (typeof type === "string") {
        // element = document.createElement(type);
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    for (let name in attribute) {
        element.setAttribute(name, attribute[name]);
    }
    for (let child of children) {
        if (typeof child === "string") {
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

class ElementWrapper {
    constructor (content) {
        this.root = document.createTextNode(content);
    }
    setAttribute (name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild (child) {
        // this.root.appendChild(child);
        child.mountTo(this.root);
    }
    mountTo (parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper {
    constructor (type) {
        this.root = document.createElement(type);
    }
    setAttribute (name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild (child) {
        // this.root.appendChild(child);
        child.mountTo(this.root);
    }
    mountTo (parent) {
        parent.appendChild(this.root);
    }
}

class Div {
    constructor () {
        this.root = document.createElement("div");
    }
    setAttribute (name, value) {
        this.root.setAttribute(name, value);
    }
    appendChild (child) {
        child.mountTo(this.root);
    }
    mountTo (parent) {
        parent.appendChild(this.root);
    }
}

// let a = <div id="a">
//     <span>1</span>
//     <span>2</span>
//     <span>3</span>
// </div>

// document.body.appendChild(a);

let a = <Div id="a">
    <span>1</span>
    <span>2</span>
    <span>3</span>
</Div>

// a.mountTo(document.body);