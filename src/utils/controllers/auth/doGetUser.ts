import { getUser } from "../../api/auth"
import Store from "../../../framework/Store/Store"

function doGetUser() {
  getUser().then(res => {
    const store = new Store()
    store.set('user', res)
    console.log('doGetUser', store.getState())
  })
}

export function checkUserAuth() {
  return getUser()
}

export default doGetUser