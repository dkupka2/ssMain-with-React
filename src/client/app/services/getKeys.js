export const getKeys = obj => {
    return typeof obj === "object" ? Object.keys(obj) : []
}