import { Indexed } from "../interfaces/frameworkInterfaces"

export function filterChildren(oldChildren: Indexed, value: 'form' | 'currentChat') {
  if (oldChildren.hasOwnProperty(value)) {
    const children = Object.keys(oldChildren),
      newChildren = {} as Indexed

    for (const child of children.filter(childKey => {
      return childKey !== value
    })) {
      newChildren[child] = oldChildren[child]
    }
    return newChildren
  } else return oldChildren

}