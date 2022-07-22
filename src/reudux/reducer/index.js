import {combineReducers} from 'redux'
import accountReducer from './accoutReducer'
import menuReducer from './menuReducer'

const rootReducer = combineReducers({
    menu: menuReducer,
    account: accountReducer
})

export default rootReducer