import {CHANGE_ACCOUNT} from '../constant/actionType'

const initalState = {
    accountInfo: {
        userName: '',
        userAvata: '',
        roleType: ''
    }
}
export default function accountReducer(state = initalState, action ) {
    switch (action.type) {
        case CHANGE_ACCOUNT:
            return{
                ...state,
                accountInfo: action.payload,
            }
    
        default:
            return state
    }
    
}