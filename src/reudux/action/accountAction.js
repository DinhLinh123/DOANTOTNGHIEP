import {CHANGE_ACCOUNT} from '../constant/actionType'

export const changeAccount = function({
    userName,
    userAvata,
    roleType
}){
    debugger
    return{
        type: CHANGE_ACCOUNT,
        payload: {
            userName: userName,
            userAvata: userAvata,
            roleType: roleType
        }
    }
}