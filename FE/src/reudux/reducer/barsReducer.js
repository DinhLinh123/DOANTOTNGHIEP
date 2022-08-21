import * as types from "../constant/barsType"

const initalState = {
    dataBars: [],
    loading: false,
}
export default function barsReducer(state = initalState, action) {
    switch (action.type) {
        case types.GET_BARS:
            return {
                ...state,
            }
        case types.GET_BARS_SUCCESS:
            return {
                ...state,
                dataBars: action.payload.data.data,
                loading: false
            }
        case types.GET_BARS_FAIL:
            return {
                ...state,
                dataBars: state.dataBars
            }

        case types.POST_BARS:
            return {
                ...state,
            }
        case types.POST_BARS_SUCCESS:
            return {
                ...state,
                dataBars: [...state.dataBars, action.payload.data]
            }
        case types.POST_BARS_FAIL:
            return {
                ...state,
                dataBars: state.dataBars
            }

        case types.DELETE_BARS:
            return {
                ...state,
            }
        case types.DELETE_BARS_SUCCESS:
            return {
                ...state,
                dataBars: state.dataBars.filter(item => item.id !== action.payload),
            }
        case types.DELETE_BARS_FAIL:
            return {
                ...state,
                dataBars: state.dataBars
            }

        case types.UPDATE_BARS:
            return {
                ...state,
            }
        case types.UPDATE_BARS_SUCCESS:
            return {
                ...state,
                loading: true
            }
        case types.DELETE_BARS_FAIL:
            return {
                ...state,
                dataBars: state.dataBars
            }
        default:
            return state
    }

}