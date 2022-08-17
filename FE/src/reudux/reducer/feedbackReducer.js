import * as types from "../constant/feedbackType"

const initalState = {
    dataFeedback: []
}
export default function feedbackReducer(state = initalState, action ) {
    switch (action.type) {

        case types.POST_FEEDBACK:
            return{
                ...state,
            }
        case types.POST_FEEDBACK_SUCCESS:
            return{
                ...state,
            dataFeedback: [...state.dataFeedback, action.payload.data]
            }
        case types.POST_FEEDBACK_FAIL:
            return{
                ...state,
                dataFeedback: [...state.dataFeedback]
            }

        case types.GET_FEEDBACK:
            return{
                ...state,
            }
        case types.GET_FEEDBACK_SUCCESS:
            return{
                ...state,
            dataFeedback: action.payload.data
            }
        case types.GET_FEEDBACK_FAIL:
            return{
                ...state,
                dataFeedback: state.dataFeedback
            }

            case types.SEARCH_FEEDBACK:
                return{
                    ...state,
                }
            case types.SEARCH_FEEDBACK_SUCCESS:
                console.log("action", action.payload.data);
                return{
                    ...state,
                dataFeedback: action.payload.data.data
                }
            case types.SEARCH_FEEDBACK_FAIL:
                return{
                    ...state,
                    dataFeedback: state.dataFeedback
                }

        default:
            return state
    }
    
}