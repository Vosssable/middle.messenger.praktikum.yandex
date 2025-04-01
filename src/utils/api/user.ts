import { ProfileInfoInterface } from "../interfaces/apiInterfaces"
import { HTTPTransport } from "../helpers/fetchRequest"

const fetch = new HTTPTransport()

export function changeProfile(newValues: ProfileInfoInterface) {
  return fetch.put("/user/profile", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "first_name": "Asdasdafg",
      "second_name": "Ananas",
      "display_name": 'asdasdasdasd',
      "login": "RamblerTest",
      "avatar": "asdasdasdasd.png",
      "email": "sdfsadgh@fasg.ru",
      "phone": "8912354323"
    })
  })
}

export function changePassword(oldPassword: string, newPassword: string) {
  fetch.put("/user/password", {
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword
    })
  }).then(res => console.log(res)).catch(err => console.log(err))
}

export function changeAvatar(file: FormData) {
  fetch.put("/user/profile/avatar", {
    body: file
  }).then(res => console.log(res)).catch(err => console.log(err))
}

