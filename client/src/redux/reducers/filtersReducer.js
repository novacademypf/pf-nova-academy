import {
  SAVE_DATA_FILTER,
  SET_MENU_OPTIONS,
} from "../action-type/action-types";

const initialOptions = {
  searchBar: "",
  raiting: [],
  precio: { min:100 , max: 200 },
};
const initialDataFilter = {
  dataFilter: [],
};
export const setMenuOptionsReducer = (state = initialOptions, action) => {
  switch (action.type) {
    case SET_MENU_OPTIONS:
      if (action.name === "raiting") {
        const isValueSelected = state.raiting.includes(action.value);
        if (isValueSelected) {
          return {
            ...state,
            [action.name]: state.raiting.filter(
              (value) => value !== action.value
            ),
          };
        } else {
          return {
            ...state,
            [action.name]: [...state.raiting, action.value],
          };
        }
      }
      if (action.name === "precio") {
        
        return {
          ...state,
          [action.name]: { ...state.precio,...action.value},
        };
      }
      if (action.name === "default") {
        return {
          ...state,
          ["precio"]: { ...action.value },
        };
      }
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};
export const saveDataFilterReducer = (state = initialDataFilter, action) => {
  switch (action.type) {
    case SAVE_DATA_FILTER:
      return {
        ...state,
        dataFilter: action.data,
      };
    default:
      return state;
  }
};
