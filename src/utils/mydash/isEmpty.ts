export const isEmpty = (value: unknown): boolean => {
  return (typeof value === "number" ||
    value === undefined ||
    value === null ||
    typeof value === "boolean" ||
    (typeof value === "string" && value.length === 0) ||
    (Array.isArray(value) && value.length === 0) || (typeof value === "object" && true && Object.keys(value).length === 0))
}