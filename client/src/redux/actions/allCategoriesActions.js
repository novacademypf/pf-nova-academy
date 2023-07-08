import axios from "axios";
import { GET_ALL_CATEGORIES } from "../action-type/action-types";
import { getCategories } from "../../services/categoryRequest";

export function getAllCategories() {
  return async function (dispatch) {
    let json = await getCategories();
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: json.data,
    });
  };
}
