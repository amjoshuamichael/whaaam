<script context="module">
	import Dial from "./Dial.svelte"
</script>

<script>
	export let params
	
	let width;
</script>

<style>
	.filter {
		border-radius: 10px;
		background: #101010;
		height: 200px;
		position: relative;
	}
</style>

<div class="filter" bind:clientWidth={width}>
	<Dial params={params} modify="frequency" min={0} max={5000} speed={1}/>
	<Dial params={params} modify="q" min={0} max={10} speed={1}/>
</div>