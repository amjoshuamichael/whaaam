<script context="module">
	export const prerender = true
	
	import Samp from '$lib/Samp.svelte'
</script>

<script>
	let base = [
		{
			'name': 'kick_house',
			'delay': 200
		},
		{
			'name': 'crash_long_echo',
			'delay': 0
		}
	]

	export let samps = base
</script>

<div class="SampList">
	{#each samps as samp}
		<Samp data={samp}></Samp>
	{/each}
</div>