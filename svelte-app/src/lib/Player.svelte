<script context="module">
	export const prerender = true
</script>

<script>
	import {samps} from './SampList.svelte'
	import {getBuffer} from './LoadedSounds'
	import getContext from './AudioContext'
	
	import {delay} from '../../target/wasm-pack/wasm-game-of-life/index.js'
	
	const seconds = 5
	const length = getContext().sampleRate * seconds
	const channels = 2

	const Play = () => {
		console.log('loading Play!')
		samps.forEach(function(samp) {
			let newBuffer = getContext().createBuffer(2, length, getContext().sampleRate);
			for (let c = 0; c < channels; c++) {
				let newBufferData = new Float32Array(length)
				let sampBufferData = getBuffer(samp.name).getChannelData(c)
				
				delay(sampBufferData, newBufferData)
				newBuffer.copyToChannel(newBufferData, c)
			}
			
			let source = getContext().createBufferSource()
			source.buffer = newBuffer
			source.connect(getContext().destination)
			source.start()
			console.log('started Play!')
		})
	}
</script>

<button on:click={Play}>
	Play
</button>