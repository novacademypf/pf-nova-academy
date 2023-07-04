import axios from "axios";
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHECK_EMAIL_EXISTENCE,
  CHECK_EMAIL_EXISTENCE_SUCCESS,
  CHECK_EMAIL_EXISTENCE_FAILURE,
} from "../action-type/action-types";

export const signUpSuccess = (user) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: user,
  };
};

export const signUpFailure = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    payload: error,
  };
};

export const checkEmailExistence = (email) => {
  return async (dispatch) => {
    dispatch({ type: CHECK_EMAIL_EXISTENCE });

    try {
      // realizo la consulta al back para verificar la existencia del email
      const response = await axios.post('http://localhost:3001/user/signup', {
        email,
      });

      // Si el email existe, se devuelve un mensaje de error
      if (response.data.exists) {
        dispatch({
          type: CHECK_EMAIL_EXISTENCE_FAILURE,
          payload: "El email ya está registrado",
        });
        console.log("El email ya está registrado");
      } else {
        dispatch({ type: CHECK_EMAIL_EXISTENCE_SUCCESS });
      }
    } catch (error) {
      dispatch({
        type: CHECK_EMAIL_EXISTENCE_FAILURE,
        payload: "Error al verificar el email",
      });
    }
  };
};
