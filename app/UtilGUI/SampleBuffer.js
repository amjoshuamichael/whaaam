export function sampleBufferPoint(buffer, point) {
    let output = buffer[Math.floor(point)] + buffer[Math.floor(point + 200)]
    return isNaN(output) ? 0 : output
}

export function sampleBufferPeak(buffer, point) {
    let max = 0

    let i = 0;

    while (i < 1000) {
        max = Math.max(buffer[point - i], max)
        i++
    }


    return max
}