import { GET_ORDERS } from "../action-type/action-types";

const orderInitialState = {
  orders: [],
};
export default function orderReducer(state = orderInitialState, action) {
  switch (action.type) {
    case GET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }

    default:
      return state;
  }
}
