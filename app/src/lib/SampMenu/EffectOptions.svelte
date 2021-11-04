<script>
    import {removeEffectFromSamp, toggleEffectInSamp} from "../SampList"

    import Button from "../Button.svelte";

    export let effect, effectIndex, sampIndex
</script>

{#if effect !== undefined}
    <div class="w-14 bg-gray-700 flex flex-col justify-between py-1">
        <Button onClick={() => toggleEffectInSamp(effectIndex, sampIndex)} icon={effect.enabled ? 'on' : 'off'} />
        <Button onClick={() => removeEffectFromSamp(effectIndex, sampIndex)} icon='clear' />
    </div>
{/if}