import {CHANGE_LOADING_APP} from '../constant/actionType'

export const changeLoadingApp = function(data){
    return{
        type: CHANGE_LOADING_APP,
        payload: data
    }
}