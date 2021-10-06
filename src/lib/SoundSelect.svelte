<script context="module">
	export const prerender = true;
	import {audioContext} from '$lib/AudioContext.js'
	import {onMount} from 'svelte'
</script>

<script>
	let soundNames = ['badng', 'crash']
	let newSound;
	// let newSound = document.createElement("audio")
	// newSound.src = 'samples/kick_house.wav'
		
	const loadSound = () => {
		if (!newSound) {
			newSound = document.createElement("audio")
			newSound.src = 'samples/crash_long_echo.wav'
			
			const track = audioContext.createMediaElementSource(newSound)
			track.connect(audioContext.destination)
			
			newSound.addEventListener('ended', () => {
				console.log('soundEnd!')
			}, false)
			
			console.log('load')
		}
		
		if (audioContext.state === 'suspended') audioContext.resume()
		
		newSound.play()
	}
</script>

<div class="SoundSelect">
	{#each soundNames as soundName}
		<button on:click={loadSound}>
			{soundName}
		</button>
	{/each}
</div>