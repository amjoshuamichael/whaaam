<script>
	export let data
	
	import {getBuffer} from './LoadedSounds'
	import getContext from './AudioContext'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	
	let visual = []
	
	const barWidth = 1
	const sampling = 100
	const barHeightInverse = 2
	const height = 100
	const smoothing = 2

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
			
		}
		
		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
			data.effects[0].params.delay = el.offsetLeft / el.parentElement.clientWidth * length
		}
	})		
</script>

<style>
	.Samp {
		position: absolute;
		cursor: move;
		background: rgb(255,244,96);
		background: linear-gradient(45deg, rgba(255,244,96,1) 0%, rgba(255,207,0,1) 100%);
		border-radius: 15px;
		filter: drop-shadow(0px 2px 2px #e7e7e7);
		transition-property: filter;
		transition-duration: 0.2s;
	}
	
	.Samp:active {
		filter: drop-shadow(0px 2px 10px #d7d7d7);
	}
</style>

<div class="Samp" style="left: {data.effects[0].params.delay / length * 100}%; top: {Math.random() * 100}px" bind:this={el}>
	<svg style="width: {barCount * barWidth}; height: {height};">
		{#each visual as bar, i}
			<rect fill="#000000" width="{barWidth * 2}" height="{bar * height / 2}" x="{i * barWidth}" y ="{height / 2 - bar * height / 4}"></rect>
		{/each}
	</svg>
</div>