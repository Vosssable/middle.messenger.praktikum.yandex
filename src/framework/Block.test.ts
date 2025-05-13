import Block from "./Block"
import { Indexed } from "../utils/interfaces/frameworkInterfaces"

describe("Тестирование блока компонента", () => {
  let blockClass: typeof Block
  const textData = "Inner test text"

  beforeAll(() => {
    class Button extends Block {
      constructor(props: Indexed) {
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

  describe("Тест блока", () => {
    it("Рендер пропсов", () => {
      const buttonComponent = new blockClass({ text: textData }),
        res = (buttonComponent.element as HTMLDivElement)?.innerHTML

      expect(res).toBe(textData)
    })

    it("Эвент тест", () => {
      const handler = jest.fn(),
        buttonComponent = new blockClass({
          text: textData, events:
            { click: handler }
        }), event = new MouseEvent("click");

      (buttonComponent.element as HTMLDivElement)?.dispatchEvent(event)

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it("Проверка метода .show", () => {
      const buttonComponent = new blockClass({ text: textData})

      buttonComponent.show()
      const res = (buttonComponent.element as HTMLDivElement)?.classList.contains('display-block')

      expect(res).toBe(true)
    })

    it("Проверка метода .hide", () => {
      const buttonComponent = new blockClass({ text: textData })

      buttonComponent.show()
      let res = (buttonComponent.element as HTMLDivElement)?.classList.contains('display-block')

      if (res) {
        buttonComponent.hide()
        res = (buttonComponent.element as HTMLDivElement)?.classList.contains('display-block')
      }

      expect(res).toBe(false)
    })

    it("Сэт Пропс", () => {
      const buttonComponent = new blockClass({ text: textData }),
        renderSpy = jest.spyOn(buttonComponent, "setProps")

      renderSpy.mockClear()
      buttonComponent.setProps({ text: "updated" })

      expect(renderSpy).toHaveBeenCalledTimes(1)
    })
  })
})
