import axios from "axios";
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHECK_EMAIL_EXISTENCE,
  CHECK_EMAIL_EXISTENCE_SUCCESS,
  CHECK_EMAIL_EXISTENCE_FAILURE,
  GET_USERS,
  GET_USERS_GOOGLE,
  DELETE_USER_GOOGLE,
  DELETE_USER,
  TOGGLE_USER_STATUS,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_STATUS,
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
      const response = await axios.post("/user/signup", {
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

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/user/");
      console.log(response);
      dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUserGoogle = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/google/");
      console.log(response);
      dispatch({
        type: GET_USERS_GOOGLE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/user/deleteUser/${userId}`);
      dispatch({
        type: DELETE_USER,
        payload: userId,
      });
    } catch (error) {
      console.error("usuario no borrado");
      console.error(error);
    }
  };
};

export const deleteUserGoogle = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/deleteUser/${id}`);
      dispatch({
        type: DELETE_USER_GOOGLE,
        payload: id,
      });
    } catch (error) {
      console.error("usuario no borrado");
      console.error(error);
    }
  };
};

export const toggleUserStatus = (userId, status) => async (dispatch) => {
  try {
    await axios.put(`user/updateUser/${userId}`, { status });

    dispatch({
      type: TOGGLE_USER_STATUS,
      payload: { userId, status: !status },
    });
  } catch (error) {
    console.error("Error al cambiar el estado del usuario:", error);
  }
};

////////////////Login

export const loginUser = (userData) => {
  // Aquí puedes realizar la lógica para autenticar al usuario en el servidor
  // y obtener la información del usuario, luego actualizas el estado en el store
  const user = {
    // Datos del usuario obtenidos del servidor
    id: 1,
    email: userData.email,
    status: true, // Aquí puedes establecer el estado del usuario según la lógica de tu aplicación
  };

  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const updateUserStatus = (status) => {
  return {
    type: UPDATE_USER_STATUS,
    payload: status,
  };
};
