<script context="module">
	export const prerender = true
</script>

<script>
// 	import {samps} from '$lib/SampList.svelte'
// 	import {getBuffer} from '$lib/LoadedSounds'
// 	import getContext from '$lib/AudioContext'
// 	
// 	const seconds = 5
// 	const length = getContext().sampleRate * seconds
// 	const channels = 2
// 
// 	const Play = () => {
// 		console.log('loading Play!')
// 		samps.forEach(function(samp) {
// 			// let newBuffer = getContext().createBuffer(2, length, getContext().sampleRate);
// 			for (let c = 0; c < channels; c++) {
// 				// let newBufferData = newBuffer.getChannelData(c)
// 				// let sampBuffer = getBuffer(samp.name).getChannelData(c)
// 				// let sampBufferLength = sampBuffer.length - 1
// 				
// 				for (let s = 0; s < length; s++) {
// 					// if (s < samp.delay || s > sampBufferLength) {
// 					// 	newBufferData[s] = 0
// 					// } else {
// 					// 	newBufferData[s] = sampBuffer[s - samp.delay]
// 					// }
// 				}
// 			}
// 			
// 			// let source = getContext().createBufferSource()
// 			// source.buffer = newBuffer
// 			// source.connect(getContext().destination)
// 			// source.start()
// 			console.log('started Play!')
// 		})
// 	}
</script>

<button on:click={Play}>
	Play
</button>