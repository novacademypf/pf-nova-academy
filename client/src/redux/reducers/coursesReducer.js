import { GET_ALL_COURSES, DELETE_COURSE, SAVE_COURSE, GET_COURSE_BY_ID} from "../action-type/action-types";

const initialState = {
  arrayCourses:[],
  courses: [],
  isFilter:false,
  courseById: {}
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

    case DELETE_COURSE:
  // Filtrar el curso a borrar según el ID
  const updatedCourseAll = state.arrayCourses.filter(
    (course) => course.id !== action.payload

    );

  return {
    ...state,
    arrayCourses: updatedCourseAll,
  };


    case GET_ALL_COURSES:

     return {
      ...state,
      courses: action.payload,

     }
     case GET_COURSE_BY_ID:
      return{
        ...state,
        courseById: action.payload,
      }


    default:
      return state;
  }
}
