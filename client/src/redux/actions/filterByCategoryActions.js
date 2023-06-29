//import  category  from "../../../../api/src/constants/data"
import { FILTER_BY_CATEGORY } from "../action-type/action-types"


export function filterByCategory(category) {
    return {
        type: FILTER_BY_CATEGORY,
        payload: category
    }
};