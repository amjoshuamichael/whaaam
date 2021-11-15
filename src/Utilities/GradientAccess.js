HTMLElement.prototype.getGradient = function() {
    let output = []

    const style = this.style.background

    if (style.substring(0,16) != 'linear-gradient(') return undefined

    const CSSSeparators = /[,()]/g
    const CSSNoise = /[()]|linear-gradient/g
    const separated = style.replace(CSSNoise, '').split(CSSSeparators)

    const direction = separated.shift()
    output.direction = direction

    for (const stop of separated) {
        const spacesInStop = / (?=[^\-0-9])/g
        const colorAndPos = stop.replace(spacesInStop, '').split(' ')

        const number = /[\-0-9]/g
        const notNumber = /[^\-0-9]/g
        const color = colorAndPos[0]
        const pos = parseFloat(colorAndPos[1]?.replace(notNumber, ''))

        const units = colorAndPos[1]?.replace(number, '')
        output.push({'color': color, 'pos': pos, 'units': units})
    }

    const lastIndex = separated.length - 1
    output[0].pos = output[0].units = output[lastIndex].pos = output[lastIndex].units = null

    return output
}

HTMLElement.prototype.setGradient = function(stops) {
    let output = `linear-gradient(${stops.direction}, `

    for (const stop of stops)
        output += `${stop.color} ${stop.pos ?? ''}${stop.units ?? ''}, `

    const lastComma = / , (?!.*,)/
    output = output.replace(lastComma, ')')

    this.style.background = output
}