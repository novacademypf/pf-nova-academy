import { GET_ALL_COURSES, DELETE_COURSE} from "../action-type/action-types";

const initialState = {
  courses: [],
};

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COURSES: {
      return {
        ...state,
        courses: action.payload,
      };
    }

    case DELETE_COURSE:
      // Filtrar el curso a borrar según el ID
      const updatedCourses = state.courses.filter(
        (course) => course.id !== action.payload
      );

      return {
        ...state,
        courses: updatedCourses,
      };

      

    default:
      return state;
  }
}
