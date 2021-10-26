<script>
    export let onClose;
    import { fade } from 'svelte/transition'
</script>

<style lang="scss">
    .container {
        background-color: #40404040;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: index($order, modal);
    }
</style>

<div class="container" on:click="{onClose}" transition:fade>
    <slot></slot>
</div>