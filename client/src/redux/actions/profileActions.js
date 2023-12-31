import axios from "axios";
import {
  GET_PROFILE,
  GET_COURSE_BY_PROFILE,
  LOGOUT,
  GET_ALL_PROFILE,
} from "../action-type/action-types";

export const getProfile = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/profile/", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      localStorage.setItem("profileId", response.data.profileId);
      dispatch({ type: GET_PROFILE, payload: response.data });
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }
  };
};

export const getCoursesByProfileId = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/profile/courseForSale", {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: GET_COURSE_BY_PROFILE, payload: response.data });
    } catch (error) {
      console.error(
        "Error al obtener el courso del perfil del usuario:",
        error
      );
    }
  };
};
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  };
};

export const getAllProfile = () =>{
  console.log('afuera ')
  return async (dispatch) =>{
    console.log('adentro ')
    try {
      const response = await axios.get("/profile/allProfile");

      console.log('response data ver',response.data);

      dispatch({ type: GET_ALL_PROFILE, payload: response.data });
    } catch (error) {
      console.error("Error al obtener el perfil de los usuarios:", error);
    }
    console.log('sali del getall')

  }
}

