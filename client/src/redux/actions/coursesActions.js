import axios from "axios";
import { GET_ALL_COURSES, SAVE_COURSE } from "../action-type/action-types";
import api from "../../services/api";
import { getCategoryFilters, getCourseForSale } from "../../services/courseForSaleRequest";
const endpoint = "http://localhost:3001/courseForSale ";

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



export const saveCourse=(course,isFilter)=>{
  return {
    type:SAVE_COURSE,
    payload:course,
    isFilter:isFilter
  }
}