import { createChat } from "../../api/chats"
import Store from "../../../framework/Store/Store"

export function doCreateChat(chat: string) {
  createChat(chat)
    .then(res => {
      if (res && typeof res === 'string') {
        const store = Store.getInstance()
        store.reset("form")
        store.set("currentChat", JSON.parse(res)['id'])
        console.log('doCreateChat', res, store.getState())
      }
    })
    .catch(err => console.log(err))
}