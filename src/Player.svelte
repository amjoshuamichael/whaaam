<script>
	import {assign} from './GUILib/Shortcuts'
	import Play from './Play'

	assign("Space", Play)
</script>

<button class="fixed left-3 top-3 z-play-button" on:click={Play}>
	Play
</button>