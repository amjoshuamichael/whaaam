import getContext from './AudioContext'
import {writable, get} from 'svelte/store'
import {samps} from './SampList'

let loadedSounds = {};
export let areAllSoundsLoaded = writable(false)

function refreshAreAllSoundsLoaded() {
	areAllSoundsLoaded.set(get(samps).every(samp => isLoaded(samp.name)))
}

export const isLoaded = (name) => {
	return loadedSounds.hasOwnProperty(name)
}

export const getPlayable = (name) => {
	var sound = getContext().createBufferSource()
	sound.buffer = loadedSounds[name]
	return sound
}

export const getBuffer = (name) => {
	return loadedSounds[name]
}

export const loadSound = (name, callback) => {
	var request = new XMLHttpRequest();
	request.open('GET', `build/samples/${name}.wav`, true);
	request.responseType = 'arraybuffer';
	
	request.onload = function() {
		getContext().decodeAudioData(request.response, function(buffer) {
			loadedSounds[name] = buffer	
			refreshAreAllSoundsLoaded()
			if (callback !== undefined) callback()
		}, () => {
			console.log('ERROR!') 
		});
	}
	
	request.send();
}

export function loadAllSamps() {
	get(samps).forEach(function(samp) {
		loadSound(samp.name)
	})
}

export default loadedSounds;