import { createChat } from "../../api/chats"
import Store from "../../../framework/Store/Store"
import { doGetChats } from "./doGetChats"

export function doCreateChat(chat: string) {
  createChat(chat)
    .then(res => {
      if (res && typeof res === "string") {
        doGetChats({})
        const store = Store.getInstance(),
          newCurrentId = JSON.parse(res)["id"]
        store.reset("form")
        store.set("currentChat", newCurrentId)
      }
    })
    .catch(err => {
      console.error("Ошибка", err)
      alert("Что-то пошло не так")
    })
}
