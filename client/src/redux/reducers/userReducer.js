import { SIGN_UP_SUCCESS,
   SIGN_UP_FAILURE,
   CHECK_EMAIL_EXISTENCE,
  CHECK_EMAIL_EXISTENCE_SUCCESS,
  CHECK_EMAIL_EXISTENCE_FAILURE,
  DELETE_USER,
  GET_USERS,
 } from "../action-type/action-types";

const initialState = {
  user: null,
  error: null,
  checkEmailExistence: false,
  emailError: '',
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };

      case CHECK_EMAIL_EXISTENCE:
      return {
        ...state,
        checkEmailExistence: true,
        emailError: '',
      };

    case CHECK_EMAIL_EXISTENCE_SUCCESS:
      return {
        ...state,
        checkEmailExistence: false,
        emailError: '',
      };

    case CHECK_EMAIL_EXISTENCE_FAILURE:
      return {
        ...state,
        checkEmailExistence: false,
        emailError: action.payload,
      };

      case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
      };

    case 'DELETE_USER':
      const updatedUsers = state.users.filter((user) => user.id !== action.payload);
      return {
        ...state,
        users: updatedUsers,
      };



    default:
      return state;
  }
};

export default userReducer;
