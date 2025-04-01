import { getUser } from "../../api/auth"
import Store from "../../../framework/Store/Store"

function doGetUser() {
  getUser().then(res => {
    const store = Store.getInstance()
    store.set('user', res)
    console.log('doGetUser', store)
  })
}

export function checkUserAuth() {
  return getUser()
}

export default doGetUser