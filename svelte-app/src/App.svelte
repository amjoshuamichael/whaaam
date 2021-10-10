<script>
	import SoundSelect from './lib/SoundSelect.svelte'
	import SampList from './lib/SampList.svelte'
	import Player from './lib/Player.svelte'
</script>

<main>
	<h1>Welcome to this website!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<SoundSelect />
	<SampList />
	<Player />
</main>

<style>
	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
	}
	
	:global(body) {
		padding: 0;
		margin: 0;
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
