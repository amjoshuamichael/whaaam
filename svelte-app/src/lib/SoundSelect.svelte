<script context="module">
	export const prerender = true
	import {loadSound, getPlayable, isLoaded} from './LoadedSounds'
	import getContext from './AudioContext'
</script>

<script>
	let soundNames = ['kick_house', 'crash_long_echo']
	
	const loadSoundThenPlay = (name) => {
		if (!isLoaded(name)) {
			loadSound(name, function() {
				playSoundBasic(name)
			})
		} else {
			playSoundBasic(name)
		}
	}
	
	const playSoundBasic = (name) => {
		let sound = getPlayable(name)
		sound.connect(getContext().destination)
		sound.start(0)
	}
</script>

<div class="SoundSelect">
	{#each soundNames as soundName}
		<li>
			<button on:click={() => {loadSoundThenPlay(soundName)}}>
				{soundName.replace(/_/g, ' ')}
			</button>
		</li>
	{/each}
</div>