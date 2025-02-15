export const isEmpty = (value) => {
    return (typeof value) === 'number' ||
        value === undefined ||
        value === null ||
        (typeof value) === 'boolean' ||
        (typeof value) === 'string' && value.length === 0 ||
        Array.isArray(value) && value.length === 0;
}
