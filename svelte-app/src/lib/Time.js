import getContext from './AudioContext'
import {writable} from 'svelte/store'

let startTime = 0

export function setStartTime() {
	startTime = getContext().currentTime
	setInterval(calculatePlayTime, 15)
}

export let playTime = writable(0)

function calculatePlayTime() {
	playTime.set((getContext().currentTime - startTime) * getContext().sampleRate)
}