import { Indexed } from "../interfaces/frameworkInterfaces";

function queryStringify(data: Indexed): string | never {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? "&" : "";

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<Indexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === "object" && value !== null) {
      const objValue = Object.keys(value).reduce<Indexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: (value as Indexed)[objKey]
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, "");
}

export default queryStringify
