Number.prototype.clamp = function(min, max) {
	 return Math.min(Math.max(this, min), max);
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	 return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function lerp(a, b, t) {
	return (1 - t) * a + t * b;
}

export function makeRequest(method, url, responseType) {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		request.open(method, url);
		request.responseType = 'arraybuffer'
		request.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(request.response);
			} else {
				reject({
					status: this.status,
					statusText: request.statusText
				});
			}
		};
		request.onerror = function () {
			reject({
				status: this.status,
				statusText: request.statusText
			});
		};
		request.send();
	});
}