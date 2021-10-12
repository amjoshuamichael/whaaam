<script context="module">
	export const prerender = true
</script>

<script>
	import {samps} from './SampList'
	import getContext from './AudioContext'
	import GenBuffer from './Generate'

	const Play = () => {
		console.log('loading Play!')
		$samps.forEach(function(samp) {
			let newBuffer = GenBuffer(samp)
			
			let source = getContext().createBufferSource()
			source.buffer = newBuffer
			source.connect(getContext().destination)
			source.start()
		})
		console.log('play Started!')
	}
</script>

<button on:click={Play}>
	Play
</button>