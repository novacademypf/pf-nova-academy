import { GET_ORDERS } from "../action-type/action-types";

const orderInitialState = {
  orders: [],
  purchasedCourses: [],
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

    default:
      return state;
  }
}
