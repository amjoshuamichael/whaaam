export default function (el, onGrab, onDrag, onDrop) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = grab;

    function grab(e) {
        e.preventDefault()

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmousemove = drag;
        document.onmouseup = drop;

        if (onGrab !== undefined) onGrab()
    }

    function drag(e) {
        e.preventDefault()

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";

        if (onDrag !== undefined) onDrag()
    }

    function drop() {
        document.onmouseup = null;
        document.onmousemove = null;

        if (onDrop !== undefined)  onDrop()
    }
}