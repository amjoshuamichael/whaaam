HTMLElement.prototype.trueWidth = function() {
    const clip = this.clipPath()
    return this.clientWidth - clip.right - clip.left
}

HTMLElement.prototype.trueHeight = function() {
    const clip = this.clipPath()
    return clip.bottom - clip.top
}