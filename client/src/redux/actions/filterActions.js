import { getCourseForSale } from "../../services/courseForSaleRequest";
import {
  APPLY_FILTER,
  FILTER_COURSE_CATEGORY,
  FILTER_ORDEN_ALFABETICO,
  GET_COURSE_FILTER_DEFAULT,
  SET_DEFAULT_FILTERS,
  SET_OPTION_FILTERS,
  UPDATE_OPTION_FILTERS,
} from "../action-type/action-types";
import { saveCourse } from "./coursesActions";

export function filterByCategoryCourse(categories, isFilter, page) {
  return async function (dispatch) {
    try {
      const courseList = await getCourseForSale();

      return dispatch(saveCourse(courseList.data, isFilter));
    } catch (error) {
      console.log(error, "Error");
    }
  };
}
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
export const updateOptionFilters = (option) => {
  return { type: UPDATE_OPTION_FILTERS, payload: option };
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
export const FilterCourseCategory = (option, data) => {
  return {
    type: FILTER_COURSE_CATEGORY,
    payload: option,
    data,
  };
};

export const FilterOrdenAlfabetico = (data) => {
  return {
    type: FILTER_ORDEN_ALFABETICO,
    payload: data,
  };
};
