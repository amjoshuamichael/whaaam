<script>
	import {assign} from '../UtilGUI/Shortcuts'
	import Play from '../Audio/Play'

	assign("Space", Play)
</script>

<button class="fixed left-3 top-3 z-play-button" on:click={Play}>
	Play
</button>