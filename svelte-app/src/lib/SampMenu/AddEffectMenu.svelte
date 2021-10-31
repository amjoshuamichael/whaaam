<script>
    import {addEffectToSamp} from '../SampList'
    export let sampIndex
</script>

<button on:click={() => addEffectToSamp('bitcrush', sampIndex)}>Bitcrush</button>
<button on:click={() => addEffectToSamp('delay', sampIndex)}>ripple</button>
<button on:click={() => addEffectToSamp('flanger', sampIndex)}>flanger</button>