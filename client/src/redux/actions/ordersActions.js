import axios from "axios";
import { GET_ORDERS, GET_ORDERS_COURSE } from "../action-type/action-types";

export const getOrders = (profileId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/orders/${profileId}`
      );
      console.log(response);
      dispatch({
        type: GET_ORDERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getOrdersCourse = (profileId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/orders/courses/${profileId}`
      );
      console.log(response);
      dispatch({
        type: GET_ORDERS_COURSE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
