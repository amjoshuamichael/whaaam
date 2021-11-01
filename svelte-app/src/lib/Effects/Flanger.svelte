<script context="module">
	import Dial from './Dial.svelte'
	import {onMount} from 'svelte'
	import getContext from '../AudioContext'
	import {doOnPlay} from '../Player.svelte'
</script>

<script>
	export let params, index
	
	let width;
	
	let curve = 0
	
	let path = "";
	function refreshVisual() {
		if (width !== undefined) {	
			let curveTan = Math.tan(curve * Math.PI)
					
			path = `M ${-10} 100`
			let x = 0			
			while (x < width) {
				let transX = (x - width / 2) / 100;
				let dx = transX * transX / curveTan * 20
				x += Math.abs(dx).clamp(0.5, 10)
				
				let y = (curveTan / transX + 100).clamp(-200, 200)
				let distFromCenter = Math.abs(x - width / 2)
				
				if (distFromCenter < 2) {
					y = Math.sign(y - 100) * 1000
					path += `M ${x} ${y}`
				} else if (distFromCenter < 3) {
					y = Math.sign(y - 100) * 1000
					path += `L ${x} ${y}`
				} else {
					path += `V ${y}`
				}
				
				path += `H ${x}`
			}
		}
	}
	
	const refreshRate = 20;
	onMount(function() {
		setInterval(function() {
			let curveAdd = params.speed / 400 * (getContext().sampleRate / refreshRate)
			curve += curveAdd
			refreshVisual()
		}, 1000 / refreshRate)
		
		doOnPlay(function() {
			curve = 0
		})
	})
	
	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};
</script>

<style>
	.fill {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>

<div class="flex-grow effect" bind:clientWidth={width}>
	<div class="visuals fill">
		<svg class="fill" style="background: #2b73ff">
			<path d="{path}" fill="transparent" stroke-width="5" stroke="white"/>
		</svg>
	</div>
	<Dial params={params} modify="speed" min={0.005} max={0.2} speed={1}/>
</div>