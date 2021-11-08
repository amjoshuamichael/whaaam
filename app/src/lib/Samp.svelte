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
	let box, cropped, fade
	let cropLHandle, cropRHandle, envLHandle, envRHandle, mHandle
	let envIn, envOut
	onMount(() => {
		makeDraggable(mHandle, box)
		mHandle.dragX = mHandle.dragY = true
		mHandle.onDrop = () => {
			data.generator.params.delay = box.offsetLeft / box.parentElement.clientWidth * length
		}

		// setUpCropDrag()
		setUpEnvDrag()

		setupSingleClick(cropped, openMenu)
	})

	function setUpCropDrag() {
		makeDraggable(cropLHandle, cropLHandle)
		cropLHandle.dragX = true
		cropLHandle.onDrag = (xPos, yPos, xDiff, yDiff) => {
			const clip = cropped.clip()
			cropped.style.clip = `rect(${clip.top}px,${clip.right}px,${clip.bottom}px,${clip.left - xDiff}px)`
		}
		cropLHandle.onDrop = () => {
			data.generator.params.startOffset = cropped.clip().left / box.parentElement.clientWidth * length
		}

		makeDraggable(cropRHandle, cropRHandle)
		cropRHandle.dragX = true
		cropRHandle.onDrag = (xPos, yPos, xDiff, yDiff) => {
			const clip = cropped.clip()
			cropped.style.clip = `rect(${clip.top}px,${clip.right - xDiff}px,${clip.bottom}px,${clip.left}px)`
		}
		cropRHandle.onDrop = () => {
			data.generator.params.endOffset = (box.clientWidth - cropped.clip().right) / box.parentElement.clientWidth * length
		}
	}

	function setUpEnvDrag() {
		if (!fade.style.background)
			fade.style.background = `linear-gradient(to right, white, transparent 0px, transparent ${fade.clientWidth}px, white)`
		makeDraggable(envLHandle)
		envLHandle.dragX = true
		envLHandle.onDrag = (xPos, yPos, xDiff, yDiff) => {
			const gradientStops = fade.getGradient()
			gradientStops[1].pos -= xDiff
			fade.setGradient(gradientStops)
			envLHandle.style.width = (gradientStops[1].pos + 10) + gradientStops[1].units
		}
		envLHandle.onDrop = () => {
			data.generator.params.fadeInOffset = envLHandle.clientWidth / box.parentElement.clientWidth * length
		}

		makeDraggable(envRHandle)
		envRHandle.dragX = true
		envRHandle.onDrag = (xPos, yPos, xDiff, yDiff) => {
			const gradientStops = fade.getGradient()
			gradientStops[2].pos -= xDiff
			fade.setGradient(gradientStops)
			envRHandle.style.width = (fade.clientWidth - gradientStops[2].pos + 10) + gradientStops[2].units
		}
		envRHandle.onDrop = () => {
			data.generator.params.fadeOutOffset = envRHandle.clientWidth / box.parentElement.clientWidth * length
		}
	}

	let isMenuOpened
	function openMenu() { isMenuOpened = true }
	function closeMenu() { isMenuOpened = false }

	const buffer = getBuffer(data.generator.params.soundName).getChannelData(0)
</script>

<div bind:this={box}
	class="absolute duration-300 z-samp group transition-colors {isMenuOpened && 'below-menu z-selected-samp'}"
	style="left: {data.generator.params.delay / length * 100}%;
	width: {buffer.length / length * 100}%;
	height: 100px;">
	<div bind:this={cropped} class="full group-hover:bg-blue-300">
		<div class="full z-samp-waveform drop-shadow-sm-dark" bind:this={waveform}>
			<Waveform buffer={buffer} />
		</div>
		<div class="full z-samp-handles">
			<div bind:this={mHandle} class="full cursor-move" />
<!--			<div bind:this={cropLHandle} class="absolute left-0 w-2 h-full cursor-h-resize"></div>-->
<!--			<div bind:this={cropRHandle} class="absolute right-0 w-2 h-full cursor-h-resize"></div>-->
			<div bind:this={envLHandle} class="absolute left-0 w-2 h-full cursor-h-resize" />
			<div bind:this={envRHandle} class="absolute right-0 w-2 h-full cursor-h-resize" />
		</div>
	</div>
	<div class="absolute -top-8 h-8 w-24 bg-blue-300 opacity-0 group-hover:opacity-100 flex">
		<ButtonArray buttons={ {
			'crop': () => {console.log('crop left')},
			'envelope': () => {console.log('envelope')},
			'time-stretch': () => {alert('time-stretch')},
		} }/>
	</div>
	<div bind:this={fade} class="full z-samp-overlay pointer-events-none">

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