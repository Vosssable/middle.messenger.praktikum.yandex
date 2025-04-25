import Block from "../../framework/Block"
import { getSocket } from "../../utils/helpers/webSocket"

interface ChatListInterface {
  user_id: number
  content: string
  time: string
  messageId: number
}

export default class CurrentChat extends Block {
  constructor(props: {ownUserId: number}) {
    const socket = getSocket()

    super({
      ownUserId: props.ownUserId,
      attrs: {
        messagesClass: "messages",
        messagesDateClass: "messages_date",
        messageTimeClass: "message_time",
        messageClass: "message",
        receivedClass: "received",
        sentClass: "sent"
      }
    })

    socket.addEventListener("message", event => {
      const newData = JSON.parse(event.data)
      if (Array.isArray(newData)) {
        this.setProps({chatList: newData})
      } else if (newData.type === 'message') {
        this.lists.chatList = [newData, ...this.lists.chatList.reverse()]
        this.setProps({chatList: this.lists.chatList})
      }
    })

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }))
    })
  }

  componentWillBeUnMounted() {
    getSocket().close(1000, 'Закрыли чат')
  }

  override render() {
    function renderChatMessages(chatList: ChatListInterface[], ownUserId: number): string {
      return chatList.reverse()
        .map((message) => {
          const isOwnMessage = message.user_id === ownUserId
          return isOwnMessage ?
            `<div class="{{ attrs.messageClass }} {{ attrs.sentClass }}">${message.content}
              <span class="{{ attrs.messageTimeClass }} {{ attrs.sentClass }}">
              <img src="/received.svg" alt="Сообщение доставлено"> ${message.time}</span>
              </div>` :
            `<div class="{{ attrs.messageClass }} {{ attrs.receivedClass }}">${message.content}
              <span class="{{ attrs.messageTimeClass }} {{ attrs.receivedClass }}">${message.time}</span>
              </div>`
        })
        .join("")
    }

    const chatList = this.lists.chatList as ChatListInterface[],
      ownUserId = this.props.ownUserId as number
    const htmlOutput = chatList ? renderChatMessages(chatList, ownUserId) : ''

    return `
     <div class="{{ attrs.messagesClass }}">
         <div class="{{ attrs.messagesDateClass }}"> 19 июня</div>
         ${htmlOutput}
     </div>
    `
  }
}
