import { loadFileForm } from "../FormsAttrs"

export default function changeClassList(newClass: string, target?: HTMLElement, avatar?: boolean) {
  if (avatar && target) {
    const title = document.getElementsByClassName('title__form')[0]
    if (newClass === 'add') {
      target.children[0].classList.remove('display-none')
      target.children[1].classList.add('overlay')
      target.children[1].classList.add('no-cursor')
    } else if (newClass === 'remove') {
      if (title.classList.contains('danger')) {
        title.classList.remove("danger")
        title.innerHTML = loadFileForm.title
        const label = title.parentElement?.getElementsByTagName('label')[0] as HTMLElement,
          span = label.getElementsByTagName('span')[0] as HTMLElement
        span.innerText = 'Выбрать файл на компьютере'
        label.classList.remove("gray")
        label.classList.add("upload_file")
      }

      target.children[0].classList.add('display-none')
      target.children[1].classList.remove('overlay')
      target.children[1].classList.remove('no-cursor')
    } else if (newClass === 'error') {
      if (!title.classList.contains('danger')) {
        title.classList.add("danger")
        title.innerHTML = "Ошибка, попробуйте еще раз"
        const label = title.parentElement?.getElementsByTagName('label')[0] as HTMLElement,
          span = label.getElementsByTagName('span')[0] as HTMLElement
        span.innerText = 'Выбрать файл на компьютере'
        label.classList.remove("gray")
        label.classList.add("upload_file")
      }
    }
    return
  }

  const oldTargets = document.getElementsByClassName(newClass)
  if (oldTargets.length > 0) {
    const oldTarget = oldTargets[0] as HTMLElement
    oldTarget.classList.remove(newClass)
  }

  if (target) target.classList.add(newClass)
}
