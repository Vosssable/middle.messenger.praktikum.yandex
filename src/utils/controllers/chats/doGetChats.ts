import { GetChatsInterface } from "../../interfaces/apiInterfaces"
import { getChats } from "../../api/chats"

export function doGetChats(query: GetChatsInterface) {
  getChats(query).then(res => {

    console.log(res)
  }).catch(err => {
      console.error("Ошибка", err)
      alert("Что-то пошло не так")
  })
}
