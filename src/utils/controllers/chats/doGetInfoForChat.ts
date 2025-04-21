import { getInfoForChat } from "../../api/chats"
import { getUser } from "../../api/auth"

export async function doGetInfoForChat(chatId: number): Promise<boolean | unknown> {
  return getInfoForChat(chatId).then(async (chatInfo) => {
    if (typeof chatInfo === "string") {
      const token = JSON.parse(chatInfo).token

      return getUser().then(userInfo => {
        if (typeof userInfo === "string") {
          const userId = JSON.parse(userInfo).id

          if (token && userId) {
            return { token: token, userId: userId }
          } else {
            alert("Нет токена или айди")
            return false
          }
        }
      }).catch(err => {
        console.error(err)
        return false
      })
    }
  }).catch((err) => {
    console.error(err)
    return false
  })
}
