export const last = (list) => {
    if (!Array.isArray(list)) return undefined
    if (list.length > 0) {return list[list.length-1]} else return undefined
}