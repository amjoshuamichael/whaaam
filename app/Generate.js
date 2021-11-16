import {getBuffer} from './LoadedSounds'
import getContext from './AudioContext'

import wasm from '../fxold/Cargo.toml';
let waap;
init()
async function init() {
	waap = await wasm()
}

export const seconds = 5
export const lengthInSamples = getContext().sampleRate * seconds

let output, channels
export default function genBuffers(samps) {
	output = getContext().createBuffer(2, lengthInSamples, getContext().sampleRate)
	channels = [output.getChannelData(0), output.getChannelData(1)]

	samps.forEach(genBuffer)
	
	return output
}

export function genBuffer(samp) {
	for (const channel of channels) {
		samp.generator.buffer ??= new Float32Array(lengthInSamples)
		renderGenerator(samp.generator)

		if (samp.effects.length == 0) {
			waap.add(samp.generator.buffer, channel)
			continue
		}

		let lastEffectIndex = 0
		samp.effects.forEach((effect, index) => {
			effect.buffer ??= new Float32Array(lengthInSamples)

			if (!effect.enabled) return // works like continue

			renderEffect(index === 0 ? samp.generator.buffer : samp.effects[lastEffectIndex].buffer, effect)

			lastEffectIndex = index
		})

		waap.add(samp.effects[lastEffectIndex].buffer, channel)
	}
}

function renderGenerator(generator) {
	switch (generator.name) {
		case ('copy'):
			let soundBuffer = getBuffer(generator.params.soundName).getChannelData(0)
			waap.copy(soundBuffer, generator.buffer,
				generator.params.delay, generator.params.startOffset, generator.params.endOffset,
				generator.params.fadeInOffset, generator.params.fadeOutOffset)
			break
	}
}

function renderEffect(input, effect) {
	switch (effect.name) {
		case ('bitcrush'):
			input['bitcrush'](effect.buffer, effect.params, getContext().sampleRate)
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