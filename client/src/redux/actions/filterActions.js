import { getCourseForSale } from "../../services/courseForSaleRequest";
import {
  APPLY_FILTER,
  DELETE_FILTERS,
  GET_COURSE_FILTER_DEFAULT,
  SET_DEFAULT_FILTERS,
  SET_OPTION_FILTERS,
} from "../action-type/action-types";

export function  getCourseDefaultFilters(isFiltered){
  return async function (dispatch) {
    try {
      const courseList = await getCourseForSale();
      return dispatch({type:GET_COURSE_FILTER_DEFAULT,payload:courseList.data,isFilter:isFiltered});
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const setDefaultFilters = () => {
  return {
    type: SET_DEFAULT_FILTERS,
  };
};


export const setOptionFilters = (option)=>{
  return { type: SET_OPTION_FILTERS, payload:option}
}
export const applyFilter = (category, precio, orderAlphabetico,isFiltered) => {
  return {
    type: APPLY_FILTER,
    filters: { category, precio, orderAlphabetico },
    isFiltered: isFiltered
  };
};
export const deleteFilters=()=>{
  return { type: DELETE_FILTERS}
}

