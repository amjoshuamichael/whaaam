export default function (buffer, point) {
    let output = buffer[Math.floor(point)] + buffer[Math.floor(point + 200)]
    return isNaN(output) ? 0 : output
}