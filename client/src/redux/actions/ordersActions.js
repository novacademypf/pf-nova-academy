import axios from "axios";
import { GET_ORDERS } from "../action-type/action-types";

export const getOrders = (profileId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/orders/${profileId}`
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
