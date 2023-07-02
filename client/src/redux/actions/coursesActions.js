import axios from "axios";
import { GET_ALL_COURSES } from "../action-type/action-types";
import api from "../../services/api";
import { getCourseForSale } from "../../services/courseForSaleRequest";
const endpoint = "http://localhost:3001/courseForSale ";

export const getAllCourses = (page, limit) => {
  return async (dispatch) => {
    try {
      let getDogs = await getCourseForSale(page, limit);
      let data = getDogs.data;
     
      let courseList = data;

      return dispatch({
        type: GET_ALL_COURSES,
        payload: {
          courseAll: courseList.courseAll,
          courseCount: courseList.courseCount,
        },
      });
    } catch (err) {
      console.log({ errorGetAllCourses: err, message: err.message });
    }
  };
};
