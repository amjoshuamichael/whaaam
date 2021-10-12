<script context="module">
	export const prerender = true
	
	import Samp from './Samp.svelte'
	import {onMount} from 'svelte'
	import {samps} from './SampList'
	import {loadAllSamps, areAllSoundsLoaded} from './LoadedSounds'
</script>

<script>
	onMount(loadAllSamps)

	let _areAllSoundsLoaded
	areAllSoundsLoaded.subscribe(value => {
		_areAllSoundsLoaded = value
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

{#if _areAllSoundsLoaded === true}
	<div class="SampList">
		{#each $samps as samp}
			<Samp data={samp}></Samp>
		{/each}
	</div>
{/if}