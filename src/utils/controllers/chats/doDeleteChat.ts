import { deleteChat } from "../../api/chats"
import Store from "../../../framework/Store/Store"
import changeClassList from "../../helpers/changeClassList"
import { doGetChats } from "./doGetChats"

export function doDeleteChat(chatId: number) {
  deleteChat(chatId).then((res) => {
    if (res) {
      doGetChats({})
      const store = Store.getInstance()
      store.set("currentChat", undefined)
      changeClassList('current-select')
    }
  })
    .catch(err => {
      console.error("Ошибка", err)
      alert("Что-то пошло не так")
    })
}