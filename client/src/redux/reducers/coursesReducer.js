import { GET_ALL_COURSES, SAVE_COURSE } from "../action-type/action-types";

const initialState = {
  courses: [],
  isFilter:false
};

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_COURSE: {
     
      return {
        ...state,
       courses: action.payload,
       isFilter: action.isFilter
      };
    }

    default:
      return state;
  }
}
