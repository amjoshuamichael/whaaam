<script>
    export let effect, effectIndex, sampIndex

    import EffectOptions from "./EffectOptions.svelte"
    import { fly } from 'svelte/transition'
    import {getEffectGUI, getEffectOnLoadGUI} from '../Audio/LoadedEffects'
    import {onMount} from 'svelte'
    import {alterEffectParameter} from '../Audio/SampList'

    let effectSlot

    onMount(() => {
        effectSlot.innerHTML = getEffectGUI(effect.name)
        getEffectOnLoadGUI(effect.name)(effectSlot)

        for (const slider of effectSlot.querySelectorAll('input[type=range]')) {
            const setSliderParam = () =>
                alterEffectParameter(slider.getAttribute('param'), sampIndex, effectIndex, parseFloat(slider.value))

            if (slider.onchange == undefined) {
                slider.onchange = setSliderParam
            } else {
                const originalOnChange = slider.onchange

                const combinedOnChange = () => {
                    originalOnChange()
                    setSliderParam()
                }

                slider.onchange = combinedOnChange
            }
        }
    })
</script>

<div class="flex w-full h-48 rounded overflow-hidden mb-10" transition:fly={{ x: -200, duration: 500 }}>
    <EffectOptions effect={effect} effectIndex={effectIndex} sampIndex={sampIndex}/>
    <div class="flex-grow relative" id={effect.name} bind:this={effectSlot}></div>
</div>