<script context="module">
	export const prerender = true
	
	import {samps} from './SampList'
	import getContext from './AudioContext'
	import GenBuffer from './Generate'
	import {startTimer} from './Time'
	
	let onPlay = []
	export function doOnPlay(callback) {
		onPlay.push(callback)
	}
</script>

<script>
	const Play = () => {
		let newBuffer = GenBuffer($samps)
			
		let source = getContext().createBufferSource()
		source.buffer = newBuffer
		source.connect(getContext().destination)
		source.start()
		
		startTimer()
		
		onPlay.forEach((fn) => {fn()})
	}
</script>

<style>
	.Play {
		position: fixed;
		top: 20px;
		left: 20px;
	}
</style>

<button class="Play" on:click={Play}>
	Play
</button>