<script>
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	import makeDraggable from './GUILib/DragAndDrop'
	import {setupSingleClick} from './GUILib/ClickFunctions'

	import SampMenu from './SampMenu.svelte'
	import Modal from './Modal.svelte'
	import Waveform from "./Waveform.svelte";
	import SampOptions from './SampOptions.svelte'

	export let data, sampIndex

	const buffer = getBuffer(data.name).getChannelData(0)

	const shortClickLength = 300

	let el
	let ctx
	let isMenuOpened

	let path = ''

	onMount(function () {
		dragAndDrop()
		setupSingleClick(el, openMenu)
	})

	function openMenu() {
		isMenuOpened = true
	}

	function closeMenu() {
		isMenuOpened = false
		dragAndDrop()
	}

	function dragAndDrop() {
		makeDraggable(el, undefined, undefined, () => {
			data.effects[0].params.delay = el.offsetLeft / el.parentElement.clientWidth * length
		})
	}
</script>

<style lang="scss">
	.below-menu {
		top: calc(100% - 110px) !important;
	}
</style>


<div bind:this={el}
 	class="absolute filter drop-shadow-sm-dark duration-300 z-samp group
			{isMenuOpened 	? 'below-menu z-selected-samp'
							: 'cursor-move active:transition-filter active:drop-shadow-lg-dark'}"
 	style="left: {data.effects[0].params.delay / length * 100}%; width: {buffer.length / length * 100}%; height: 100px">
	<div class="w-full h-full absolute z-samp">
		<Waveform buffer={buffer} />
	</div>
	<div class="w-full h-full bg-blue-300 absolute z-samp-background opacity-0 group-hover:opacity-100 duration-200">
		<SampOptions />
	</div>
</div>

{#if isMenuOpened}
	<Modal onClose={closeMenu}>
		<SampMenu data={data} sampIndex={sampIndex}/>
	</Modal>
{/if}