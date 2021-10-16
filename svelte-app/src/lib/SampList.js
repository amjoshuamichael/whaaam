import {loadSound, isLoaded} from './LoadedSounds'
import {writable, get} from 'svelte/store'

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
					'delay': 30000
				},
				'buffer': null
			},
			{
				'name': 'bitcrush',
				'enabled': false,
				'params': {
					'downsample': 30
				},
				'buffer': null
			},
			{
				'name': 'filter',
				'enabled': true,
				'params': {},
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
