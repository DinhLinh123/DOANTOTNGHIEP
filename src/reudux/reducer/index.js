import {combineReducers} from 'redux'
import accountReducer from './accoutReducer'
import menuReducer from './menuReducer'
import loadingReducer from './loadingReducer'

const rootReducer = combineReducers({
    menu: menuReducer,
    account: accountReducer,
    loading: loadingReducer
})

export default rootReducer