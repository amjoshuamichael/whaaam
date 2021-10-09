<script context="module">
	export const prerender = true
	
	import Samp from './Samp.svelte'
	import {loadSound, isLoaded} from './LoadedSounds'
	
	export const samps = [
		{
			'name': 'crash_long_echo',
			'delay': 30000
		}
	]
	
	function loadAll() {
		samps.forEach(function(samp) {
			if (!isLoaded(samp.name)) {
				loadSound(samp.name, function() {})
			}
		})
	}
	
	loadAll()
</script>

<script>
	
</script>

<div class="SampList">
	{#each samps as samp}
		<Samp data={samp}></Samp>
	{/each}
</div>