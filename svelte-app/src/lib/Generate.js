import {getBuffer} from './LoadedSounds'
import getContext from './AudioContext'

import wasm from '../../../wasm-game-of-life/Cargo.toml';
let waap;

async function init() {
	waap = await wasm()
}

init()

export const seconds = 5
export const length = getContext().sampleRate * seconds
const channels = 2

export default function GenBuffer(samps) {
	let output = getContext().createBuffer(2, length, getContext().sampleRate)
	
	samps.forEach(function(samp) {		
		for (let c = 0; c < channels; c++) {
			let outputData = output.getChannelData(c)
			let sampBufferData = getBuffer(samp.name).getChannelData(c)	
			
			samp.effects.forEach(function(effect, index) {
				if (effect.buffer == null) {
					effect.buffer = new Float32Array(length)
				}
				
				switch (effect.name) {
					case ('copy'):
						waap.copy(sampBufferData, effect.buffer, effect.params.delay)
					break
					case ('bitcrush'):
						waap.bitcrush(samp.effects[index - 1].buffer, effect.buffer, effect.params.downsample)
					break
				}
			})
			
			waap.add(samp.effects[samp.effects.length - 1].buffer, outputData)
		}
	})
	
	return output
}