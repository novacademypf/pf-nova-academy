import { combineReducers } from "redux";
import shoppingCartReducer from "./shoppingCartReducer.js";
import coursesReducer from "./coursesReducer.js";
import userReducer from "./userReducer.js";
import filterByCategoryRed from "./filterByCategoryReducer.js";
import getAllCategories from "./allCategoriesReducer.js"
import categoriesReducer from "./categoryReducer.js"
import sortByNameReducer from "./sortByNameReducer.js";
import {setMenuOptionsReducer,saveDataFilterReducer} from './filtersReducer.js'



const reducer = combineReducers({
  categoriesReducer: categoriesReducer,
  shoppingCartReducer: shoppingCartReducer,
  coursesReducer: coursesReducer,
  userReducer: userReducer,
  getAllCategories: getAllCategories,
  filterByCategoryRed:filterByCategoryRed,
  setMenuOptionsReducer,
  saveDataFilterReducer,
  sortByNameReducer: sortByNameReducer,

  
   
});

export default reducer;
