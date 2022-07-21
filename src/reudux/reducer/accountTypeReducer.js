import ACCOUNT_TYPE from '../constant/actionType'

const initialState = {
    accountType: {
        userName: '',
        userAvatar: '',
        roleType: ''
    }
}

export default function accountTypeReducer(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_TYPE:
            return {
                ...state,
                accountType: {
                    ...state.accountType,
                    userName: action.payload.userName,
                    userAvatar: action.payload.userAvatar,
                    roleType: action.payload.roleType
                }
            }

        default:
            return state
    }
}  