import { signUp } from "../../api/auth"
import Router from "../../../framework/Router"
import { SignUpBodyInterface } from "../../interfaces/apiInterfaces"
import doGetUser from "./doGetUser"

export function doSignUp(body: SignUpBodyInterface) {
  signUp(body).then(() => {
    doGetUser()
    Router.go("/messenger")
  }).catch(err => {
    if (err.status === 409) {
      alert("Пользователь с таким именем уже существует")
    } else {
      console.error("Ошибка", err)
      alert("Что-то пошло не так")
    }
  })
}

