<script context="module">
	import Dial from "./Dial.svelte"
	import {onMount} from 'svelte'
</script>

<script>
	export let params
	
	let width;
	
	const min = 1
	const max = 200
	
	let path = "";
	function refreshVisual() {
		if (width !== undefined) {
			let crunch = params.downsample.map(min, max, 1, 100)
			let lineCount = width / crunch + 1
			
			path = `M ${-crunch} 100`
			for (let l = 0; l < lineCount; l++) {
				path += `V ${100 + Math.cos(l / lineCount * 20) * 50}`
				path += `h ${crunch}`
			}
		}
	}
	
	onMount(refreshVisual)
	
	Number.prototype.map = function (in_min, in_max, out_min, out_max) {
		 return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}
</script>

<style>
	.bitcrusher {
		border-radius: 10px;
		background: #101010;
		height: 200px;
		position: relative;
	}
	
	.lines {
		display: flex;
		justify-content: space-around;
	}
	
	.vertical.lines {
		flex-direction: column;
	}
	
	.horizontal.line {
		border-left: 1px solid white;
	}
	
	.vertical.line {
		border-bottom: 1px solid white;
	}
	
	.fill {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>

<div class="bitcrusher" bind:clientWidth={width}>
	{#if width !== undefined}
		<div class="grid fill">
			<div class="horizontal lines fill">
				{#each Array(Math.floor(width / 65)) as _}
					<div class="horizontal line"></div>
				{/each}
			</div>
			<div class="vertical lines fill">
				{#each Array(3) as _}
					<div class="vertical line"></div>
				{/each}
			</div>
		</div>
		<div class="visuals fill">
			<svg class="fill">
				<defs>
					<filter id="shadow">
						<feDropShadow dx="0.2" dy="0.4" stdDeviation="10" flood-color="green"/>
					</filter>
				</defs>
				<path d="{path}" fill="transparent" stroke-width="2" stroke="green" style="filter: url(#shadow);"/>
			</svg>
		</div>
		<div class="controls fill">
			<Dial params={params} value="downsample" onchange={refreshVisual} min={min} max={max}/>
		</div>
	{/if}
</div>