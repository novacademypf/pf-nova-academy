import { GET_PROFILE, GET_COURSE_BY_PROFILE, LOGOUT } from "../action-type/action-types";

const initialState = {
  userProfile: null,
  error: null,
  courseByProfile: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, userProfile: action.payload };
    case GET_COURSE_BY_PROFILE:
      console.log("reducer", action.payload)
      return { ...state, courseByProfile: action.payload };
    case LOGOUT:
      return {
        ...state,
        userProfile: null,
        // Restablecer otros estados del perfil si es necesario
      };
    default:
      return state;
  }
};


export default profileReducer;