import Block from "../../framework/Block"
import { PropertyButton } from "../../components/buttons/propertyButton/propertyButton"

export default class EmptyChat extends Block {
  constructor() {
    super({
      newChat: new PropertyButton({
        src: '/addChat.svg',
        text: 'Создать новый чат',
        id: 'add_chat',
        alt: 'Создать новый чат'
      })
    })
  }
  override render() {
    return `
      <div class="empty-chat">
      <img src="https://media.tenor.com/kA-_vlCS6dEAAAAi/byebye.gif" width="128" height="128" alt="Загадочная уточка" fetchpriority="high" style="max-width: 280px; background-color: unset;">
      <h3>Выберите чат, куда хотели бы написать
      <br>
          или создайте новый
      </h3>
      {{{ newChat }}}
      </div>
    `
  }
}