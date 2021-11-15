Number.prototype.clamp = function(min, max) {
	 return Math.min(Math.max(this, min), max);
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	 return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function lerp(a, b, t) {
	return (1 - t) * a + t * b;
}