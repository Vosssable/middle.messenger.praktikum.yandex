import { GetChatsInterface } from "../../interfaces/apiInterfaces"
import { getChats } from "../../api/chats"
import { ChatListResponseInterface } from "../../interfaces/responseInterfaces"
import Store from "../../../framework/Store/Store"
import isEqual from "../../mydash/isEqual"
import { Indexed } from "../../interfaces/frameworkInterfaces"

const store = Store.getInstance()

export function doGetChats(query: GetChatsInterface) {
  getChats(query).then(res => {
    if (typeof res === "string") {
      if (!isEqual(store.getState().chats as Indexed, JSON.parse(res))) {
        store.set("chats", JSON.parse(res) as ChatListResponseInterface[])
      }
    }
  }).catch(err => {
    if (err === 'Timeout'){
      return
    }
    console.error("Ошибка", err)
    alert("Что-то пошло не так")
  })
}
