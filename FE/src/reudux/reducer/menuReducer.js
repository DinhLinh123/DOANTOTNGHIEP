import { TYPE_MENU } from "../../component/base/common/commonConstant";
import {
  CHANGE_TYPE_MENU,
  CHANGE_TYPE_MENU_SUB_KITCHEN,
  CHANGE_TYPE_MENU_SUB_BAR,
  CHANGE_TYPE_MENU_SUB_CATEGOTY,
} from "../constant/actionType";

const initialState = {
  menuType: TYPE_MENU.BIG,
  menuTypeSubKitchen: false,
  menuTypeSubBar: false,
  menuTypeSubCategory: false,
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TYPE_MENU:
      return {
        ...state,
        menuType: action.payload,
      };

    case CHANGE_TYPE_MENU_SUB_KITCHEN:
      return {
        ...state,
        menuTypeSubKitchen: action.payload,
      };

    case CHANGE_TYPE_MENU_SUB_BAR:
      return {
        ...state,
        menuTypeSubBar: action.payload,
      };
      case CHANGE_TYPE_MENU_SUB_CATEGOTY:
      return {
        ...state,
        menuTypeSubCategory: action.payload,
      };

    default:
      return state;
  }
}
