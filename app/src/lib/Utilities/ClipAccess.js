// The css clip property is organized:
// clip: rect(top, right, bottom, left)
//
// "where top and bottom define the offset from the top border
// and the left and right values define the offset from the left border."
// - Taken from https://tympanus.net/codrops/2013/01/16/understanding-the-css-clip-property/
//
// so, if the order of these properties in the code seems odd,
// that's because it is.

const CSSSeparators = /[,()]/g
const CSSNoise = /[(rect() px]/g

HTMLElement.prototype.clip = function() {
    const clipStyle = this.style.clip

    if (clipStyle == '') {
        this.style.clip = `rect(0px,${this.clientWidth}px,${this.clientHeight}px,0px`
        return { top: 0, right: this.clientWidth, bottom: this.clientHeight, left: 0 }
    }

    const clipSeparated = clipStyle.replace(CSSNoise, '').split(CSSSeparators)
    const clipValues = clipSeparated.map(prop => parseFloat(prop))
    return {top: clipValues[0], right: clipValues[1], bottom: clipValues[2], left: clipValues[3] }
}