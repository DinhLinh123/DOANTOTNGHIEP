import {CHANGE_TYPE_MENU, CHANGE_TYPE_MENU_SUB_KITCHEN} from '../constant/actionType'


export const changeMenuType = function(data){
    return {
        type:  CHANGE_TYPE_MENU,
        payload: data
    };
};


export const changeMenuTypeSubKitchen = function(data){
    return {
        type:  CHANGE_TYPE_MENU_SUB_KITCHEN,
        payload: data
    };
};