 //import  category  from "../../../../api/src/constants/data"
import { getCategoryFilters } from "../../services/courseForSaleRequest"
import { FILTER_BY_CATEGORY, GET_ALL_COURSES } from "../action-type/action-types"




export function filterByCategory(categories) {
    return async function (dispatch) {
        try {
            const courseList = await getCategoryFilters(categories)
           
            return dispatch({
                
                    type: GET_ALL_COURSES,
                    payload: {
                      courseAll: courseList.courseAll,
                      courseCount: courseList.courseCount,
                    },
                  
            })
        } catch (error) {
            console.log(error, "Error")
        }
    }
}
 