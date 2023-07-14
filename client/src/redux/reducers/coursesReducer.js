import { GET_ALL_COURSES, DELETE_COURSE, SAVE_COURSE} from "../action-type/action-types";

const initialState = {
  arrayCourses:[],
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

    case DELETE_COURSE:
  // Filtrar el curso a borrar según el ID
  const updatedCourseAll = state.courses.courseAll.filter(
    (course) => course.id !== action.payload
  );

  return {
    ...state,
    courses: {
      ...state.courses,
      courseAll: updatedCourseAll,
    },
  };



    case GET_ALL_COURSES:

     return {
      ...state,
      courses: action.payload,

     }


    default:
      return state;
  }
}
