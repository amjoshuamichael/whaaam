<script context="module">
	import { fly } from 'svelte/transition'

	import WandIcon from './Icons/Wand.svelte'
	import AudioIcon from './Icons/Audio.svelte'

	import EffectsTab from './Tabs/Effects.svelte'
</script>

<script>
	export let data

	let tab = 0
</script>

<style lang="scss">
	.samp-menu-container {
		position: relative;
		margin: 50px;
		filter: drop-shadow(0px 2px 10px #00000060);
		display: block;
		z-index: index($order, menu);
	}
	
	.samp-menu {
		width: 100%;
		height: 75vh;
		background-color: blanchedalmond;
		border-radius: 10px;
		overflow: hidden;
	}
	
	.navbar {
		position: absolute;
		left: 0px;
		background-color: #ffffff;
		height: 100%;
		width: 50px;
		border-radius: 10px;
		transition-duration: 0.2s;
		overflow-x: hidden;
		z-index: 3;
		font-family: Larsseit;
	}
	
	.navbar:hover {
		width: 200px;
	}
	
	.icon {
		padding: 5px;
		width: 100%;
		display: flex;
	}
	
	.icon > :global(svg) {
		position: absolute;
		width: 40px;
		height: 40px;
	}
	
	.icon > span {
		font-size: 30px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		padding-left: 50px;
	}
	
	:global(.tab) {
		position: absolute;
		right: 0px;
		width: calc(100% - 50px);
	}
</style>

<div class="samp-menu-container" transition:fly="{{ y: 200, duration: 500 }}">
	<div class="samp-menu">
		<div class="navbar">
			<ul>
				<li>
					<button class="icon" on:click={() => tab = 0}>
						<WandIcon />
						<span>Effects</span>
					</button>
				</li>
				<li>
					<button class="icon" on:click={() => tab = 1}>
						<AudioIcon />
						<span>Sample</span>
					</button>
				</li>
			</ul>
		</div>
		{#if tab == 0}
			<div class="tab">
				<EffectsTab data={data}/>
			</div>
		{/if}
	</div>
</div>