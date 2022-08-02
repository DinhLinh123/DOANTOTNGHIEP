import { TYPE_MENU } from '../../component/base/common/commonConstant'
import { CHANGE_TYPE_MENU, CHANGE_TYPE_MENU_SUB_KITCHEN } from '../constant/actionType'

const initialState = {
    menuType: TYPE_MENU.BIG,
    menuTypeSubKitchen: false
}

export default function menuReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TYPE_MENU:
            return {
                ...state,
                menuType: action.payload
            }

        case CHANGE_TYPE_MENU_SUB_KITCHEN:
            return {
                ...state,
                menuTypeSubKitchen: action.payload
            }

        default:
            return state
    }
}  