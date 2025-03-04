import { signUp } from "../../api/auth"
import Router from "../../../framework/Router"
import { SignUpBodyInterface } from "../../interfaces/apiInterfaces"
import doGetUser from "./doGetUser"

function doSignUp(body: SignUpBodyInterface) {
  signUp(body).then(res => {
    doGetUser()
    Router.go("/chat")
    console.log(res)
  }).catch(err => {
    if (err.status === 409) {
      alert("Пользователь с таким именем уже существует")
    } else {
      console.log("Ошибка", err)
      alert("Что-то пошло не так")
    }
  })
}

export default doSignUp