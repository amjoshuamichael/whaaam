export default function (method, url, responseType) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open(method, url);
        request.responseType = responseType

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