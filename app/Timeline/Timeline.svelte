<script>
	import {onMount} from 'svelte'
	import {samps} from '../Audio/SampList'
	import {loadAllSamps, areAllSoundsLoaded} from '../Audio/LoadedSounds'

	import Samp from './Samp.svelte'
	import Playhead from './Playhead.svelte'
	import PlayButton from './PlayButton.svelte'
	import Meter from './Meter.svelte'
	import Trash from './Trash.svelte'

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
	<PlayButton />
	<Meter />
	<Trash />
{/if}