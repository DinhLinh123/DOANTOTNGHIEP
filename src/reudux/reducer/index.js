import {combineReducers} from 'redux'
import accountTypeReducer from './accountTypeReducer'
import menuReducer from './menuReducer'

const rootReducer = combineReducers({
    menu: menuReducer,
    account: accountTypeReducer,
})

export default rootReducer