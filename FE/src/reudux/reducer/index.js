import {combineReducers} from 'redux'
import accountReducer from './accoutReducer'
import menuReducer from './menuReducer'
import loadingReducer from './loadingReducer'
import bookingReducer from './bookingReducer'
import feedbackReducer from './feedbackReducer'

const rootReducer = combineReducers({
    menu: menuReducer,
    account: accountReducer,
    loading: loadingReducer,
    bookingReducer,
    feedbackReducer
})

export default rootReducer