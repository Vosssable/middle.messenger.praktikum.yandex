import { ProfileInfoInterface } from "../../interfaces/apiInterfaces"
import { changeProfile } from "../../api/user"
import { ProfileFormDataInterface } from "../../../pages/profilePage/profilePage"
import router from "../../../framework/Router"

export function doChangeProfile(newValues: ProfileFormDataInterface) {
  changeProfile(newValues as unknown as ProfileInfoInterface)
    .then(_ => router.go("/settings"))
    .catch(err => {
      alert("Непредвиденная ошибка, звони в Яндекс))")
      console.error(err)
    })
}