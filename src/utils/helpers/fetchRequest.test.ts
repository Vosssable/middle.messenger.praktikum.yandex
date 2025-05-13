import { HTTPTransport } from "./fetchRequest"

const fetch = new HTTPTransport()

describe("Проверки queryStringify для GET запросов", () => {
  it("Проверка на правильную конвертацию", () => {
    const data = { a: 1, b: "test", c: "special & char" }
    expect(fetch.queryStringify(data)).toBe("?a=1&b=test&c=special%20%26%20char")
  })

  it("Проверка на правильный вывод пустой даты", () => {
    expect(fetch.queryStringify({})).toBe("?")
  })

  it("Проверка на формирование с правильной вложенностью", () => {
    const data = { a: { b: 1 } }
    expect(fetch.queryStringify(data)).toBe("?a=%5Bobject%20Object%5D")
  })

  it("Проверка на правильную распаковку массива", () => {
    const data = { a: [1, 2, 3] }
    expect(fetch.queryStringify(data)).toBe("?a=1%2C2%2C3")
  })
})
