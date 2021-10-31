<script context="module">
	import jQuery from 'jquery'
	import context from '../AudioContext'
	import ripples from 'jquery.ripples'
	import {onMount} from 'svelte'

	import Dial from './Dial.svelte'


</script>

<script>
	export let params, index

	let width;
	$: visualId = `${index}-ripples-visual`;
	let visualEl;
	
	onMount(() => {
		visualEl = jQuery(`#${visualId}`)

		visualEl.ripples({
			dropRadius: 10,
            perturbance: 0.01
		})
	})
	
	let visualTimerID
	let dropTimerID
	function startVisualInASecond() { // technically 1/10th of a second
		clearTimeout(visualTimerID)
		clearTimeout(dropTimerID)
		visualTimerID = setTimeout(startVisual, 1000)
	}
	
	function startVisual() {
		dropTimerID = setTimeout(() => { doDropForVisual(0) }, params.delay / context().sampleRate * 1000)
	}
	
	function doDropForVisual(dropsSoFar) {
		let strength = Math.pow(params.feedback, dropsSoFar)
		if (strength < 0.0001) return

		visualEl.ripples('drop', width / 2, 100, 10, strength);

		dropTimerID = setTimeout(() => { doDropForVisual(dropsSoFar + 1) }, params.delay / context().sampleRate * 1000)
	}
</script>

<div class="flex-grow relative " bind:clientWidth={width}>
	<div id={visualId} class="visuals bg-cover absolute w-full h-full" />
	
	<Dial params={params} modify="delay" onchange={startVisualInASecond} min={0} max={44100} speed={1}/>
	<Dial params={params} modify="feedback" onchange={startVisualInASecond} min={0} max={1} speed={1}/>
</div>

<style>
	.visuals { background-image: url("images/test.jpg"); }
</style>