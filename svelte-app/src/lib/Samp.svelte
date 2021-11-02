<script>
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	import makeDraggable from './GUILib/DragAndDrop'
	import {setupSingleClick} from './GUILib/ClickFunctions'

	import SampMenu from './SampMenu.svelte'
	import Modal from './Modal.svelte'
	import Waveform from "./Waveform.svelte";

	export let data, sampIndex

	let el, lHandle, rHandle, mHandle
	onMount(function () {
		makeDraggable(mHandle, el)
		mHandle.onDrop = () => {
			data.effects[0].params.delay = el.offsetLeft / el.parentElement.clientWidth * length
		}

		makeDraggable(lHandle, el, "resize-left")

		makeDraggable(rHandle, el, "resize-right")

		setupSingleClick(el, openMenu)
	})

	let isMenuOpened
	function openMenu() { isMenuOpened = true }
	function closeMenu() { isMenuOpened = false }

	const buffer = getBuffer(data.name).getChannelData(0)
</script>

<div bind:this={el}
	class="absolute filter drop-shadow-sm-dark duration-300 z-samp
			{isMenuOpened 	? 'below-menu z-selected-samp'
							: 'active:transition-filter active:drop-shadow-lg-dark'}"
 	style="left: {data.effects[0].params.delay / length * 100}%; width: {buffer.length / length * 100}%; height: 100px">
	<div class="w-full h-full absolute z-samp">
		<Waveform buffer={buffer} />
	</div>
<!--	<div class="absolute w-full h-full flex z-samp-handles">-->
<!--		<div bind:this={lHandle} class="w-2 h-full cursor-h-resize bg-red-500" />-->
<!--		<div bind:this={mHandle} class="flex-grow h-full cursor-move bg-yellow-400" />-->
<!--		<div bind:this={rHandle} class="w-2 h-full cursor-h-resize bg-blue-300" />-->
<!--	</div>-->
	<div class="absolute w-full h-full flex z-samp-handles">
		<div bind:this={lHandle} class="w-2 h-full cursor-h-resize" />
		<div bind:this={mHandle} class="flex-grow h-full cursor-move" />
		<div bind:this={rHandle} class="w-2 h-full cursor-h-resize" />
	</div>
</div>

{#if isMenuOpened}
	<Modal onClose={closeMenu}>
		<SampMenu data={data} sampIndex={sampIndex}/>
	</Modal>
{/if}

<style lang="scss">
	.below-menu {
		top: calc(100% - 110px) !important;
	}
</style>