<script>
	export let data
	
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	
	let el
	let canvas
	
	function dragAndDrop() {
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
	}
	
	onMount(function() {
		dragAndDrop()
		
		const ctx = canvas.getContext('2d')
		const buffer = getBuffer(data.name).getChannelData(0)
		
		canvas.width = buffer.length / length * el.parentNode.clientWidth
		console.log(buffer.length, length)
		canvas.height = 100
		canvas.style.width = canvas.width + "px"
		canvas.style.height = canvas.height + "px"
		el.style.width = canvas.style.width
		el.style.height = canvas.style.height
		
		ctx.fillStyle = 'black'
		ctx.translate(1, 1);
		
		const sampling = buffer.length / canvas.width
		for (let x = 0; x < canvas.width; x++) {
			let size = buffer[Math.floor(x * sampling)] +
					   buffer[Math.floor(x * sampling + sampling / 2)] 
					   * canvas.height / 4
			ctx.fillRect(x, canvas.height / 2 - size, 2, size * 2)
		}
	})
</script>

<style>
	.Samp {
		position: absolute;
		cursor: move;
		background: rgb(255,244,96);
		background: linear-gradient(45deg, rgba(255,244,96,1) 0%, rgba(255,207,0,1) 100%);
		border-radius: 5px;
		filter: drop-shadow(0px 2px 2px #e7e7e7);
		transition-property: filter;
		transition-duration: 0.2s;
		overflow: hidden;
	}
	
	.Samp:focus {
		filter: drop-shadow(0px 2px 10px #d7d7d7);
	}
	
	canvas {
		pointer-events: none;
	}
</style>

<div class="Samp" style="left: {data.effects[0].params.delay / length * 100}%; top: {Math.random() * 100}px" bind:this={el}>
	<canvas bind:this={canvas}></canvas>
</div>