<script>
    export let onClose;
    import { fade } from 'svelte/transition'
</script>

<div class="z-menu p-10 fixed z-menu w-full h-full pointer-events-none">
        <div class="pointer-events-auto h-full pb-20">
                <slot></slot>
        </div>
</div>
<div class="w-full h-full bg-gray-500 opacity-20 fixed" on:mousedown="{onClose}" transition:fade />