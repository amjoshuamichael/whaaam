export let icons = {}

export function loadIcons() {
    const iconElements = document.querySelectorAll("div.hidden > svg, div.hidden > img")
    console.log(iconElements)
    for (const el of iconElements) {
        icons[el.id] = el.outerHTML
    }
    console.log(icons)
}
