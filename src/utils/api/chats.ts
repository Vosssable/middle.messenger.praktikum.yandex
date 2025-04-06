import { HTTPTransport } from "../helpers/fetchRequest"
import { GetChatsInterface } from "../interfaces/apiInterfaces"

const fetch = new HTTPTransport()

export function createChat(chatName: string) {
  return fetch.post("/chats", {
    data: JSON.stringify({
      "title": chatName
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function deleteChat(chatId: number) {
  return fetch.delete("/chats", {
    data: JSON.stringify({
      "chatId": chatId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function getChats(query: GetChatsInterface) {
  return fetch.delete("/chats", {
    data: JSON.stringify({
      ...query
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}