<script context="module">
	export const prerender = true;
</script>


<script>
	import SoundSelect from '$lib/SoundSelect.svelte'
	import SampList from '$lib/SampList.svelte'
	import Player from '$lib/Player.svelte'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<SoundSelect />
	<SampList />
	<Player />
</section>

<style>
	section {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
