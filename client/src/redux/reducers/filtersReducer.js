import {
  SAVE_DATA_FILTER,
  SET_MENU_OPTIONS,
} from "../action-type/action-types";

const initialOptions = {
  searchBar: "",
  raiting: [],
  categories: [],
  precio: { },
};
const initialDataFilter = {
  dataFilter: [],
};
export const setMenuOptionsReducer = (state = initialOptions, action) => {
  switch (action.type) {
    case SET_MENU_OPTIONS:
      if(action.name == "categories") {
        console.log(action.value,"AQUI1")
        const isValueSelected = state.categories.includes(action.value);
        if (isValueSelected) {
          return {
            ...state,
            [action.name]: state.categories.filter(
              (value) => value !== action.value
            ),
          };
        } else {
          return {
            ...state,
            [action.name]: [...state.categories, action.value],
          };
        }
      }

      
      if (action.name === "raiting") {
        console.log(action.value,"AQUI2")
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
        console.log(action.value,"precio")
        return {
          ...state,
          [action.name]: { ...state.precio, ...action.value },
        };
      }
      if (action.name === "default") {
        console.log(action.value,"default")
        
        return {
          ...state,
          searchBar: "",
          raiting: [],
          categories:[],
          precio: { min: action.value.minPrice, max:action.value.maxPrice },
        };
      }
      console.log(action.name, "ACTION.NOMBRE")
      console.log(action.value,"AQUI4")
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
