<script context="module">
	export const prerender = true
	
	import Samp from './Samp.svelte'
	import {loadSound, isLoaded} from './LoadedSounds'
	import {onMount} from 'svelte'
	
	export const samps = [
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
						'delay': 0
					},
					'buffer': null
				}
			]
		}
	]
</script>

<script>
	let areAllSoundsLoaded = false

	onMount(function () {
		let soundsLoaded = 0
		
		samps.forEach(function(samp) {
			if (!isLoaded(samp.name)) {
				loadSound(samp.name, function() {
					soundsLoaded++
					if (soundsLoaded == samps.length) {
						areAllSoundsLoaded = true
					}
				})
			}
		})
	})
</script>

<style>
	.SampList {
		position: relative;
		width: 60%;
		height: 80%;
		overflow: scroll;
	}
</style>

{#if areAllSoundsLoaded}
	<div class="SampList">
		{#each samps as samp}
			<Samp data={samp}></Samp>
		{/each}
	</div>
{/if}