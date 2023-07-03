import {  SAVE_COURSE } from "../action-type/action-types";

const initialState = {
  courses: [],
};

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_COURSE: {
     
      return {
        ...state,
       courses: action.payload
      };
    }

    default:
      return state;
  }
}
