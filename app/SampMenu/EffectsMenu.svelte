<script context="module">
	import {beforeUpdate} from 'svelte'
	import {fly} from 'svelte/transition'

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

<div class="z-menu h-full relative rounded-lg overflow-x-hidden overflow-y-scroll"
	 transition:fly="{{ y: 200, duration: 500 }}">
	<AddEffectMenu sampIndex={sampIndex}/>
	{#each data.effects as effect, index}
		{#if effect.name !== "copy"}
			<Effect effect={effect} effectIndex={index} {sampIndex}/>
		{/if}
	{/each}
</div>