//import  category  from "../../../../api/src/constants/data"
import { FILTER_BY_CATEGORY } from "../action-type/action-types"




export function filterByCategory(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/category`);
            console.log(json)
            return dispatch({
                type: FILTER_BY_CATEGORY ,
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error")
        }
    }
}
