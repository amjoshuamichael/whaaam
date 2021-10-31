<script>
	import {lerp} from './Utilities'
	import makeDraggable from './DragAndDrop'
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	import {playTime} from './Time'
	import SampMenu from './SampMenu.svelte'
	import Modal from './Modal.svelte'

	export let data, sampIndex

	const buffer = getBuffer(data.name).getChannelData(0)

	const shortClickLength = 300

	let el
	let canvas
	let ctx
	let sampling
	let isMenuOpened

	let path = ''

	onMount(function() {
		dragAndDrop()
		visualize()
		addClickDetectionEvent()
	})

	let clickStart, clickEnd

	function startClickTimer() {
		clickStart = +new Date();
	}

	function endClickTimer() {
		clickEnd = +new Date();
		if (clickEnd - clickStart < shortClickLength) openMenu()
	}

	function addClickDetectionEvent() {
		el.addEventListener("mousedown", startClickTimer)
		el.addEventListener("mouseup", endClickTimer)
	}

	function removeClickDetectionEvent() {
		el.removeEventListener("mousedown", startClickTimer)
		el.removeEventListener("mouseup", endClickTimer)
	}

	function openMenu() {
		isMenuOpened = true
		removeClickDetectionEvent()
	}

	function closeMenu() {
		isMenuOpened = false
		dragAndDrop()
		addClickDetectionEvent()
	}

	function visualize() {
		canvas.width = buffer.length / length * el.parentNode.clientWidth
		canvas.height = 100
		canvas.style.width = canvas.width + "px"
		canvas.style.height = canvas.height + "px"
		el.style.width = canvas.style.width
		el.style.height = canvas.style.height

		sampling = buffer.length / canvas.width

		path = `M 0 ${canvas.height / 2}`

		for (let x = 0; x < canvas.width - 1; x++) {
			let y = sampleBufferAt(x * sampling) * canvas.height * 0.1

			let command = x % 10 != 0 ? 'T' : "L"

			path += `${command}${x} ${canvas.height / 2 - y}`
		}
	}

	function dragAndDrop() {
		makeDraggable(el, () => {
		}, undefined, () => {
			data.effects[0].params.delay = el.offsetLeft / el.parentElement.clientWidth * length
		})
	}

	function sampleBufferAt(sample) {
		let output = buffer[Math.floor(sample)] + buffer[Math.floor(sample + 200)]
		return isNaN(output) ? 0 : output
	}

	let circle
	let circleX, circleRad = 0
	playTime.subscribe(value => {
		if (circle !== undefined) {
			let timeInSamp = Math.floor(value - data.effects[0].params.delay)

			circleX = timeInSamp / buffer.length * 100 + "%"

			let circleRadTarget = Math.min(Math.abs(sampleBufferAt(timeInSamp)), 1)
			circleRadTarget = 1 - (circleRadTarget - 1) ** 8
			circleRadTarget *= 100
			circleRad = lerp(circleRadTarget, circleRad, 0.9)

			circle.setAttribute('cx', circleX)
			circle.setAttribute('r', circleRad)
		}
	})
</script>

<div bind:this={el}
	 class="absolute filter drop-shadow-sm-dark duration-300 z-samp
			{isMenuOpened
			? 'below-menu z-selected-samp'
			: 'cursor-move active:transition-filter active:drop-shadow-lg-dark'}"
	 style="left: {data.effects[0].params.delay / length * 100}%">
	<div bind:this={canvas}>
		<svg class="waveform w-full h-full absolute">
			<path d={path} fill="transparent" stroke="blue" stroke-width="1px"/>
		</svg>
		<svg class="circle-visualizer w-full h-full absolute blur-2xl pointer-events-none">
			<circle cy="50%" bind:this={circle} fill="AliceBlue"/>
		</svg>
	</div>
</div>

{#if isMenuOpened}
	<Modal onClose={closeMenu}>
		<SampMenu data={data} sampIndex={sampIndex}/>
	</Modal>
{/if}

<style>
	.below-menu {
		top: calc(100% - 110px) !important;
	}
</style>