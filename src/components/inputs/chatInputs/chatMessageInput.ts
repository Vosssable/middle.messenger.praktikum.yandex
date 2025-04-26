import Block from "../../../framework/Block"
import { getSocket } from "../../../utils/helpers/webSocket"

export default class ChatMessageInput extends Block {
  constructor() {
    super({
      events: {
        keydown: (event: KeyboardEvent) => {
          if (event.key !== 'Enter') return
          const input = document.getElementById('input_message') as HTMLInputElement
          if (!input.value) return
          const socket = getSocket()

          socket.send(JSON.stringify({
            content: input.value,
            type: 'message',
          }))

          input.value = ''
        }
      }
    })
  }

  override render() {
    return `
         <input type="text" placeholder="Напишите сообщение..." id="input_message" name="message">
    `
  }
}
