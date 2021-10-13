<script context="module">
	export const prerender = true
	import {loadSound, getPlayable, isLoaded} from './LoadedSounds'
	import {addSamp} from './SampList'
	import getContext from './AudioContext'
</script>

<script>
	let soundNames = ['kick_house', 'crash_long_echo', 'bad_bass']
	
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

<style>
	.SoundSelect {
		--padding: 40px;
		--size: 64px;
		position: absolute;
		bottom: var(--padding);
		right: var(--padding);
		width: var(--size);
		height: var(--size);
		border-radius: calc(var(--size) / 2);
		background-color: #4384f0;
		transition-duration: 0.4s;
		z-index: 2;
		overflow: hidden;
	}
	
	.SoundSelect:hover {
		width: calc(100vw - var(--padding) * 2);
		height: calc(100vh - var(--padding) * 2);
		border-radius: calc(var(--size) / 4);
	}
	
	.SoundSelect svg {
		width: var(--size);
		height: var(--size);
		transform: rotate(0turn);
		opacity: 1;
		transition: all 0.3s ease-in-out;
	}
	
	.SoundSelect:hover svg {
		transform: rotate(0.25turn);
		opacity: 0;
	}
	
	.SoundSelect div.sound {
		opacity: 0;
	}
	
	.SoundSelect:hover div.sound {
		opacity: 1;
	}
	
	div.sound {
		width: 20px;
		height: 20px;
	}
</style>

<div class="SoundSelect">
	{#each soundNames as soundName}
		<div class="sound">
			<button on:click={() => addSamp(soundName)}>{soundName}</button>
		</div>
	{/each}
	<svg viewBox="0 0 128 128" version="1.1" style="position: absolute; bottom: 0px; right: 0px;">
		<defs>
			<filter id="inset-shadow"> // adapted from https://stackoverflow.com/questions/20778568/how-to-make-an-inset-drop-shadow-in-svg
			  <feOffset dx="0" dy="0" />
			  <feGaussianBlur stdDeviation="10" result="offset-blur" />
			  <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" /> 
			  <feFlood flood-color="black" flood-opacity="1" result="color" />
			  <feComposite operator="in" in="color" in2="inverse" result="shadow" />
			  <feComponentTransfer in="shadow" result="shadow">
			  	<feFuncA type="linear" slope=".3" />
			  </feComponentTransfer>
			</filter>
		 </defs>
		 <g transform="matrix(1.59827,0,0,1.59827,-514.936,-328.472)">
			 <path d="M358.243,241.551L342.223,241.551C341.119,241.551 340.223,242.447 340.223,243.551L340.223,247.551C340.223,248.655 341.119,249.551 342.223,249.551L358.243,249.551L358.243,265.5C358.243,266.604 359.139,267.5 360.243,267.5L364.243,267.5C365.347,267.5 366.243,266.604 366.243,265.5L366.243,249.551L382.223,249.551C383.327,249.551 384.223,248.655 384.223,247.551L384.223,243.551C384.223,242.447 383.327,241.551 382.223,241.551L366.243,241.551L366.243,225.5C366.243,224.396 365.347,223.5 364.243,223.5L360.243,223.5C359.139,223.5 358.243,224.396 358.243,225.5L358.243,241.551Z" style="fill:white;" />
		 </g>
		<g transform="matrix(1.59827,0,0,1.59827,-514.936,-328.472)">
			<path d="M358.243,241.551L342.223,241.551C341.119,241.551 340.223,242.447 340.223,243.551L340.223,247.551C340.223,248.655 341.119,249.551 342.223,249.551L358.243,249.551L358.243,265.5C358.243,266.604 359.139,267.5 360.243,267.5L364.243,267.5C365.347,267.5 366.243,266.604 366.243,265.5L366.243,249.551L382.223,249.551C383.327,249.551 384.223,248.655 384.223,247.551L384.223,243.551C384.223,242.447 383.327,241.551 382.223,241.551L366.243,241.551L366.243,225.5C366.243,224.396 365.347,223.5 364.243,223.5L360.243,223.5C359.139,223.5 358.243,224.396 358.243,225.5L358.243,241.551Z" style="fill:white;" filter="url(#inset-shadow)" />
		</g>
	</svg>
</div>