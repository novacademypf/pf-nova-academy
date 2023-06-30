import { SIGN_UP_SUCCESS,
   SIGN_UP_FAILURE,
   CHECK_EMAIL_EXISTENCE,
  CHECK_EMAIL_EXISTENCE_SUCCESS,
  CHECK_EMAIL_EXISTENCE_FAILURE, } from "../action-type/action-types";


const initialState = {
  user: null,
  error: null,
  isCheckingEmail: false,
  emailError: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        user: null,
        error: action.payload,
      };

      case 'CHECK_EMAIL_EXISTENCE':
      return {
        ...state,
        isCheckingEmail: true,
        emailError: '',
      };

    case 'CHECK_EMAIL_EXISTENCE_SUCCESS':
      return {
        ...state,
        isCheckingEmail: false,
        emailError: '',
      };

    case 'CHECK_EMAIL_EXISTENCE_FAILURE':
      return {
        ...state,
        isCheckingEmail: false,
        emailError: action.payload,
      };



    default:
      return state;
  }
};

export default userReducer;