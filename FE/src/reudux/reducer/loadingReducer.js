import {CHANGE_LOADING_APP} from '../constant/actionType'

const initalState = {
    loadingMainApp: false
}
export default function accountReducer(state = initalState, action ) {
    switch (action.type) {
        case CHANGE_LOADING_APP:
            return{
                ...state,
                loadingMainApp: action.payload,
            }
    
        default:
            return state
    }
    
}