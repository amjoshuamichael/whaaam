const shortClickLength = 300
let clicking

export function setupSingleClick(el, fn) {
    el.addEventListener("mousedown", startClickTimer)
    el.addEventListener("mouseup", endClickTimer)
    el.onShortClick = fn
}

function removeClickDetectionEvent() {
    el.removeEventListener("mousedown", startClickTimer)
    el.removeEventListener("mouseup", endClickTimer)
}

let clickStart
function startClickTimer() {
    clickStart = +new Date();
}

let clickEnd
function endClickTimer(e) {
    clickEnd = +new Date();
    if (clickEnd - clickStart < shortClickLength) {
        e.path.forEach(el => {
            el.onShortClick?.()
        })
    }
}