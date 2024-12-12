export const first = (list) => {
    if (!Array.isArray(list)) return undefined
    if (list.length > 0) {return list[0]} else return undefined
}