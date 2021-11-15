<script>
    import {playTime} from './Time'
    import {lengthInSamples} from './Generate'
    import {doOnPlay} from './Play'
    import {sampleBufferPeak} from './GUILib/SampleBuffer'
    import LerpArray from './Utilities/LerpArray'

    const sampleAmount = 1000
    const meterMovement = new Float32Array(sampleAmount)
    function calculateMeterMovement(buffer) {
        const bufferData = buffer.getChannelData(0)
        for(let s = 0; s < sampleAmount; s++) {
            const voltPeak = sampleBufferPeak(bufferData, s * lengthInSamples / sampleAmount)

            // 10 * log base 10 formula tested against ableton live and
            // taken from https://rexburghams.org/assets/decibeltutorial.pdf
            const decibelPeak = 10 * Math.log10(voltPeak)

            const normalizedPeak = isFinite(decibelPeak) ? decibelPeak : -60

            // maps the decibel peak (goes from -60 to 6) to a number between 0
            // and 1, using an exponential scale that matches the one shown in app
            // visualization: https://www.desmos.com/calculator/wj7aqltwnu
            meterMovement[s] = Math.pow((normalizedPeak + 60), 3) / 287496
        }

        console.log(meterMovement)
    }

    doOnPlay(calculateMeterMovement)
</script>

<div class="absolute w-full h-full bottom-0"
     style="
     background-image: linear-gradient(0deg, #35D22AFF 0%, #F2E610FF 75%, #FFD038FF 75%, #FC2424FF 100%);
     clip-path: inset({100 - LerpArray(meterMovement, $playTime / lengthInSamples * sampleAmount) * 100}% 0px 0px 0px);
">

</div>