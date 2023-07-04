import { getCourseForSale} from "../../services/courseForSaleRequest";
import {
  FILTER_COURSE_CATEGORY,
  FILTER_ORDEN_ALFABETICO,
  SET_DEFAULT_FILTERS,
  UPDATE_OPTION_FILTERS,
} from "../action-type/action-types";
import { saveCourse } from "./coursesActions";

export function filterByCategoryCourse(categories,isFilter,page) {
    return async function (dispatch) {
        try {
            const courseList = await getCourseForSale();
           
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

export const FilterCourseCategory = (option, data) => {
  return {
    type: FILTER_COURSE_CATEGORY,
    payload : option, data
  }
};

export const FilterOrdenAlfabetico = (data) => {
  return {
    type: FILTER_ORDEN_ALFABETICO,
    payload : data

  }
}



