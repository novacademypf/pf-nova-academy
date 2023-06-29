import axios from "axios";
import { GET_ALL_CATEGORIES } from "../action-type/action-types";



    export function getAllCategories() {
        return async function (dispatch) {
            let json = await axios.get('http://localhost:3001/category', {})
            return dispatch({
                type: GET_ALL_CATEGORIES,
                payload: json.data
            })
        }
    }