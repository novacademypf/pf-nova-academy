import { combineReducers } from "redux";
import shoppingCartReducer from "./shoppingCartReducer.js";
import coursesReducer from "./coursesReducer.js";
import userReducer from "./userReducer.js";
import filterByCategoryRed from "./filterByCategoryReducer.js";
import getAllCategories from "./allCategoriesReducer.js"

const reducer = combineReducers({
  shoppingCartReducer: shoppingCartReducer,
  coursesReducer: coursesReducer,
  userReducer: userReducer,
  getAllCategories: getAllCategories,
  filterByCategoryRed:filterByCategoryRed,
});

export default reducer;
