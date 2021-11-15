<script>
	import { fly } from 'svelte/transition'

	import Button from './Button.svelte'
	import EffectsTab from './SampMenu/EffectsTab.svelte'

	export let data, sampIndex

	let tab = 0
</script>

<div class="z-menu bg-yellow-500 h-full relative rounded-lg overflow-x-hidden overflow-y-scroll flex items-stretch"
	 transition:fly="{{ y: 200, duration: 500 }}">
	{#if tab == 0}
		<div class="flex-grow">
			<EffectsTab data={data} sampIndex={sampIndex}/>
		</div>
	{/if}
</div>

<style lang="scss"></style>