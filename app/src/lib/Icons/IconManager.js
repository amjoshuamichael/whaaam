export let icons = {}

export function loadIcons() {
    const iconElements = document.querySelectorAll("div.hidden > svg, div.hidden > img")
    for (const el of iconElements) {
        icons[String(el.id)] = el.outerHTML
    }
}
