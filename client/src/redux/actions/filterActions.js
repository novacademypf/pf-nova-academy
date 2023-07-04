import { getCategoryFilters } from "../../services/courseForSaleRequest";
import {
  SET_DEFAULT_FILTERS,
  UPDATE_OPTION_FILTERS,
} from "../action-type/action-types";
import { saveCourse } from "./coursesActions";

export function filterByCategoryCourse(categories,isFilter,page) {
    return async function (dispatch) {
        try {
            const courseList = await getCategoryFilters(categories,page);
           
            return dispatch(saveCourse(courseList.data, isFilter)); 
            
        } catch (error) {
            console.log(error, "Error")
        }
    }
}


export const setDefaultFilters = () => {
  return {
    type: SET_DEFAULT_FILTERS,
  };
};
export const updateOptionFilters = (option) => {
  return { type: UPDATE_OPTION_FILTERS, payload: option };
};


