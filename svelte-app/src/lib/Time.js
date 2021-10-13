import getContext from './AudioContext'
import {writable} from 'svelte/store'
import {seconds} from './Generate'

let startTime = 0

export function setStartTime() {
	startTime = getContext().currentTime
	setInterval(calculatePlayTime, 15)
}

export let playTime = writable(0)

function calculatePlayTime() {
	if (playTime > length) {
		playTime = 0
		clearInterval(calculatePlayTime)
	}
	playTime.set((getContext().currentTime - startTime) * getContext().sampleRate)
}