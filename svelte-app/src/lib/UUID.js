let current = 0

export function getNew() {
    current += 1
    return current
}

export function getLast() {
    return current
}