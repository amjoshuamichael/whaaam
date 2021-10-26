<script context="module">
	import EffectOptions from './EffectOptions.svelte'

	import Bitcrush from './Bitcrush.svelte'
	import Filter from './Filter.svelte'
	import Reverb from './Reverb.svelte'
	import Delay from './Delay.svelte'
	import Flanger from './Flanger.svelte'
</script>

<script>
	export let data;
</script>

<style>
	.effects {
		padding: 20px;
	}

	.effect-options {
		position: absolute;
		width: 50px;
		height: 200px;
		background-color: darkslategray;
		z-index: 1000;
	}

	.effect {
		position: absolute;
		width: calc(100% - 100px);
		right: 20px;
	}

	.effect-container {
		position: static;
		display: block;
	}
</style>

<div class="effects">
	{#each data.effects as effect}
		{#if effect.name !== "copy"}
			<div class="effect-container">
				<div class="effect-options">
					<EffectOptions effect={effect}/>
				</div>
				<div class="effect">
					{#if effect.name === "bitcrush"}
						<Bitcrush params={effect.params}/>
					{:else if effect.name === "filter"}
						<Filter params={effect.params}/>
					{:else if effect.name === "reverb"}
						<Reverb params={effect.params}/>
					{:else if effect.name === "delay"}
						<Delay params={effect.params}/>
					{:else if effect.name === "flanger"}
						<Flanger params={effect.params}/>
					{/if}
				</div>
			</div>
		{/if}
	{/each}
</div>