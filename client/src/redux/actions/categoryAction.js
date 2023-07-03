import axios from "axios";
import { GET_ALL_CATEGORIES } from "../action-type/action-types.js";
const endpoint = "http://localhost:3001/category/"

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            let getCategories = await axios.get(endpoint);
            let categoryList = getCategories.data;
            return dispatch({ type:GET_ALL_CATEGORIES, payload: categoryList});
        } catch (err) {
            console.log({errorGetAllCategories: err, message: err.message});
        }
    };
};