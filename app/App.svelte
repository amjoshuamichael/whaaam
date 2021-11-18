<script>
	import SoundSelect from './SoundSelect/SoundSelect.svelte'
	import SampList from './Timeline/Timeline.svelte'
	import IconLoader from './Icons/IconLoader.svelte'
</script>

<!-- I don't know why, but if this is anything but 'global lang="postcss"', the tailwind compiler won't work. I'm-->
<!-- pretty sure I wrote this myself, so I'm sure I knew the reason then, but I've clearly forgotten.-->
<!-- TL;DR: DO NOT TOUCH THE LINE BELOW!-->
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
</main>