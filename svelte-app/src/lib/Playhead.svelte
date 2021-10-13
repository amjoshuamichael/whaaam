<script context="module">
	import {playTime} from './Time'
	import {length} from './Generate'
</script>

<style>
	.Playhead {
		position: absolute;
		width: 10px;
		height: 100%;
		top: 0px;
		background-color: #a0a0a0;
		background: rgb(195,216,255);
		background: linear-gradient(90deg, rgba(195,216,255,0) 0%, rgba(195,210,214,1) 87%);
	}
</style>

<div class="Playhead" style="left: calc({$playTime / length * 100}% - 10px)"></div>