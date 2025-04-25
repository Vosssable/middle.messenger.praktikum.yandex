function trim(value: string, symbols?: string): string {
    if (value && !symbols) {
        return value.trim()
    }

    const symbolReg = new RegExp(`[${symbols}]`, "gi")
    return value.replace(symbolReg, "")
}

export default trim
