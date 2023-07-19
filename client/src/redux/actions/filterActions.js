import { SAVE_DATA_FILTER, SET_MENU_OPTIONS } from "../action-type/action-types";

export const setMenuOptions = (name, value) => {
    return {
        type: SET_MENU_OPTIONS,
        name,
        value,
    };
};
export const saveDataFilter =(data)=>{
  return {
    type:SAVE_DATA_FILTER,
    data
  }
}