const initialState = {
    prop: "initial value?",
    acctInputValue: ""
}

// const initialState = {
//     acctInput: "",
//     accts: {},
//     acctSelected: "",
//     tableType: "compound",
//     tableSelected: "conflicts",
//     bannerType: "",
//     bannerPrompt: "",
//     fileManagement: { backups: [], showBackups: false },
//     filter: { active: false, value: "" }
// }

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TEST CLICKY":
            return { ...state, prop: "definitely working" }
        case "UPDATE ACCT INPUT":
            return { ...state, acctInputValue: action.value }
        case "SUBMIT ACCT INPUT":
            return { ...state, acctInputValue: "submitted" }
        default:
            return state
    }

    return state
}