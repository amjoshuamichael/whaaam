<script context="module">
	export const prerender = true
	
	import {samps} from './SampList'
	import getContext from './AudioContext'
	import GenBuffer from './Generate'
	import {setStartTime} from './Time'
</script>

<script>
	const Play = () => {
		let newBuffer = GenBuffer($samps)
			
		let source = getContext().createBufferSource()
		source.buffer = newBuffer
		source.connect(getContext().destination)
		source.start()
		
		setStartTime()
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