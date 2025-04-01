import { logOut } from "../../api/auth"
import router from "../../../framework/Router"

export default function doLogOut() {
  logOut().then((res) => {
    if (res) {
      router.go('/')
    }
  }).catch((err) => {
    alert('Что-то пошло не так, попробуй снова')
    console.log(err)
  })
}