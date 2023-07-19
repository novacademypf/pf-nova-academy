import { GET_ORDERS, GET_ORDERS_COURSE } from "../action-type/action-types";

const orderInitialState = {
  orders: [],
  purchasedCourses: [],
  ordersCourses:[],
};
export default function orderReducer(state = orderInitialState, action) {
  switch (action.type) {
    case GET_ORDERS: {
      const courses = action.payload
        .filter((el) => el.payment_status === "approved")
        .map((el) => {
          return el.items.map((el) => el.idCourse);
        })
        .flat();
      return {
        ...state,
        orders: action.payload,
        purchasedCourses: [...new Set(courses)],
      };
    }
    case GET_ORDERS_COURSE:{
      return {
        ...state,
        ordersCourses: action.payload,
      };
    }
    default:
      return state;
  }
}