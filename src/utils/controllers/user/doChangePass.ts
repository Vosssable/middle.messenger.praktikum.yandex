import { changePassword } from "../../api/user"
import router from "../../../framework/Router"

export function doChangePass(oldPass: string, newPass: string) {
  changePassword(oldPass, newPass)
    .then(() => router.go('/settings'))
    .catch(() => {
      if (!document.getElementById('old_password')?.classList.contains("profile-validation-error")) {
        document.getElementById('old_password')?.classList.add("profile-validation-error")
      }
      alert('Не правильно введен старый пароль')
    })
}
