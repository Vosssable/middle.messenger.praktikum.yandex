export default function changeClassList(newClass: string, target?: HTMLElement, avatar?: boolean) {
  if (avatar && target) {
    if (newClass === 'add') {
      target.children[0].classList.remove('display-none')
      target.children[1].classList.add('overlay')
      target.children[1].classList.add('no-cursor')
    } else if (newClass === 'remove') {
      target.children[0].classList.add('display-none')
      target.children[1].classList.remove('overlay')
      target.children[1].classList.remove('no-cursor')
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