import * as types from "../constant/kitchensType"

const initalState = {
    dataChickens: [],
    loading: false,
}
export default function chickensReducer(state = initalState, action) {
    switch (action.type) {

        case types.POST_CHICKEN:
            return {
                ...state,
            }
        case types.POST_CHICKEN_SUCCESS:
            return {
                ...state,
                dataChickens: [...state.dataChickens, action.payload.data]
            }
        case types.POST_CHICKEN_FAIL:
            return {
                ...state,
                dataChickens: state.dataChickens
            }

        case types.GET_CHICKEN:
            return {
                ...state,
            }
        case types.GET_CHICKEN_SUCCESS:
            return {
                ...state,
                dataChickens: action.payload.data
            }
        case types.GET_CHICKEN_FAIL:
            return {
                ...state,
                dataChickens: state.dataChickens
            }

        case types.DELETE_CHICKEN:
            return {
                ...state,
            }
        case types.DELETE_CHICKEN_SUCCESS:
            return {
                ...state,
                dataChickens: state.dataChickens.filter((item) => item.id !== action.payload)
            }
        case types.DELETE_CHICKEN_FAIL:
            return {
                ...state,
                dataChickens: state.dataChickens
            }

        case types.EDIT_CHICKEN:
            return {
                ...state,
                loading: true
            }
        case types.EDIT_CHICKEN_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case types.EDIT_CHICKEN_FAIL:
            return {
                ...state,
                dataChickens: state.dataChickens
            }
        default:
            return state
    }

}