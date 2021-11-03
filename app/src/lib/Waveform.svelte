<script>
    import {onMount} from 'svelte';
    import sampleBufferAt from './GUILib/SampleBuffer';

    export let buffer

    let canvas
    let path

    export const refresh = () => {
        let sampling = buffer.length / canvas.clientWidth

        path = `M 0 ${canvas.clientHeight / 2}`

        for (let x = 0; x < canvas.clientWidth - 1; x++) {
            let y = sampleBufferAt(buffer, x * sampling) * canvas.clientHeight * 0.1

            let command = x % 10 != 0 ? 'T' : 'L'

            path += `${command}${x} ${canvas.clientHeight / 2 + y}`
        }
    }

    onMount(refresh)
</script>

<svg class="w-full h-full" bind:this={canvas}>
    <path d={path} fill="transparent" stroke="blue" stroke-width="1px"/>
</svg>