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
	<Dial params={params} modify="feedback" min={0.6} max={0.9} speed={1}/>
</div>