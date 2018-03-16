export const getLast = arr => {
    if (typeof arr === "object" && arr.length != undefined ) return arr[arr.length - 1]
    return []
}