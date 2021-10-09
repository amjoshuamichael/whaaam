<script>
	export let greet;
		
	import SoundSelect from './lib/SoundSelect.svelte'
	import SampList from './lib/SampList.svelte'
	import Player from './lib/Player.svelte'
</script>

<main>
	<h1>{greet}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<SoundSelect />
	<SampList />
	<Player />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
