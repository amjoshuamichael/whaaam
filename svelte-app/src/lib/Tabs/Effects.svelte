<script context="module">
	import Bitcrush from './Bitcrush.svelte'
</script>

<script>
	export let data;
	
	function getParams(params) {
		let output = []
		console.log("getting param")
		
		for (var param in params) {
			if (Object.prototype.hasOwnProperty.call(params, param)) {
				output.push(param)
				console.log(param)
			}
		}
		
		return output
	}
</script>

<style>
	.effects {
		padding: 20px;
	}
</style>

<div class="effects">
	{#each data.effects as effect}
		{#if effect.name === "bitcrush"}
			<Bitcrush params={effect.params}/>
		{/if}
	{/each}
</div>