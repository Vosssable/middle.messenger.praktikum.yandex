import { ProfileInfoInterface } from "../interfaces/apiInterfaces"
import { HTTPTransport } from "../helpers/fetchRequest"

const fetch = new HTTPTransport()

export function changeProfile(newValues: ProfileInfoInterface) {
  return fetch.put("/user/profile", {
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify({...newValues})
  })
}

export function changePassword(oldPassword: string, newPassword: string) {
  return fetch.put("/user/password", {
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  })
}

export function changeAvatar(file: FormData) {
  return fetch.put("/user/profile/avatar", {
    data: file
  })
}
