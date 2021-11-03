<script>
    import {removeEffectFromSamp, toggleEffectInSamp} from "../SampList"

    import OnIcon from '../Icons/On.svelte'
    import OffIcon from '../Icons/Off.svelte'
    import ClearIcon from '../Icons/Clear.svelte'
    import Button from "../Button.svelte";

    export let effect, effectIndex, sampIndex
</script>

{#if effect !== undefined}
    <div class="w-14 bg-gray-700 flex flex-col justify-between py-1">
        <Button onClick={() => toggleEffectInSamp(effectIndex, sampIndex)}>
            {#if effect.enabled}
                <OnIcon />
            {:else}
                <OffIcon />
            {/if}
        </Button>
        <Button onClick={() => removeEffectFromSamp(effectIndex, sampIndex)}>
            <ClearIcon />
        </Button>
    </div>
{/if}