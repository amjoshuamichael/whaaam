import {getBuffer} from './LoadedSounds'
import getContext from './AudioContext'

import wasm from '../../../wasm-game-of-life/Cargo.toml';
let waap;
init()
async function init() {
	waap = await wasm()
}

export const seconds = 5
export const length = getContext().sampleRate * seconds
const channels = 2

export default function GenBuffer(samps) {
	let output = getContext().createBuffer(2, length, getContext().sampleRate)
	
	samps.forEach(function(samp) {		
		for (let c = 0; c < channels; c++) {
			let outputData = output.getChannelData(c)
			let sampBufferData = getBuffer(samp.name).getChannelData(0)

			let lastEffectIndex = 0
			
			samp.effects.forEach(function(effect, index) {
				if (effect.buffer == null) effect.buffer = new Float32Array(length)

				if (!effect.enabled) return // works like continue

				switch (effect.name) {
					case ('copy'):
						waap.copy(sampBufferData,
							effect.buffer, effect.params.delay)
					break
					case ('bitcrush'):
						waap.bitcrush(samp.effects[lastEffectIndex].buffer,
							effect.buffer, effect.params.downsample)
					break
					case ('filter'):
						waap.filter(samp.effects[lastEffectIndex].buffer, effect.buffer,
							effect.params.frequency, effect.params.q, getContext().sampleRate)
					break
					case ('reverb'):
						waap.reverb(samp.effects[lastEffectIndex].buffer, effect.buffer,
							effect.params.delay, effect.params.feedback, getContext().sampleRate)
					break
					case ('delay'):
						waap.delay(samp.effects[lastEffectIndex].buffer, effect.buffer,
							effect.params.delay, effect.params.feedback, getContext().sampleRate)
						console.log(effect.params.delay)
					break
					case ('flanger'):
						waap.flanger(samp.effects[lastEffectIndex].buffer,
							effect.buffer, effect.params.speed)
					break
				}

				lastEffectIndex = index
			})
			
			waap.add(samp.effects[lastEffectIndex].buffer, outputData)
		}
	})
	
	return output
}