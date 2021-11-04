<script>
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	import makeDraggable from './GUILib/DragAndDrop'
	import {setupSingleClick} from './GUILib/ClickFunctions'

	import SampMenu from './SampMenu.svelte'
	import ButtonArray from './ButtonArray.svelte'
	import Modal from './Modal.svelte'
	import Waveform from './Waveform.svelte'

	export let data, sampIndex

	let waveform
	let box, el, lHandle, rHandle, mHandle
	onMount(() => {
		makeDraggable(mHandle, box)
		mHandle.dragX = mHandle.dragY = true
		mHandle.onDrop = () => {
			data.generator.params.delay = box.offsetLeft / box.parentElement.clientWidth * length
		}

		makeDraggable(lHandle)
		lHandle.dragX = true
		lHandle.onDrag = (xPos, yPos, xDiff, yDiff) => {
			const clip = el.clip()
			el.style.clip = `rect(${clip.top}px,${clip.right}px,${clip.bottom}px,${clip.left - xDiff}px)`
			lHandle.style.left = `${clip.left}px`
		}
		lHandle.onDrop = () => {
			data.generator.params.startOffset = el.clip().left / el.parentElement.clientWidth * length
		}

		makeDraggable(rHandle)
		rHandle.dragX = true
		rHandle.onDrag = (xPos, yPos, xDiff, yDiff) => {
			const clip = el.clip()
			el.style.clip = `rect(${clip.top}px,${clip.right - xDiff}px,${clip.bottom}px,${clip.left}px)`
			rHandle.style.right = `${el.clientWidth - clip.right}px`
		}
		rHandle.onDrop = () => {
			data.generator.params.endOffset = (el.clientWidth - el.clip().right) / el.parentElement.clientWidth * length
		}

		setupSingleClick(el, openMenu)
	})

	let isMenuOpened
	function openMenu() { isMenuOpened = true }
	function closeMenu() { isMenuOpened = false }

	const buffer = getBuffer(data.generator.params.soundName).getChannelData(0)
</script>

<div bind:this={box}
	class="absolute drop-shadow-sm-dark duration-300 z-samp group
			{isMenuOpened 	? 'below-menu z-selected-samp'
							: 'active:transition-filter active:drop-shadow-lg-dark'}"
	style="left: {data.generator.params.delay / length * 100}%;
	width: {buffer.length / length * 100}%;
	height: 100px">
	<div bind:this={el} class="full group-hover:bg-blue-300">
		<div class="full z-samp" bind:this={waveform}>
			<Waveform buffer={buffer} />
		</div>
		<div class="full z-samp-handles">
			<div bind:this={mHandle} class="full cursor-move" />
			<div bind:this={lHandle} class="absolute left-0 w-2 h-full cursor-h-resize" />
			<div bind:this={rHandle} class="absolute right-0 w-2 h-full cursor-h-resize" />
		</div>
	</div>
	<div class="absolute -top-8 h-8 w-24 bg-blue-300 opacity-0 group-hover:opacity-100 flex">
		<ButtonArray buttons={ {
			'crop': () => {console.log('crop left')},
			'envelope': () => {console.log('envelope')},
			'time-stretch': () => {alert('time-stretch')},
		} }/>
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