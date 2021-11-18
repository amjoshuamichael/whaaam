<script>
    import {removeEffectFromSamp, toggleEffectInSamp} from "../Audio/SampList"

    import Button from "../UtilComponents/Button.svelte";

    export let effect, effectIndex, sampIndex
</script>

{#if effect !== undefined}
    <div class="w-14 bg-gray-700 flex flex-col justify-between py-1">
        <div class="w-14 h-14 top-0 relative">
            <Button onClick={() => toggleEffectInSamp(effectIndex, sampIndex)} icon={effect.enabled ? 'on' : 'off'} />
        </div>
        <div class="w-14 h-14 bottom-0 relative">
            <Button onClick={() => removeEffectFromSamp(effectIndex, sampIndex)} icon='clear' />
        </div>
    </div>
{/if}