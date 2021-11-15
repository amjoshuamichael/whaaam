<script>
	import SoundSelect from './SoundSelect.svelte'
	import SampList from './SampList.svelte'
	import Player from './Player.svelte'
	import Meter from './Meter.svelte'
	import IconLoader from './Icons/IconLoader.svelte'
	import Trash from './Trash.svelte'
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
	<Meter />
	<Trash />
</main>
