import lerp from 'lerp'

export default function (array, alpha) {
    const a = array[Math.floor(alpha)]
    const b = array[Math.floor(alpha) + 1]
    const t = alpha % 1
    
    return lerp(a, b, t)
}