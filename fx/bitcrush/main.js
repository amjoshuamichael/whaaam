import {effectName} from './effect'

import _wasm from './Cargo.toml'
import html from './index.html'
import css from "./style.scss"
let wasm
async function init()  { wasm = await _wasm() }
init()

Float32Array.prototype[effectName] = function(output, params, sampleRate) {
    wasm.bitcrush(this, output, ...Object.values(params), sampleRate)
}

insertCss(css.styles)
function insertCss(style) {
    const head = document.head || document.getElementsByTagName('head')[0]
    const newStyle = document.createElement('style')
    newStyle.setAttribute('type', 'text/css')
    newStyle.appendChild(document.createTextNode(style))
    head.appendChild(newStyle)
}

document.getElementById(`input`).innerHTML = atob(html)
