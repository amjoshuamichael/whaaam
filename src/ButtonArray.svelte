<script>
    export let buttons

    import Button from './Button.svelte'
</script>

{#each Object.entries(buttons) as [icon, fn]}
    <Button onClick={fn} icon={icon} />
{/each}