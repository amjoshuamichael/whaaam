<script>
	export let data
	
	import {getBuffer} from './LoadedSounds'
	import {onMount} from 'svelte'
	import {length} from './Generate'
	import {playTime} from './Time'
	import SampMenu from './SampMenu.svelte'
	
	const buffer = getBuffer(data.name).getChannelData(0)
	
	let el
	let canvas
	let ctx
	let sampling
	let isMenuOpened
	
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
	function visualize() {
		ctx = canvas.getContext('2d')
						
		canvas.width = buffer.length / length * el.parentNode.clientWidth
		canvas.height = 100
		canvas.style.width = canvas.width + "px"
		canvas.style.height = canvas.height + "px"
		el.style.width = canvas.style.width
		el.style.height = canvas.style.height
		
		ctx.fillStyle = 'white'
		ctx.translate(1, 1);
		
		sampling = buffer.length / canvas.width
		for (let x = 0; x < canvas.width; x++) {
			let size = buffer[Math.floor(x * sampling)] +
					   buffer[Math.floor(x * sampling + sampling / 2)] 
					   * canvas.height * 0.25
			ctx.fillRect(x, canvas.height / 2 - size, 2, size * 2)
		}
	}	
	function closeMenu() {
		isMenuOpened = false

		dragAndDrop()
		visualize()
		el.style.top = "20%"
	}
	function openMenu() {
		isMenuOpened = true
		el.style.top = null
		el.onmousedown = closeMenu
	}
	
	onMount(function() {
		dragAndDrop()
		visualize()		
		
		let start, end
		el.addEventListener("mousedown", function() {
			  start = +new Date();
		});
		el.addEventListener("mouseup", function() {
			end = +new Date();
			if (end - start < 300) openMenu()
		})
	})
	
	$: start = data.effects[0].params.delay
	$: end = data.effects[0].params.delay + buffer.length + 200 * sampling
	$: if ($playTime > start && $playTime < end) {
		let playHeadIntoSamp = Math.floor(($playTime - start) / sampling - 1)
		ctx.clearRect(0, -1, canvas.width, canvas.height)
		
		for (let x = 0; x < canvas.width; x++) {
			let sizeOffset = x < playHeadIntoSamp ? 10 / (playHeadIntoSamp - x) + 0.25 : 0.25
						
			let size = buffer[Math.floor(x * sampling)] +
					   buffer[Math.floor(x * sampling + sampling / 2)] 
					   * canvas.height * sizeOffset
			ctx.fillRect(x, canvas.height / 2 - size, 2, size * 2)
		}	
	}
	
	
</script>

<style>
	.Samp {
		position: absolute;
		cursor: move;
		background: rgb(15,37,184);
		background: linear-gradient(90deg, rgba(15,37,184,1) 0%, rgba(24,179,193,1) 92%);
		border-radius: 5px;
		filter: drop-shadow(0px 2px 4px #00000040);
		transition: filter 0.2s ease, transform 0.2s ease, top 0.5s ease;
		overflow: hidden;
		transform: scale(1, 1);
	}
	
	.Samp:active {
		filter: drop-shadow(0px 2px 15px #00000060);
		transform: scale(1, 1.1);
		transition: filter 0.2s ease 0.1s, transform 0.2s ease 0.1s;
	}
	
	.Samp.Menu {
		top: calc(100% - 120px);
	}
	
	canvas {
		pointer-events: none;
	}
</style>

<div class="Samp {isMenuOpened && "Menu"}" style="left: {data.effects[0].params.delay / length * 100}%; top: 20%" bind:this={el}>
	<canvas bind:this={canvas}></canvas>
</div>

{#if isMenuOpened}
	<SampMenu data={data} />
{/if}