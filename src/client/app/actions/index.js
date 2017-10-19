const SELECT_ACCOUNT = "sA"
const ADD_ACCOUNT ="aA"

const relay = (type, payload) => {
    return { type, payload}
}

const actions = {
    SELECT_ACCOUNT,
    ADD_ACCOUNT,
    relay
}
 
export default actions