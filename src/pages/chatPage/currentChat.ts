import Block from "../../framework/Block"
import { getSocket } from "../../utils/helpers/webSocket"
import { compareDate, formatDateToLocal } from "../../utils/helpers/formatDateToLocal"

interface ChatListInterface {
  user_id: number
  content: string
  time: string
  messageId: number
}

export default class CurrentChat extends Block {
  constructor(props: { ownUserId: number }) {
    const socket = getSocket()

    const now = new Date()
    const isoString = now.toISOString()

    super({
      dateToCompare: isoString,
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
        this.setProps({ chatList: newData })
      } else if (newData.type === "message") {
        this.lists.chatList = [newData, ...this.lists.chatList]
        this.setProps({ chatList: this.lists.chatList })
      }
    })

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({
        content: "0",
        type: "get old"
      }))
    })
  }

  componentWillBeUnMounted() {
    getSocket().close(1000, "Закрыли чат")
  }

  override render() {
    let dateToCompare = this.props.dateToCompare as string
    function renderChatMessages(chatList: ChatListInterface[], ownUserId: number): string {
      return chatList
        .map((message, index) => {
          const isOwnMessage = message.user_id === ownUserId
          let messageContent: string = ""
          if (isOwnMessage) {
            messageContent += `<div class="{{ attrs.messageClass }} {{ attrs.sentClass }}">${message.content}
              <span class="{{ attrs.messageTimeClass }} {{ attrs.sentClass }}">
              <img src="/received.svg" alt="Сообщение доставлено"> ${formatDateToLocal(message.time, true)}</span>
              </div>`
          } else {
            messageContent += `<div class="{{ attrs.messageClass }} {{ attrs.receivedClass }}">${message.content}
              <span class="{{ attrs.messageTimeClass }} {{ attrs.receivedClass }}">${formatDateToLocal(message.time, true)}</span>
              </div>`
          }
          if (compareDate(dateToCompare, message.time)) {
            messageContent += `<div class="{{ attrs.messagesDateClass }}">${formatDateToLocal(dateToCompare, false)}</div>`
          } else if (index === chatList.length - 1) {
            messageContent += `<div class="{{ attrs.messagesDateClass }}">${formatDateToLocal(dateToCompare, false)}</div>`
          }
          dateToCompare = message.time
          return messageContent
        })
        .join("")
    }


    const chatList = this.lists.chatList as ChatListInterface[],
      ownUserId = this.props.ownUserId as number
    let htmlOutput = ''
    if (chatList) {
      htmlOutput = renderChatMessages(chatList, ownUserId)
    }

    return `
     <div class="{{ attrs.messagesClass }}">
         ${htmlOutput}
     </div>
    `
  }
}
