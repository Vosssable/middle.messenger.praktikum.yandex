import { changeChatAvatar } from "../../api/chats"
import Store from "../../../framework/Store/Store"
import { doGetChats } from "./doGetChats"

export function doChangeChatAvatar(chatId: number, file: FormData) {
  changeChatAvatar(chatId, file)
    .then(res => {
      if (res && typeof res === "string") {
        doGetChats({})
        const store = Store.getInstance()
        store.reset("form")
      }
    })
    .catch(err => {
      console.error("Ошибка", err)
      alert("Что-то пошло не так")
    })
}
