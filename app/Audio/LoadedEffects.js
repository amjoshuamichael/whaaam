import {loadScript} from '../Utilities/LoadScript'

let loadedEffects = {}

export async function loadEffect(name) {
    await loadScript(`fx/${name}.js`)
}

// When an effect script is loaded, it calls this function to register its own code into the loadedEffectGUIs,
// loadedEffectProcessors objects. Declaring it with window.registerEffect = function allows the download script to
// access it.
window.registerEffect = function(name, html, process, onLoadGUI) {
    loadedEffects[name] = {
        'html': html,
        'process': process,
        'onLoadGUI': onLoadGUI
    }
}

export function isEffectLoaded(name) {
    return loadedEffects[name] !== undefined
}

export function getEffectGUI(name) {
    return loadedEffects[name].html
}

export function getEffectProcessor(name) {
    return loadedEffects[name].process
}

export function getEffectOnLoadGUI(name) {
    return loadedEffects[name].onLoadGUI
}