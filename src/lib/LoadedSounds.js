import getContext from '$lib/AudioContext.js'

let loadedSounds = {};

export const isLoaded = (name) => {
	return loadedSounds.hasOwnProperty(name)
}

export const getPlayable = (name) => {
	var sound = getContext().createBufferSource();
	sound.buffer = loadedSounds[name];
	return sound;
}

export const loadSound = (name, callback) => {
	var request = new XMLHttpRequest();
	request.open('GET', `samples/${name}.wav`, true);
	request.responseType = 'arraybuffer';
	
	request.onload = function() {
		getContext().decodeAudioData(request.response, function(buffer) {
			loadedSounds[name] = buffer			
			callback()
		}, () => {
			console.log('ERROR!') 
		});
	}
	
	request.send();
}

export default loadedSounds;