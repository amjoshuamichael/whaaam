<script>
	import { fly } from 'svelte/transition'

	import WandIcon from './Icons/Wand.svelte'
	import AudioIcon from './Icons/Audio.svelte'
	import EffectsTab from './SampMenu/EffectsTab.svelte'

	export let data, sampIndex

	let tab = 0
</script>

<div class="z-menu bg-yellow-500 h-full relative rounded-lg overflow-x-hidden overflow-y-scroll flex items-stretch"
	 transition:fly="{{ y: 200, duration: 500 }}">
		<div class="overflow-x-visible w-16 z-menu-overlay float-left sticky">
			<div class="overflow-x-hidden w-16 h-full hover:w-48 duration-200 bg-white">
				<ul>
					<li>
						<button class="flex p-1.5" on:click={() => tab = 0}>
							<div class="w-10">
								<WandIcon />
							</div>
							<span class="text-center text-3xl p-1.5 pl-5">Effects</span>
						</button>
					</li>
					<li>
						<button class="flex p-1.5" on:click={() => tab = 0}>
							<div class="w-10">
								<AudioIcon />
							</div>
							<span class="text-center text-3xl p-1.5 pl-5">Sample</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
		{#if tab == 0}
			<div class="flex-grow">
				<EffectsTab data={data} sampIndex={sampIndex}/>
			</div>
		{/if}
</div>

<style lang="scss"></style>