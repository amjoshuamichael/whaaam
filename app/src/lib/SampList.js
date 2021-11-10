import {loadSound, isLoaded} from './LoadedSounds'
import {writable} from 'svelte/store'
import defaults from './DefaultEffects'

export const samps = writable([
	{
		'name': 'glass_scrape_3',
		'enabled': true,
		'buffer': null,
		'generator': {
			'name': 'copy',
			'enabled': true,
			'params': {
				'soundName': 'glass_scrape_3',
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

export function addSamp(sampName) {
	if (!isLoaded(sampName)) {
		loadSound(sampName, function () {
			samps.update(l => {
				l.push(
					{
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