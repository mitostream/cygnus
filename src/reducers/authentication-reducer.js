const initState = {
    isAuthenticated: false,
    isReadOnly: true,
    isHorizonLoggedIn: false,
}

export default function (state = initState, action) {
    switch (action.type) {
        case "LOG_IN":
            state = {
                ...state,
                isAuthenticated: true,
                userId: action.payload.userId,
                token: action.payload.token,
                pubkey: action.payload.pubkey,
            }
            break

        case "LOG_OUT":
            state = initState
            break

        case "LOG_IN_TO_HORIZON":
            state = {
                ...state,
                isHorizonLoggedIn: true,
            }
            break

        case "LOG_OUT_OF_HORIZON":
            state = {
                ...state,
                isHorizonLoggedIn: false,
                isReadOnly: true,
            }
            break

        case "SET_LEDGER_SOFTWARE_VERSION":
            state = {
                ...state,
                ledgerSoftwareVersion: action.payload,
            }
            break

        default:
            break
    }
    return state
}
