import {effectName, loadGUI} from './effect'

// noinspection ES6UnusedImports (will be used by postcss)
import css from './style.scss'

import _html from './index.html'
import _wasm from './Cargo.toml'

async function init()  {
    let wasm = await _wasm(), html = atob(_html)

    const process = (input, output, params, sampleRate) =>
        wasm.bitcrush(input, output, ...Object.values(params), sampleRate)

    registerEffect(effectName, html, process, loadGUI)
}
init()

