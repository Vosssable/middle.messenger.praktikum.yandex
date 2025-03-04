import { signIn } from "../../api/auth"
import Router from "../../../framework/Router"
import doGetUser from "./doGetUser"

function doSignIn(login: string, password: string) {
  signIn(login, password).then(res => {
    if (res === 'OK') {
      doGetUser()
      Router.go('/chat')
    } else {
      console.log('Непредвиденный ответ с сервера, срочно звони в Яндекс)))')
      alert('Ошибка! Смотри логи!')
    }
  }).catch(err => {
    console.log('Ошибка', err)
    alert('Что-то ввели неправильно')
  })
}

export default doSignIn