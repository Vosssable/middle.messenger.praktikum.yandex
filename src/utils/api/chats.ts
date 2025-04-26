import { HTTPTransport } from "../helpers/fetchRequest"
import { AddOrDeleteUsersInterface, GetChatsInterface } from "../interfaces/apiInterfaces"

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
  return fetch.get("/chats", {
    data: JSON.stringify({
      ...query
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function addUsersToChat(query: AddOrDeleteUsersInterface) {
  return fetch.put("/chats/users", {
    data: JSON.stringify({
      ...query
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function deleteUsersFromChat(query: AddOrDeleteUsersInterface) {
  return fetch.delete("/chats/users", {
    data: JSON.stringify({
      ...query
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export function getInfoForChat(chatId: number) {
  return fetch.post(`/chats/token/${chatId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
