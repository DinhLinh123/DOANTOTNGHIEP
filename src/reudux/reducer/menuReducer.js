import { TYPE_MENU } from '../../component/base/common/commonConstant'
import {CHANGE_TYPE_MENU} from '../constant/actionType'

const initialState = {
    menuType: TYPE_MENU.BIG
}

export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TYPE_MENU:
            return {
                ...state,
                menuType: action.payload
            }

        default:
            return state
    }
}  