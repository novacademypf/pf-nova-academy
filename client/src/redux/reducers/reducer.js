import { combineReducers } from "redux";
import shoppingCartReducer from "./shoppingCartReducer.js";

import userReducer from "./userReducer.js";
import getAllCategories from "./allCategoriesReducer.js";
import categoriesReducer from "./categoryReducer.js";
import { filterReducer } from "./filtersReducer.js";

const reducer = combineReducers({
  categoriesReducer: categoriesReducer,
  shoppingCartReducer: shoppingCartReducer,

  userReducer: userReducer,
  getAllCategories: getAllCategories,
  filterReducer,
});

export default reducer;
