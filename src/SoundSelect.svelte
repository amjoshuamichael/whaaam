<script context="module">
	export const prerender = true
	import {loadSound, getPlayable, isLoaded} from './LoadedSounds'
	import {addSamp} from './SampList'
	import getContext from './AudioContext'
</script>

<script>
	let soundNames = ['knife_hit_1', 'paper_crumple_1', 'air_pump_1', 'air_pump_2', 'clip_hit_1', 'clip_hit_2', 'container_hit_1', 'container_hit_2', 'container_scrape_1', 'door_stopper_rattle_1', 'door_stopper_rattle_2', 'exercise_ball_hit_1', 'exercise_ball_hit_2', 'foam_rip_1', 'foam_rip_2', 'foam_rip_3', 'foam_rip_4', 'foam_rub_1', 'foam_rub_2', 'foam_rub_long_1', 'foam_scrape_1', 'foam_scrape_2', 'foam_scrape_3', 'foam_scrape_short_1', 'foam_scrape_short_2', 'glass_cup_hit_1', 'glass_cup_hit_2', 'glass_hit_long_1', 'glass_hit_long_2', 'glass_hit_long_3', 'glass_scrape_1', 'glass_scrape_2', 'glass_scrape_3', 'glass_tone_1', 'ice_rattle_1', 'keys_rattle_1', 'kitchen_timer_alarm_1', 'kitchen_timer_loadup_1', 'knife_hit_2', 'large_container_hit_1', 'large_container_hit_2', 'large_leaf_hit_1', 'large_water_bottle_hit_loud_1', 'large_water_bottle_hit_loud_2', 'large_water_bottle_hit_quiet_1', 'lazer_slinky_1', 'lazer_slinky_2', 'leaf_hit_1', 'metal_jiggle_1', 'metal_jiggle_2', 'microphone_rub_1', 'microphone_rub_2', 'microphone_rub_3', 'paper_crumble_3', 'paper_crumple_2', 'paper_movement_1', 'plastic_scrape_1', 'plastic_scrunch_1', 'post_it_spin_1', 'post_it_spin_2', 'scissors_1', 'slinky_rattle_1', 'slinky_rattle_2', 'smooth_container_hit_1', 'speed_bump_1', 'speed_bump_2', 'speed_bump_3', 'speedcube_spin_1', 'speedcube_spin_2', 'spray_bottle_1', 'spray_bottle_2', 'straw_pullout_1', 'straw_pullout_2', 'table_hit_1', 'toy_gun_load_1', 'toy_gun_load_2', 'toy_gun_load_3', 'toy_gun_shoot_1', 'toy_gun_shoot_2', 'toy_gun_trigger', 'velcro_1', 'velcro_2', 'velcro_3', 'water_bottle_shake', 'water_hit_1', 'water_hit_2', 'water_hit_3', 'water_splash_1', 'wood_hit_1', 'wood_hit_2', 'wood_rub_1', 'wood_rub_2']

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
		overflow: scroll;
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
	<svg viewBox="0 0 128 128" style="position: absolute; bottom: 0px; right: 0px;">
		<defs>
			// adapted from https://stackoverflow.com/questions/20778568/how-to-make-an-inset-drop-shadow-in-svg
			<filter id="inset-shadow">
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