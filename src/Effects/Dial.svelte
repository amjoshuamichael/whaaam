<script>
	import {onMount} from 'svelte'
	import {alterEffectParameter} from '../SampList'
	import Play from '../Play'

	export let params, modify, onchange = undefined, min, max, speed
	
	let rotation = 0
	let rotOnClick
	let mouseOnClick
	const rotMin = -140
	const rotMax = 140
	
	function startDial(event) {
		document.onmouseup = stopDial
		document.onmousemove = moveDial
		rotOnClick = rotation
		mouseOnClick = event
	}
	
	function moveDial(event) {
		rotation = 
			(rotOnClick + 
				(
					(event.clientX - mouseOnClick.clientX) 
					+ (mouseOnClick.clientY - event.clientY)
				) * speed
			).clamp(rotMin, rotMax)
		
		params[modify] = rotation.map(rotMin, rotMax, min, max)

		onchange?.()
	}
	
	function stopDial() {
		document.onmouseup = null
		document.onmousemove = null
		Play()
	}

	onMount(function() {
		rotation = params[modify].map(min, max, rotMin, rotMax)
	})
</script>

<style>
	svg {
		width: 60px;
		height: 60px;
	}
</style>

<div class="dial">
	<svg viewBox="0 0 48 48" on:mousedown={startDial} style="transform: rotate({rotation}deg)">
		<path d="M19.411,7.389C19.904,7.284 20.365,7.04 20.735,6.673L22.882,4.546C23.208,4.224 23.639,4.072 24.065,4.09C24.472,4.089 24.879,4.244 25.19,4.555L27.33,6.689C27.646,7.005 28.03,7.23 28.444,7.356C28.89,7.478 29.368,7.484 29.831,7.363L32.754,6.594C33.189,6.48 33.629,6.557 33.985,6.774C34.351,6.975 34.638,7.32 34.755,7.754L35.541,10.672C35.666,11.135 35.91,11.547 36.239,11.874C36.553,12.17 36.938,12.39 37.368,12.508L40.284,13.304C40.697,13.417 41.028,13.683 41.231,14.025C41.471,14.39 41.56,14.852 41.438,15.307L40.66,18.227C40.529,18.718 40.542,19.226 40.685,19.695C40.813,20.079 41.028,20.436 41.323,20.733L43.45,22.88C43.758,23.191 43.911,23.597 43.911,24.002C43.927,24.428 43.772,24.86 43.448,25.186L41.314,27.326C40.967,27.673 40.728,28.102 40.612,28.563C40.52,28.975 40.524,29.41 40.635,29.832L41.403,32.755C41.514,33.176 41.445,33.601 41.245,33.951C41.046,34.331 40.695,34.631 40.248,34.751L37.33,35.537C36.872,35.66 36.464,35.901 36.139,36.224C35.836,36.541 35.61,36.932 35.49,37.369L34.694,40.285C34.576,40.715 34.292,41.057 33.929,41.258C33.572,41.474 33.13,41.55 32.695,41.434L29.775,40.655C29.334,40.538 28.879,40.537 28.451,40.641C28.01,40.76 27.6,40.992 27.265,41.324L25.118,43.451C24.791,43.775 24.359,43.928 23.933,43.911C23.528,43.91 23.123,43.755 22.813,43.445L20.673,41.311C20.362,41.001 19.986,40.777 19.581,40.651C19.126,40.521 18.638,40.512 18.165,40.636L18.109,40.614L15.184,41.372C14.338,41.592 13.475,41.088 13.248,40.246L12.462,37.328C12.332,36.846 12.072,36.419 11.723,36.086C11.416,35.808 11.044,35.601 10.632,35.487L10.568,35.437L7.678,34.637C6.837,34.404 6.34,33.537 6.565,32.693L7.343,29.773C7.468,29.305 7.462,28.823 7.338,28.373C7.214,27.962 6.99,27.58 6.677,27.264L4.55,25.117C4.242,24.806 4.088,24.4 4.089,23.994C4.073,23.568 4.228,23.136 4.553,22.81L6.688,20.671C7.025,20.332 7.26,19.917 7.379,19.47C7.481,19.047 7.479,18.6 7.365,18.165L6.597,15.242C6.375,14.397 6.875,13.532 7.716,13.302L10.632,12.506C10.651,12.5 10.671,12.495 10.69,12.489L10.675,12.463C11.059,12.359 11.409,12.173 11.703,11.925C12.086,11.585 12.37,11.138 12.51,10.628L13.306,7.712C13.536,6.871 14.401,6.37 15.246,6.593L18.169,7.361C18.189,7.366 18.208,7.371 18.228,7.375L18.228,7.345C18.621,7.449 19.025,7.462 19.411,7.389Z" style="fill:url(#_Radial1);fill-rule:nonzero;"/>
		<defs>
			<radialGradient id="_Radial1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(10,0,0,-10,24,15)"><stop offset="0" style="stop-color:rgb(158,23,194);stop-opacity:1"/><stop offset="0.16" style="stop-color:rgb(166,29,200);stop-opacity:1"/><stop offset="0.38" style="stop-color:rgb(183,44,212);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(231,86,247);stop-opacity:1"/></radialGradient>
		</defs>
	</svg>
</div>

