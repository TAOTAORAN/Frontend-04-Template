// https://www.w3.org/TR/
// https://www.cnblogs.com/wphl-27/p/10336591.html

const standards = Array.prototype.slice.call(document.querySelector("#container").children).filter(e => e.getAttribute("data-tag").match(/css/)).map(e => ({
        name: e.children[1].innerText,
        url: e.children[1].children[0].href,
    }));

let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

function happen (element, event) {
    return new Promise(function (resolve) {
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}

void async function () {
    for (let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();