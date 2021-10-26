<script context="module">
	import Dial from './Dial.svelte'
	import jQuery from 'jquery'
	import ripples from 'jquery.ripples'
</script>

<script>
	export let params
	
	let width;
	let visual;
	
	$: if (visual !== undefined) {
		jQuery('.fill').ripples({
			dropRadius: 15
		})
	}
	
	let visualTimerID
	let dropTimerID
	function startVisualInASecond() { // technically 1/10th of a second
		clearTimeout(visualTimerID)
		clearTimeout(dropTimerID)
		visualTimerID = setTimeout(startVisual, 1000)
	}
	
	function startVisual() {
		doDropForVisual(0)
	}
	
	function doDropForVisual(dropsSoFar) {
		let strength = Math.pow(params.feedback, dropsSoFar)
		console.log(params.feedback, dropsSoFar, strength)
		if (strength < 0.0001) return
		
		jQuery('.fill').ripples('drop', width / 2, 100, 20, strength);
		
		console.log(dropsSoFar + 1, params.delay / 10)
		dropTimerID = setTimeout(function() { doDropForVisual(dropsSoFar + 1) }, 1000)
	}
</script>

<style>
	.effect {
		border-radius: 10px;
		background: #101010;
		height: 200px;
		position: relative;
	}
	
	.fill {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.visuals {
		background-image: url("images/test.jpeg");
		background-size: cover;
	}
</style>

<div class="effect" bind:clientWidth={width}>
	<div class="visuals fill" bind:this={visual}>
		
	</div>
	
	<Dial params={params} modify="delay" onchange={startVisualInASecond} min={0} max={20000} speed={1}/>
	<Dial params={params} modify="feedback" min={0} max={1} speed={1}/>
</div>