import context from './AudioContext'
import {writable} from 'svelte/store'

let startTime = 0

export function startTimer() {
	startTime = context().currentTime
	setInterval(calculatePlayTime, 30)
}

export let playTime = writable(0)

function calculatePlayTime() {
	if (soundIsOver()) {
		playTime = 0
		clearInterval(calculatePlayTime)
	}

	playTime.set(timeSinceStart())
}

function soundIsOver() {
	return playTime > length;
}

function timeSinceStart() {
	return (context().currentTime - startTime) * context().sampleRate;
}