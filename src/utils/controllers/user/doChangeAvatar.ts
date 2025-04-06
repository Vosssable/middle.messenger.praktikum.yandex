import { changeAvatar } from "../../api/user"
import router from "../../../framework/Router"

export function doChangeAvatar(file: FormData) {
  changeAvatar(file)
    .then(_ => {
      router.go('/settings')
    })
    .catch(err => {
      console.error(err)
      const title = document.getElementsByClassName('title__form')[0]
      if (!title.classList.contains('danger')) {
        title.classList.add("danger")
        title.innerHTML = "Ошибка, попробуйте еще раз"
        const label = title.parentElement?.getElementsByTagName('label')[0] as HTMLElement,
          span = label.getElementsByTagName('span')[0] as HTMLElement
        span.innerText = 'Выбрать файл на компьютере'
        label.classList.remove("gray")
        label.classList.add("upload_file")
      }
    })
}