import { combineReducers } from 'redux'
import accountReducer from './accoutReducer'
import menuReducer from './menuReducer'
import loadingReducer from './loadingReducer'
import bookingReducer from './bookingReducer'
import feedbackReducer from './feedbackReducer'
import spendingsReducer from "./spendingsReducer"
import staffReducer from "./staffReducer"
import chickensReducer from "./kitchensReducer"


const rootReducer = combineReducers({
    menu: menuReducer,
    account: accountReducer,
    loading: loadingReducer,
    bookingReducer,
    feedbackReducer,
    spendingsReducer,
    staffReducer,
    chickensReducer
})

export default rootReducer