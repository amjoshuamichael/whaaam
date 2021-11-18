let shortcuts = []

export function assign (key, fn) {
    shortcuts.push({
        key: key,
        fn: fn
    })
}

export function unassign (key) {
    shortcuts = shortcuts.filter(el => el.key != key)
}

window.onkeydown = function(e) {
    for (const shortcut of shortcuts) {
        if (e.code === shortcut.key) {
            e.preventDefault()
            shortcut.fn()
            break
        }
    }
}