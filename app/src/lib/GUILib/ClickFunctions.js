const shortClickLength = 300

export function setupSingleClick(el, fn) {
    el.addEventListener("mousedown", startClickTimer)
    el.addEventListener("mouseup", endClickTimer)
    el.onShortClick = fn
}

let clickStart
function startClickTimer() {
    clickStart = +new Date();
}

let clickEnd
function endClickTimer(e) {
    clickEnd = +new Date();
    if (clickEnd - clickStart < shortClickLength) {
        for (const clickedElement of e.path) clickedElement.onShortClick?.()
    }
}