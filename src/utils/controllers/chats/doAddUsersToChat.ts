import { addUsersToChat } from "../../api/chats"
import Store from "../../../framework/Store/Store"

export function doAddUsersToChat(users: [], chatId: number) {
  addUsersToChat({ users: users, chatId: chatId })
    .then(() => {
      const store = Store.getInstance()
      store.reset("form")
    })
    .catch(err => {
      console.error("Ошибка", err)
      alert("Что-то пошло не так")
    })
}
