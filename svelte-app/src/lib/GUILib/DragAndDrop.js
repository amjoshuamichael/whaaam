import '../Utilities/ClipAccess'

export default function (handle, item, type = "move") {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = grab;

    function grab(e) {
        e.preventDefault()
        handle.onGrab?.()

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmousemove = drag;
        document.onmouseup = drop;
    }

    function drag(e) {
        e.preventDefault()
        handle.onDrag?.()

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if (item == undefined) return

        let clip
        switch(type) {
            case "move":
                item.style.left = (item.offsetLeft - pos1) + "px"
                item.style.top = (item.offsetTop - pos2) + "px"
                break
            case "resize-left":
                clip = item.clip()
                item.style.clip = `rect(${clip.top}, ${clip.right}px, ${clip.bottom}px, ${clip.left - pos1}px)`
                console.log(clip.left)
                break
            case "resize-right":
                clip = item.clip()
                item.style.clip = `rect(${clip.top}, ${clip.right - pos1}px, ${clip.bottom}px, ${clip.left}px)`
        }
    }

    function drop() {
        handle.onDrop?.()

        document.onmouseup = null;
        document.onmousemove = null;
    }
}