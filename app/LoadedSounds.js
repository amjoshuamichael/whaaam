import getContext from './AudioContext'
import {writable, get} from 'svelte/store'
import {samps} from './SampList'
import makeRequest from './Utilities/MakeRequest'

let loadedSounds = {};
export let areAllSoundsLoaded = writable(false)

export function isLoaded(name) {
	return loadedSounds.hasOwnProperty(name)
}

export function getPlayable(name) {
	let sound = getContext().createBufferSource()
	sound.buffer = loadedSounds[name]
	return sound
}

export function getBuffer(name) {
	return loadedSounds[name]
}

export async function loadSound(name, callback) {
	let result = await makeRequest("GET", `build/samples/${name}.wav`, 'arraybuffer');

	let buffer = await getContext().decodeAudioData(result)
	loadedSounds[name] = buffer

	if (callback !== undefined) callback()
	refreshAreAllSoundsLoaded()
}

function refreshAreAllSoundsLoaded() {
	areAllSoundsLoaded.set(get(samps).every(samp => isLoaded(samp.generator.params.soundName)))
}

export function loadAllSamps() {
	get(samps).forEach(function(samp) {
		loadSound(samp.generator.params.soundName)
	})
}

export default loadedSounds;