let shortcuts = []

export default function (key, fn) {
    shortcuts.push({
        key: key,
        fn: fn
    })
}

window.onkeypress = function(e) {
    for (const shortcut of shortcuts) {
        if (e.code === shortcut.key) {
            shortcut.fn()
            break
        }
    }
}