import axios from "axios";
import {SAVE_COURSE } from "../action-type/action-types";

import { getCategoryFilters, getCourseForSale } from "../../services/courseForSaleRequest";


const endpoint = "http://localhost:3001/courseForSale?page=1&limit=10";

export const getAllCourses = (page, limit) => {
  return async (dispatch) => {
    try {
      let getDogs = await getCourseForSale(page, limit);
      let data = getDogs.data;
      return dispatch(saveCourse(data));
    } catch (err) {
      console.log({ errorGetAllCourses: err, message: err.message });
    }
  };
};

export const deleteCourse = (courseId) => {
  return {
    type: 'DELETE_COURSE',
    payload: courseId,
  };
};



export const saveCourse=(course,isFilter)=>{
  return {
    type:SAVE_COURSE,
    payload:course,
    isFilter:isFilter
  }
}
