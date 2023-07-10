import { GET_ALL_CATEGORIES } from "../action-type/action-types";

const initialState = {
  categories: [],
};

export default function getAllCategories(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    default:
      return state;
  }
}