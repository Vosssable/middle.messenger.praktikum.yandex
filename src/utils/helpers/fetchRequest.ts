import { KeyValueInterface, ReqDataValueInterface } from "../interfaces/requestInterfaces"

const METHODS: Record<string, string> = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH"
}

type Options = {
  method?: string
  headers?: KeyValueInterface
  data?: unknown
  body?: string | FormData
  timeout?: number
}

function queryStringify(data: ReqDataValueInterface) {
  return (
    "?" +
    Object.keys(data)
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(data[key].toString())}`
      })
      .join("&")
  )
}

export class HTTPTransport {
  private newMethod(method: string) {
    return (url: string, options: Options = {}) => {
      return this.request(url, { ...options, method }, options.timeout);
    }
  }

  queryStringify = queryStringify
  get = this.newMethod(METHODS.GET)
  post = this.newMethod(METHODS.POST)
  put = this.newMethod(METHODS.PUT)
  delete = this.newMethod(METHODS.DELETE)
  patch = this.newMethod(METHODS.PATCH)
  request = (url: string, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject("You need method")
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === METHODS.GET

      xhr.open(
        method,
        isGet && !!data
          ? `https://ya-praktikum.tech/api/v2${url}${queryStringify(<ReqDataValueInterface>data)}`
          : `https://ya-praktikum.tech/api/v2${url}`
      )

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, <string>headers[key])
      })

      xhr.withCredentials = true
      xhr.timeout = timeout

      xhr.onload = function() {
        const status = xhr.status
        if (status >= 200 && status < 300) {
          resolve(xhr.response)
        } else {
          const msg = {
            '100': 'Info',
            '200': 'Success',
            '300': 'Redirect failed',
            '400': 'Access denied',
            '500': 'Internal server error',
          }[Math.floor(status/100) * 100]
          reject({status, reason: xhr.response?.reason || msg})
        }
        resolve(xhr)
      }
      xhr.onabort = () => reject('Aborted')
      xhr.onerror = () => reject('Error')
      xhr.ontimeout = () => reject('Timeout')

      if (isGet || !data) {
        xhr.send()
      } else {
        xhr.send(<XMLHttpRequestBodyInit>data)
      }
    })
  }
}
