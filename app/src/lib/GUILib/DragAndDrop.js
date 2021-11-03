import '../Utilities/ClipAccess'

export default function (handle, item) {
    let xDiff = 0, yDiff = 0, xPos = 0, yPos = 0;
    handle.onmousedown = grab;


    function grab(e) {
        e.preventDefault()
        handle.onGrab?.(xPos, yPos, xDiff, yDiff)

        if (handle.dragX) xPos = e.clientX
        if (handle.dragY) yPos = e.clientY

        document.onmousemove = drag
        document.onmouseup = drop
    }

    function drag(e) {
        e.preventDefault()
        handle.onDrag?.(xPos, yPos, xDiff, yDiff)

        if (handle.dragX) {
            xDiff = xPos - e.clientX
            xPos = e.clientX
        }

        if (handle.dragY) {
            yDiff = yPos - e.clientY
            yPos = e.clientY
        }

        if (item == undefined) return

        if (handle.dragX) item.style.left = (item.offsetLeft - xDiff) + "px"
        if (handle.dragY) item.style.top = (item.offsetTop - yDiff) + "px"
    }

    function drop() {
        handle.onDrop?.(xPos, yPos, xDiff, yDiff)

        document.onmouseup = null
        document.onmousemove = null
    }
}