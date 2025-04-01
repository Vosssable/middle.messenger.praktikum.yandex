import { ProfileInfoInterface } from "../../interfaces/apiInterfaces"
import { changeProfile } from "../../api/user"

export function doChangeProfile(newValues: ProfileInfoInterface) {
  changeProfile(newValues).then(res => console.log(res)).catch(err => console.log(err))
}