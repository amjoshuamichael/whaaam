<script context="module">
    import EffectOptions from "./EffectOptions.svelte"
    import { fly } from 'svelte/transition'

    import Bitcrush from '../Effects/Bitcrush.svelte'
    import Filter from '../Effects/Filter.svelte'
    import Reverb from '../Effects/Reverb.svelte'
    import Delay from '../Effects/Delay.svelte'
    import Flanger from '../Effects/Flanger.svelte'
</script>

<script>
    export let effect, effectIndex, sampIndex
</script>

<div class="flex w-full h-48 rounded overflow-hidden mb-10" transition:fly="{{ x: -200, duration: 500 }}">
    <EffectOptions effect={effect} effectIndex={effectIndex} sampIndex={sampIndex}/>
    {#if effect.name === "bitcrush"}
        <Bitcrush params={effect.params} index={sampIndex}/>
    {:else if effect.name === "filter"}
        <Filter params={effect.params}/>
    {:else if effect.name === "reverb"}
        <Reverb params={effect.params}/>
    {:else if effect.name === "delay"}
        <Delay params={effect.params} index={sampIndex}/>
    {:else if effect.name === "flanger"}
        <Flanger params={effect.params} index={sampIndex}/>
    {/if}
</div>