<script>
  export let message = '';
  export let closeAction;
</script>

<style>
  h2 {
		font-size: 2rem;
		text-align: center;
	}
</style>

<h2>{message}</h2>
<button on:click={closeAction}>Close</button>