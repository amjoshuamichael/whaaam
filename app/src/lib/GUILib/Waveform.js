import sampleBufferAt from './SampleBuffer';


export default function (buffer, canvas) {
    let path

    let sampling = buffer.length / canvas.clientWidth

    path = `M 0 ${canvas.clientHeight / 2}`

    for (let x = 0; x < canvas.clientWidth - 1; x++) {
        let y = sampleBufferAt(buffer, x * sampling) * canvas.clientHeight * 0.1

        let command = x % 10 != 0 ? 'T' : 'L'

        path += `${command}${x} ${canvas.clientHeight / 2 + y}`
    }

    return path
}