let shortcuts = []

export default function (key, fn) {
    shortcuts.push({
        key: key,
        fn: fn
    })
}

window.onkeypress = function(e) {
    console.log(e)

    shortcuts.forEach(shortcut => {
        if (e.code === shortcut.key) {
            shortcut.fn()
        }
    })
}