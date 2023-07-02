//import  category  from "../../../../api/src/constants/data"
import { getCategoryFilters } from "../../services/courseForSaleRequest"
import { FILTER_BY_CATEGORY } from "../action-type/action-types"




export function filterByCategory(categories) {
    return async function (dispatch) {
        try {
            var json = await getCategoryFilters(categories)
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
