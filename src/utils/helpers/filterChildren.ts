import { Indexed } from "../interfaces/frameworkInterfaces"

export function filterChildren(oldChildren: Indexed) {
  if (oldChildren.hasOwnProperty("form")) {
    const children = Object.keys(oldChildren),
      newChildren = {} as Indexed

    for (const child of children.filter(childKey => {
      return childKey !== "form"
    })) {
      newChildren[child] = oldChildren[child]
    }
    return newChildren
  } else return oldChildren

}