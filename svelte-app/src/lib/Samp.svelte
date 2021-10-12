<script>
	export let data
	
	import {getBuffer} from './LoadedSounds'
	import getContext from './AudioContext'
	import {onMount} from 'svelte'
	
	let visual = []
	
	const barWidth = 1;
	const barHeightInverse = 2;
	const height = 100;
	const sampling = 100;
	const smoothing = 2;

	let dataBuffer = getBuffer(data.name).getChannelData(0)
	let spacing = getContext().sampleRate / sampling
	let barCount = Math.floor(dataBuffer.length / spacing) - 1
	let dataIndex = 0
	
	for (let b = 0; b < barCount; b++) {
		dataIndex += spacing
		visual.push(
			( 
			  Math.abs(dataBuffer[dataIndex]) 
			+ Math.abs(dataBuffer[Math.floor(dataIndex + spacing / 4)])
			+ Math.abs(dataBuffer[Math.floor(dataIndex + spacing / 2)])
			+ Math.abs(dataBuffer[Math.floor(dataIndex + 3 * spacing / 4)])
			) / barHeightInverse
		)
	}
	
	for (let s = 0; s < smoothing; s++) {
		for (let b = 1; b < barCount; b++) {
			visual[b] = (visual[b] + visual[b - 1]) / 2
		}
	}
	
	
	let el
	
	onMount(function() {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		el.onmousedown = dragMouseDown;
		
		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}
		
		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();

			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			el.style.top = (el.offsetTop - pos2) + "px";
			el.style.left = (el.offsetLeft - pos1) + "px";
			data.effects[0].params.delay = el.offsetLeft * spacing
		}
		
		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	})
		
</script>

<style>
	.Samp {
		position: absolute;
	}
</style>

<div class="Samp" style="left: {data.effects[0].params.delay / spacing}px; top: {Math.random() * 100}px" bind:this={el}>
	<svg style="width: {barCount * barWidth}; height: {height};">
		{#each visual as bar, i}
			<rect fill="#000000" width="{barWidth * 2}" height="{bar * height / 2}" x="{i * barWidth}" y ="{height / 2 - bar * height / 4}"></rect>
		{/each}
	</svg>
</div>