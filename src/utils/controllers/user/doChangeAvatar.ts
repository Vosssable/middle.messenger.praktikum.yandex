import { changeAvatar } from "../../api/user"
import router from "../../../framework/Router"
import changeClassList from "../../helpers/changeClassList"

export function doChangeAvatar(file: FormData) {
  changeAvatar(file)
    .then(() => {
      changeClassList('remove', document.getElementsByClassName('change-avatar')[0].parentElement as HTMLElement, true)
      router.go('/settings')
    })
    .catch(err => {
      console.error(err)
      changeClassList('error', document.getElementsByClassName('change-avatar')[0].parentElement as HTMLElement, true)
    })
}
