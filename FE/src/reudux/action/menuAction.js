import {CHANGE_TYPE_MENU} from '../constant/actionType'


export const changeMenuType = function(data){
    return {
        type:  CHANGE_TYPE_MENU,
        payload: data
    };
};