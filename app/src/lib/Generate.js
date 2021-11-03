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

let output, outputL, outputR
export default function genBuffers(samps) {
	output = getContext().createBuffer(2, length, getContext().sampleRate)
	outputL = output.getChannelData(0)
	outputR = output.getChannelData(1)

	samps.forEach(genBuffer)
	
	return output
}

export function genBuffer(samp) {
	for (let c = 0; c < channels; c++) {
		samp.generator.buffer ??= new Float32Array(length)
		renderGenerator(samp.generator)

		if (samp.effects.length == 0) {
			waap.add(samp.generator.buffer, c == 0 ? outputL : outputR)
			continue
		}

		let lastEffectIndex = 0
		samp.effects.forEach(function(effect, index) {
			effect.buffer ??= new Float32Array(length)

			if (!effect.enabled) return // works like continue

			if (index == 0) {
				renderEffect(samp.generator.buffer, effect)
			} else {
				renderEffect(samp.effects[index].buffer, effect)
			}

			lastEffectIndex = index
		})

		waap.add(samp.effects[lastEffectIndex].buffer, c == 0 ? outputL : outputR)
	}
}

function renderGenerator(generator) {
	switch (generator.name) {
		case ('copy'):
			let soundBuffer = getBuffer(generator.params.soundName).getChannelData(0)
			waap.copy(soundBuffer, generator.buffer,
				generator.params.delay, generator.params.startOffset, generator.params.endOffset)
			break
	}
}

function renderEffect(input, effect) {
	switch (effect.name) {
		case ('bitcrush'):
			waap.bitcrush(input, effect.buffer, effect.params.downsample)
			break
		case ('filter'):
			waap.filter(input, effect.buffer, effect.params.frequency, effect.params.q, getContext().sampleRate)
			break
		case ('reverb'):
			waap.reverb(input, effect.buffer, effect.params.delay, effect.params.feedback, getContext().sampleRate)
			break
		case ('delay'):
			waap.delay(input, effect.buffer, effect.params.delay, effect.params.feedback, getContext().sampleRate)
			break
		case ('flanger'):
			waap.flanger(input, effect.buffer, effect.params.speed)
			break
	}
}