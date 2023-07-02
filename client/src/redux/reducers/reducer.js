import { combineReducers } from "redux";
import shoppingCartReducer from "./shoppingCartReducer.js";
import coursesReducer from "./coursesReducer.js";
import userReducer from "./userReducer.js";
import categoriesReducer from "./categoryReducer.js"
const reducer = combineReducers({
  categoriesReducer: categoriesReducer,
  shoppingCartReducer: shoppingCartReducer,
  coursesReducer: coursesReducer,
  userReducer: userReducer
});

export default reducer;
