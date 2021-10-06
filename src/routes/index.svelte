<script context="module">
	export const prerender = true;
</script>

<script>
	import Counter from '$lib/Counter.svelte';
	import SoundSelect from '$lib/SoundSelect.svelte'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<SoundSelect />

	<Counter />
</section>

<style>
	section {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
