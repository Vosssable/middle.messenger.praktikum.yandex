import { getUser } from "../../api/auth"
import Store from "../../../framework/Store/Store"

function doGetUser() {
  getUser().then(res => {
      console.log('RES', res)
    const store = new Store()
    console.log(store)
    store.set('user', res)
  }).catch(err => {
    console.log('Ошибка', err)
    alert('Не удалось получить данные с сервера')
  })
}

export default doGetUser