import * as types from "../constant/kitchensDayType"

const initalState = {
    dataChickensDay: [],
    loading: false
}
export default function chickensDayReducer(state = initalState, action) {
    switch (action.type) {

        case types.POST_KITCHEN_DAY:
            return {
                ...state,
            }
        case types.POST_KITCHEN_DAY_SUCCESS:
            return {
                ...state,
                dataChickensDay: [...state.dataChickensDay, action.payload.data]
            }
        case types.POST_KITCHEN_DAY_FAIL:
            return {
                ...state,
                dataChickensDay: state.dataChickensDay
            }

        case types.GET_KIETCHEN_DAY:
            return {
                ...state,
            }
        case types.GET_KIETCHEN_DAY_SUCCESS:
            return {
                ...state,
                dataChickensDay: action.payload.data,
                loading: false
            }
        case types.GET_KIETCHEN_DAY_FAIL:
            return {
                ...state,
                dataChickensDay: state.dataChickensDay
            }

        case types.DELETE_KITCHEN_DAY:
            return {
                ...state,
            }
        case types.DELETE_KITCHEN_DAY_SUCCESS:
            return {
                ...state,
                dataChickensDay: state.dataChickensDay.filter((item) => item.id !== action.payload)
            }
        case types.DELETE_KITCHEN_DAY_FAIL:
            return {
                ...state,
                dataChickensDay: state.dataChickensDay
            }

        case types.UPDATE_KITCHEN_DAY:
            return {
                ...state,
            }
        case types.UPDATE_KITCHEN_DAY_SUCCESS:
            return {
                ...state,
                loading: true
            }
        case types.DELETE_KITCHEN_DAY_FAIL:
            return {
                ...state,
                dataChickensDay: state.dataChickensDay
            }
        default:
            return state
    }

}