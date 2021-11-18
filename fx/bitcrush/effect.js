export const effectName = 'bitcrush'

export function loadGUI(el) {
    const verticalLineCount = Math.floor(el.clientWidth / 65)
    const verticalLineContainer = $(el).find('.horizontal.lines')
    for (let _ = 0; _ < verticalLineCount - 1; _++)
        $(el).find('.horizontal.line:first').clone().appendTo(verticalLineContainer)

    const horizontalLineCount = 3
    const horizontalLineContainer = $(el).find('.vertical.lines')
    for (let _ = 0; _ < horizontalLineCount - 1; _++)
        $(el).find('.vertical.line:first').clone().appendTo(horizontalLineContainer)

    $(el).find('input[type=range]')[0].oninput = () => {refreshVisual(el)}

    refreshVisual(el)
}

function refreshVisual(el) {
    const downsampleSlider = $(el).find('input[type=range]')[0]
    const crunch = parseFloat(downsampleSlider.value).map(downsampleSlider.min, downsampleSlider.max, 1, 100)
    const lineCount = $(el).width() / crunch + 1

    let path = `M ${-crunch} 100`
    for (let l = 0; l < lineCount; l++) {
        path += `V ${100 + Math.cos(l / lineCount * 20) * 50}`
        path += `h ${crunch}`
    }

    $(el).find('path').attr('d', path)
}