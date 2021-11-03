<script>
	import {onMount} from 'svelte'
	import {samps} from './SampList'
	import {loadAllSamps, areAllSoundsLoaded} from './LoadedSounds'

	import Samp from './Samp.svelte'
	import Playhead from './Playhead.svelte'

	onMount(loadAllSamps)

	let _areAllSoundsLoaded
	areAllSoundsLoaded.subscribe(value => {
		_areAllSoundsLoaded = value
	})
	
	let sampList
</script>

{#if _areAllSoundsLoaded === true}
	<div class="relative w-full h-full overflow-x-scroll" bind:this={sampList}>
		{#each $samps as samp, index}
			<Samp data={samp} sampIndex={index}></Samp>
		{/each}
	</div>

	<Playhead />
{/if}