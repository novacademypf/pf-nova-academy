import { SIGN_UP_SUCCESS,
   SIGN_UP_FAILURE,
   CHECK_EMAIL_EXISTENCE,
  CHECK_EMAIL_EXISTENCE_SUCCESS,
  CHECK_EMAIL_EXISTENCE_FAILURE,
  DELETE_USER,
  GET_USERS_GOOGLE,
  DELETE_USER_GOOGLE,
  GET_USERS,
  TOGGLE_USER_STATUS,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_STATUS
 } from "../action-type/action-types";

const initialState = {
  user: null,
  error: null,
  checkEmailExistence: false,
  emailError: '',
  users: [],
  usersGoogle: [],
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

      case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USERS_GOOGLE:
      return {
        ...state,
        usersGoogle: action.payload,
      };

      case DELETE_USER_GOOGLE:
      const deletedUserId = action.payload;
      const updatedUsersGoogle = state.usersGoogle.filter(user => user.id !== deletedUserId);
      return {
        ...state,
        usersGoogle: updatedUsersGoogle,
      };

      case TOGGLE_USER_STATUS:
        const { userId, status } = action.payload;
        const updatedUsers = state.users.map((user) =>
          user.userId === userId ? { ...user, status: !status } : user
        );
        return {
          ...state,
          users: updatedUsers,
        };


        case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
      };
    case UPDATE_USER_STATUS:
      return {
        ...state,
        user: {
          ...state.user,
          status: action.payload,
        },
      };



      

    default:
      return state;
  }
};

export default userReducer;
