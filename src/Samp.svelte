<script>
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {lengthInSamples} from './Generate'
	import makeDraggable from './GUILib/DragAndDrop'
	import {singleClick} from './GUILib/ClickFunctions'
	import genWavePath from './GUILib/Waveform'
	import {getNew, getLast} from './UUID'
	import {assign, unassign} from './GUILib/Shortcuts'
	import {removeSamp, alterGenParameter} from './SampList'

	import SampMenu from './SampMenu.svelte'
	import Modal from './Modal.svelte'

	export let data, sampIndex

	let box, waveform
	let clipLHandle, clipRHandle, envLHandle, envRHandle
	let clipL = 0, clipR = 0, envIn = 0, envOut = 0
	onMount(() => {
		const timelineWidth = box.parentElement.clientWidth
		const waveWidth = waveform.clientWidth

		function mapToTime(input) { return input / timelineWidth * lengthInSamples }

		makeDraggable(waveform, box)
		waveform.dragX = waveform.dragY = true
		waveform.onDrop = () => alterGenParameter('delay', sampIndex, mapToTime(box.offsetLeft))

		const maxClip = 20

		makeDraggable(clipLHandle)
		clipLHandle.dragX = true
		clipLHandle.onDrag = (xDiff) => clipL = (clipL - xDiff).clamp(0, waveWidth - clipR - envIn - envOut - maxClip)
		clipLHandle.onDrop = () => alterGenParameter('startOffset', sampIndex, mapToTime(clipL))

		makeDraggable(clipRHandle)
		clipRHandle.dragX = true
		clipRHandle.onDrag = (xDiff) => clipR = (clipR + xDiff).clamp(0, waveWidth - clipL - envIn - envOut - maxClip)
		clipRHandle.onDrop = () => alterGenParameter('endOffset', sampIndex, mapToTime(clipR))

		makeDraggable(envLHandle)
		envLHandle.dragX = true
		envLHandle.onDrag = (xDiff) => envIn = (envIn - xDiff).clamp(0, waveWidth - clipL - clipR - envOut - maxClip)
		envLHandle.onDrop = () => alterGenParameter('fadeInOffset', sampIndex, mapToTime(envIn))

		makeDraggable(envRHandle)
		envRHandle.dragX = true
		envRHandle.onDrag = (xDiff) => envOut = (envOut + xDiff).clamp(0, waveWidth - clipL - clipR - envIn - maxClip)
		envRHandle.onDrop = () => alterGenParameter('fadeOutOffset', sampIndex, mapToTime(envOut))

		singleClick(box, openMenu)
	})

	let isMenuOpened
	function openMenu() {
		isMenuOpened = true
		assign('Backspace', () => {
			unassign('Backspace')
			removeSamp(data.UUID)
		})
	}
	function closeMenu() {
		isMenuOpened = false
		unassign('Backspace')
	}

	const buffer = getBuffer(data.generator.params.soundName).getChannelData(0)
</script>

<div bind:this={box}
	class="absolute duration-300 z-samp group transition-colors {isMenuOpened && 'below-menu z-selected-samp'}"
	id="box"
	style="width: {buffer.length / lengthInSamples * 100}%; height: 100px;">
	<svg class="absolute w-full h-3/4 cursor-move" style="clip-path: inset(0px {clipR}px 0px {clipL}px)" bind:this={waveform}>
		{#if box !== undefined}
			<defs>
				<linearGradient id="{getNew()}">
					<stop offset="{clipL / box.clientWidth * 100}%"  stop-color="#0000ff00" />
					<stop offset="{(clipL + envIn * 0.75) / box.clientWidth * 100}%" stop-color="#0000ff80" />
					<stop offset="{(clipL + envIn) / box.clientWidth * 100}%" stop-color="#0000ffff" />
					<stop offset="{(1 - (clipR + envOut) / box.clientWidth) * 100}%"  stop-color="#0000ffff" />
					<stop offset="{(1 - (clipR + envOut * 0.75) / box.clientWidth) * 100}%"  stop-color="#0000ff80" />
					<stop offset="{(1 - clipR / box.clientWidth) * 100}%" stop-color="#0000ff00" />
				</linearGradient>
			</defs>
			<path d={genWavePath(buffer, waveform)} fill="transparent" stroke="url(#{getLast()})" stroke-width="1px"/>
		{/if}
	</svg>
	<div bind:this={clipLHandle} class="absolute w-4 h-3/4 cursor-h-resize border-8 border-r-0 rounded-sm border-black handle"
		id="clip-l-handle" style="left: {clipL - 5}px"></div>
	<div bind:this={clipRHandle} class="absolute w-4 h-3/4 cursor-h-resize border-8 border-l-0 rounded-sm border-black handle"
		id="clip-r-handle" style="right: {clipR - 5}px"></div>
	<div bind:this={envLHandle} class="absolute bottom-3 h-2 cursor-h-resize bg-black rounded-sm handle"
		id="env-l-handle" style="width: calc(max({envIn}px, 0px) + 0.5em); left: {clipL}px"></div>
	<div bind:this={envRHandle} class="absolute bottom-3 h-2 cursor-h-resize bg-black rounded-sm handle"
		id="env-r-handle" style="width: calc(max({envOut}px, 0px) + 0.5em); right: {clipR}px"></div>
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

	div#box {
		&:not(:active) {
			div.handle { @apply duration-200 }
		}

		&:not(:hover), &:not(:active) {
			div.handle { opacity: 0 }
			div#clip-l-handle { transform: translate(0.5em, 0em) }
			div#clip-r-handle { transform: translate(-0.5em, 0em) }
			div#env-l-handle { transform: translate(0.5em, 0em) }
			div#env-r-handle { transform: translate(-0.5em, 0em) }
		}

		&:hover, &:active {
			div.handle { opacity: 1 }
			div#clip-l-handle { transform: translate(0em, 0em) }
			div#clip-r-handle { transform: translate(0em, 0em) }
			div#env-l-handle { transform: translate(0em, 0em) }
			div#env-r-handle { transform: translate(0em, 0em) }
		}
	}
</style>