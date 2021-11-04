<script>
	import SoundSelect from './lib/SoundSelect.svelte'
	import SampList from './lib/SampList.svelte'
	import Player from './lib/Player.svelte'
	import IconLoader from './lib/Icons/IconLoader.svelte'
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind utilities;

	main {
		padding: 1em;
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
</style>

<main>
	<IconLoader />
	<SoundSelect />
	<SampList />
	<Player />
</main>
