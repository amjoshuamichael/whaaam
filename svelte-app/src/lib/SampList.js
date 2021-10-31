import {loadSound, isLoaded} from './LoadedSounds'
import {writable} from 'svelte/store'
import defaults from './defaultEffects'
import {effects, index} from "./SampMenu/EffectOptions.svelte";

export const samps = writable([
	{
		'name': 'crash_long_echo',
		'enabled': true,
		'buffer': null,
		'effects': [
			{
				'name': 'copy',
				'enabled': true,
				'params': {
					'delay': 0,
					'startOffset': 0,
					'endOffset': 0
				},
				'buffer': null
			},
			{
				'name': 'flanger',
				'enabled': true,
				'params': {
					'speed': 0.2
				},
				'buffer': null
			}
		]
	}
])

export function addSamp(sampName) {
	if (!isLoaded(sampName)) {
		loadSound(sampName, function () {
			samps.update(l => {
				l.push(
					{
						'name': sampName,
						'enabled': true,
						'buffer': null,
						'effects': [
							{
								'name': 'copy',
								'enabled': true,
								'params': {
									'delay': 0
								},
								'buffer': null
							}
						]
					}
				)
				return l
			})
		})
	}
}

export function addEffectToSamp(effectName, sampIndex) {
	samps.update(l => {
		l[sampIndex].effects.push(defaults[effectName])
		return l
	})
}

export function removeEffectFromSamp(effectIndex, sampIndex) {
	samps.update(l => {
		l[sampIndex].effects.splice(effectIndex, 1)
		return l
	})
}

export function toggleEffectInSamp(effectIndex, sampIndex) {
	samps.update(l => {
		l[sampIndex].effects[effectIndex].enabled ^= true
		return l
	})
}