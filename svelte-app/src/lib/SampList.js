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
			}
		]
	},
	{
		'name': 'kick_house',
		'enabled': true,
		'buffer': null,
		'effects': [
			{
				'name': 'copy',
				'enabled': true,
				'params': {
					'delay': -100
				},
				'buffer': null
			}
		]
	}
])

export function addSamp(sampName) {
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
	
	if (!isLoaded(sampName)) {
		loadSound(sampName)
	}
}
