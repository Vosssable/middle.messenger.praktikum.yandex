import Block from "../../framework/Block"


export default class CurrentChat extends Block {
  constructor() {
    super({
      attrs: {
        messagesClass: "messages",
        messagesDateClass: "messages_date",
        messageTimeClass: "message_time",
        messageClass: "message",
        receivedClass: "received",
        sentClass: "sent"
      }
    })
  }
  override render() {
    return `
    <div class="{{ attrs.messagesClass }}">
         <div class="{{ attrs.messagesDateClass }}"> 19 июня</div>
         <div class="{{ attrs.messageClass }} {{ attrs.receivedClass }}">Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА
             в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все
             знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще
             находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
            
             Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда
             и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000
             евро.
             <span class="{{ attrs.messageTimeClass }} {{ attrs.receivedClass }}">12:20</span>
         </div>
         <div class="{{ attrs.messageClass }} {{ attrs.sentClass }}">Круто!
             <span class="{{ attrs.messageTimeClass }} {{ attrs.sentClass }}">
             <img src="/received.svg" alt="Сообщение просмотрено"> 12:00</span></div>
     </div>
    `
  }
}