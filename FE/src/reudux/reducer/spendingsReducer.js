import * as types from "../constant/spendingsType"

const initalState = {
    dataSpending: []
}
export default function spendingsReducer(state = initalState, action ) {
    switch (action.type) {

        case types.POST_SPENDING:
            return{
                ...state,
            }
        case types.POST_SPENDING_SUCCESS:
            return{
                ...state,
            dataSpending: [...state.dataSpending, action.payload.data]
            }
        case types.POST_SPENDING_FAIL:
            return{
                ...state,
                dataSpending: [...state.dataSpending]
            }

            case types.GET_SPENDING:
                return{
                    ...state,
                }
            case types.GET_SPENDING_SUCCESS:
                return{
                    ...state,
                dataSpending: action.payload
                }
            case types.GET_SPENDING_FAIL:
                return{
                    ...state,
                    dataSpending: [...state.dataSpending]
                }
    
        default:
            return state
    }
    
}