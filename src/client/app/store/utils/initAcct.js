const initAcct = list => {
    let obj = {}
    list.map( (table) => obj[table] = [] )
    return obj
}
