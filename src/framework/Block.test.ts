import Block from "./Block"

describe("Тестирование блока", () => {
  describe("Тест блока", () => {
    let blockClass: typeof Block

    beforeAll(() => {
      class Button extends Block {
        constructor(props: any) {
          super({
            ...props
          })
        }

        render() {
          return `<div id="div">{{text}}</div>`
        }
      }

      blockClass = Button
    })

    it("Рендер пропсов", () => {
      const textData = "Inner test text"
      const buttonComponent = new blockClass({ text: textData })
      const res = (buttonComponent.element as unknown as HTMLDivElement)?.innerHTML

      expect(res).toBe(textData)
    })

    it("Эвент тест", () => {
      const handler = jest.fn()
      const buttonComponent = new blockClass({
        text: "I am button!", events:
          { click: handler }
      })

      const event = new MouseEvent("click");
      (buttonComponent.element as unknown as HTMLDivElement)?.dispatchEvent(event)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it("Сэт Пропс", () => {
      const buttonComponent = new blockClass({ text: "TestText" })
      const renderSpy = jest.spyOn(buttonComponent, "setProps")

      renderSpy.mockClear()
      buttonComponent.setProps({ text: "updated" })

      expect(renderSpy).toHaveBeenCalledTimes(1)
    })
  })
})