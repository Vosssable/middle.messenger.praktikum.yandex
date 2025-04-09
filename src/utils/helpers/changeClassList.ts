export default function changeClassList(newClass: string, target?: HTMLElement) {
  const oldTargets = document.getElementsByClassName(newClass)
  if (oldTargets.length > 0) {
    const oldTarget = oldTargets[0] as HTMLElement
    oldTarget.classList.remove(newClass)
  }

  if (target) target.classList.add(newClass)
}