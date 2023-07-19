import { combineReducers } from "redux";
import shoppingCartReducer from "./shoppingCartReducer.js";
import coursesReducer from "./coursesReducer.js";
import userReducer from "./userReducer.js";
import filterByCategoryRed from "./filterByCategoryReducer.js";
import getAllCategories from "./allCategoriesReducer.js"
import categoriesReducer from "./categoryReducer.js"
import {setOptionsFiltersReducer}from "./filtersReducer.js"
import sortByNameReducer from "./sortByNameReducer.js";
import filterByPriceRed from "./filterByPrice.js";
import { filterReducer } from "./filtersReducer.js";
import profileReducer from "./profileReducer.js";
import orderReducer from "./orderReducer.js";

const reducer = combineReducers({
  categoriesReducer: categoriesReducer,
  shoppingCartReducer: shoppingCartReducer,
  coursesReducer: coursesReducer,
  userReducer: userReducer,
  getAllCategories: getAllCategories,
  filterByCategoryRed:filterByCategoryRed,
  setOptionsFiltersReducer ,
  sortByNameReducer: sortByNameReducer,
  filterReducer,
  profileReducer,
  orderReducer,
});

export default reducer;
