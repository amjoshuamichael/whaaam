<script context="module">
	import {beforeUpdate} from 'svelte'

	import Effect from "./Effect.svelte";
</script>

<script>
	import AddEffectMenu from "./AddEffectMenu.svelte";

	export let data, sampIndex

	function refresh() {
		data = data
	}

	beforeUpdate(() => {
		data.effects = data.effects.filter(x => x !== undefined)
	})
</script>

<div class="w-full h-full p-10 overflow-y-scroll">
	<AddEffectMenu sampIndex={sampIndex}/>
	{#each data.effects as effect, index}
		{#if effect.name !== "copy"}
			<Effect effect={effect} effectIndex={index} {sampIndex}/>
		{/if}
	{/each}
</div>