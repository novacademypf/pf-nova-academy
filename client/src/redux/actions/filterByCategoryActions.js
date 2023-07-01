//import  category  from "../../../../api/src/constants/data"
import { FILTER_BY_CATEGORY } from "../action-type/action-types"




export function filterByCategory(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/courseForSale/?category=${payload}`);
            return dispatch({
                type: FILTER_BY_CATEGORY ,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error")
        }
    }
}
