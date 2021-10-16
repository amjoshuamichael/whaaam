<script context="module">
	import { fly } from 'svelte/transition'
	import Wand from './Icons/Wand.svelte'
	import Audio from './Icons/Audio.svelte'
	import Effects from './Tabs/Effects.svelte'
</script>

<script>
	export let data
	let tab = 0
	
	function setTab(num) {
		tab = num
		console.log(num)
	}
</script>

<style>
	.samp-menu-container {
		position: relative;
		margin: 50px;
		filter: drop-shadow(0px 2px 10px #00000060);
		display: block;
		z-index: 2;
	}
	
	.samp-menu {
		width: 100%;
		height: 75vh;
		background-color: #d0d0d0;
		border-radius: 10px;
		overflow: hidden;
	}
	
	.navbar {
		position: absolute;
		left: 0px;
		background-color: #808080;
		height: 100%;
		width: 50px;
		border-radius: 10px;
		transition-duration: 0.2s;
		overflow-x: hidden;
		z-index: 3;
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
					<button class="icon" on:click={() => setTab(0)}>
						<Wand />
						<span>Effects</span>
					</button>
				</li>
				<li>
					<button class="icon" on:click={() => setTab(1)}>
						<Audio />
						<span>Sample</span>
					</button>
				</li>
			</ul>
		</div>
		{#if tab == 0}
			<div class="tab">
				<Effects data={data}/>
			</div>
		{/if}
	</div>
</div>