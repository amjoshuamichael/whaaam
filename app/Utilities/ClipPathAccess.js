const CSSSeparators = / /g
const CSSNoise = /[(inset()px]/g

HTMLElement.prototype.clipPath = function() {
    const pathStyle = this.style.clipPath

    if (pathStyle == '') {
        this.style.clipPath = `inset(0px 0px 0px 0px)`
        return { top: 0, right: 0, bottom: 0, left: 0 }
    }

    const pathSeparated = pathStyle.replace(CSSNoise, '').split(CSSSeparators)
    const pathValues = pathSeparated.map(prop => parseFloat(prop))

    if (pathValues.length == 1) pathValues[1] = pathValues[2] = pathValues[3] = pathValues[0]

    return {top: pathValues[0], right: pathValues[1], bottom: pathValues[2], left: pathValues[3] }
}