import axios from "axios";
import {SAVE_COURSE,GET_ALL_COURSES, DELETE_COURSE } from "../action-type/action-types";

import { getCategoryFilters, getCourseForSale } from "../../services/courseForSaleRequest";


const endpoint = "http://localhost:3001/courseForSale?page=1&limit=10";

export const getAllCourses = () => {
  return async (dispatch) => {
    try {
      let getDogs = await getCourseForSale();
      let data = getDogs.data;
      return dispatch(saveCourse(data));
    } catch (err) {
      console.log({ errorGetAllCourses: err, message: err.message });
    }
  };
};


export const getCoursesTotal = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/courseForSale?page=1&limit=10');
      console.log(response);
      dispatch({
        type: GET_ALL_COURSES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCourse = (courseId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/courseForSale/deleteCourse/${courseId}`);
      dispatch({
        type: DELETE_COURSE,
        payload: courseId,
      });
    } catch (error) {
      console.error(error);
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

export const totalCourse=(course)=>{
  return {
    type:GET_ALL_COURSES,
    payload:course,
  }
}
