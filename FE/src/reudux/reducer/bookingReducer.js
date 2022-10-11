import * as types from "../constant/bookingType"

const initalState = {
    dataBooking: []
}
export default function bookingReducer(state = initalState, action ) {
    switch (action.type) {

        case types.GET_BOOKING:
            return{
                ...state,
            }
        case types.GET_BOOKING_SUCCESS:
            return{
                ...state,
            dataBooking: action.payload.data.data
            }

        case types.GET_BOOKING_FAIL:
            return{
                ...state,
            dataBooking: [...state.dataBooking]
            }

        case types.POST_BOOKING:
            return{
                ...state,
            }
        case types.POST_BOOKING_SUCCESS:
            console.log("action.payloadaction.payload", action.payload);
            return{
                ...state,
            dataBooking: [...state.dataBooking, action.payload.data]
            }
        case types.POST_BOOKING_FAIL:
            return{
                ...state,
            dataBooking: [...state.dataBooking]
            }
        case types.DELETE_BOOKING:
                return{
                    ...state,
                }
        case types.DELETE_BOOKING_SUCCESS:
                return{
                    ...state,
                dataBooking: state.dataBooking.filter((item) => item.id !== action.payload)
                }
        case types.DELETE_BOOKING_FAIL:
                return{
                    ...state,
                dataBooking: {...state.dataBooking}
                }
        case types.SEARCH_BOOKING:
            return{
                ...state,
            }
        case types.SEARCH_BOOKING_SUCCESS:
            return{
                ...state,
            dataBooking: action.payload.data
            }
    
        case types.SEARCH_BOOKING_FAIL:
            return{
                ...state,
            dataBooking: state.dataBooking
            }

        default:
            return state
    }
    
}