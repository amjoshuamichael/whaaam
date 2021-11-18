import {loadSound, isSoundLoaded} from './LoadedSounds'
import {loadEffect, isEffectLoaded} from './LoadedEffects'
import {writable} from 'svelte/store'
import defaults from '../DefaultEffects'
import Play from './Play'
import {getNew} from '../Utilities/UUID'

export const samps = writable([
	{
		'UUID': getNew(),
		'enabled': true,
		'buffer': null,
		'generator': {
			'name': 'copy',
			'enabled': true,
			'params': {
				'soundName': 'bad_bass',
				'delay': 0,
				'startOffset': 0,
				'endOffset': 0,
				'fadeInOffset': 0,
				'fadeOutOffset': 0
			},
			'buffer': null
		},
		'effects': [

		]
	}
])

export async function addSamp(sampName) {
	if (!isSoundLoaded(sampName)) await loadSound(sampName)

	samps.update(l => {
		l.push(
			{
				'UUID': getNew(),
				'enabled': true,
				'buffer': null,
				'generator': {
					'name': 'copy',
					'enabled': true,
					'params': {
						'soundName': sampName,
						'delay': 0,
						'startOffset': 0,
						'endOffset': 0,
						'fadeInOffset': 0,
						'fadeOutOffset': 0
					},
					'buffer': null
				},
				'effects': [

				]
			}
		)
		return l
	})

	Play()
}

export function alterGenParameter(paramName, sampIndex, newVal) {
	samps.update(l => {
		l[sampIndex].generator.params[paramName] = newVal
		return l
	})

	Play()
}

export function alterEffectParameter(paramName, sampIndex, effectIndex, newVal) {
	samps.update(l => {
		l[sampIndex].effects[effectIndex].params[paramName] = newVal
		return l
	})

	Play()
}

export async function addEffectToSamp(effectName, sampIndex) {
	if (!isEffectLoaded(effectName)) await loadEffect(effectName)

	samps.update(l => {
		l[sampIndex].effects.push(defaults[effectName])
		return l
	})

	Play()
}

export function removeEffectFromSamp(effectIndex, sampIndex) {
	samps.update(l => {
		l[sampIndex].effects.splice(effectIndex, 1)
		return l
	})

	Play()
}

export function toggleEffectInSamp(effectIndex, sampIndex) {
	samps.update(l => {
		l[sampIndex].effects[effectIndex].enabled ^= true
		return l
	})

	Play()
}

export function removeSamp(UUID) {
	samps.update(l => {
		l = l.filter(s => s.UUID !== UUID)
		return l
	})

	Play()
}