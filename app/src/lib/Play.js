import {samps} from'./SampList'
import {get} from 'svelte/store'
import getContext from './AudioContext'
import GenBuffer from './Generate'
import {startTimer} from './Time'

let onPlay = []
export function doOnPlay (fn) {
    onPlay.push(fn)
}

let buffer
export default function () {
    buffer = GenBuffer(get(samps))

    let source = getContext().createBufferSource()
    source.buffer = buffer
    source.connect(getContext().destination)
    source.start()

    startTimer()

    onPlay.forEach(fn => fn(buffer))
}