import {KeyValueInterface, ReqDataValueInterface} from "../interfaces/requestInterfaces";

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
}

type Options = {
    method?: string
    headers?: KeyValueInterface
    data?: unknown
    timeout?: number
}

function queryStringify(data: ReqDataValueInterface) {
    return (
        '?' +
        Object.keys(data)
            .map((key) => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(data[key].toString())}`;
            })
            .join('&')
    );
}

class HTTPTransport {
    get = (url: string, options: Options = {}) => {

        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {

        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {

        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {

        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: Options = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('You need method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(<ReqDataValueInterface>data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, <string>headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(<XMLHttpRequestBodyInit>data);
            }
        });
    };

}

console.log(HTTPTransport)