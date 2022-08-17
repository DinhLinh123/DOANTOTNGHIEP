import * as types from "../constant/staff"

const initalState = {
    dataStaff: [],
    loading: false
}
export default function staffReducer(state = initalState, action ) {
    switch (action.type) {

        case types.POST_STAFF:
            return{
                ...state,
            }
        case types.POST_STAFF_SUCCESS:
            return{
                ...state,
                dataStaff: [...state.dataStaff, action.payload.data]
            }
        case types.POST_STAFF_FAIL:
            return{
                ...state,
                dataStaff: [...state.dataStaff]
            }

            case types.GET_STAFF:
                return{
                    ...state,
                }
            case types.GET_STAFF_SUCCESS:
                return{
                    ...state,
                    dataStaff: action.payload.data,
                }
            case types.GET_STAFF_FAIL:
                return{
                    ...state,
                    dataStaff: [...state.dataStaff]
                }

            case types.DELETE_STAFF:
                return{
                    ...state,
                }
            case types.DELETE_STAFF_SUCCESS:
                return{
                    ...state,
                dataStaff: state.dataStaff.filter((item) => item.id !== action.payload)
                }
         case types.DELETE_STAFF_FAIL:
                return{
                    ...state,
                dataStaff: {...state.dataStaff}
                }

                case types.UPDATE_STAFF:
                    return{
                        ...state,
                        loading: false
                    }
                case types.UPDATE_STAFF_SUCCESS:
                    return{
                        ...state,
                    loading: true
                    }
             case types.UPDATE_STAFF_FAIL:
                    return{
                        ...state,
                    }

            case types.SEARCH_STAFF:
                return{
                    ...state,
                }
            case types.SEARCH_STAFF_SUCCESS:
                return{
                    ...state,
                    dataStaff: action.payload.data,
                }
            case types.SEARCH_STAFF_FAIL:
                return{
                    ...state,
                    dataStaff: state.dataStaff
                }
        default:
            return state
    }
    
}