<script context="module">
	export const prerender = true
	
	import Samp from './Samp.svelte'
	import Playhead from './Playhead.svelte'
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
	
	let sampList
</script>

<style>
	.SampList {
		position: relative;
		width: 100%;
		height: 90%;
		overflow: scroll;
	}
</style>

{#if _areAllSoundsLoaded === true}
	<div class="SampList" bind:this={sampList}>
		{#each $samps as samp}
			<Samp data={samp}></Samp>
		{/each}
	</div>
	<Playhead />
{/if}