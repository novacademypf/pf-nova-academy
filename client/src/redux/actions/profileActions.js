import axios from 'axios';
import { GET_PROFILE, GET_COURSE_BY_PROFILE, LOGOUT } from '../action-type/action-types';

export const getProfile = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/profile/', {
                headers: {
                    Authorization: token,
                },
            });
            dispatch({ type: GET_PROFILE, payload: response.data });
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
        }
    };
};

export const getCoursesByProfileId = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            console.log("token account", token)

            const response = await axios.get('http://localhost:3001/profile/courseForSale', {
                headers: {
                    Authorization: token,
                },
            });
            console.log("action profile", response.data)

            dispatch({ type: GET_COURSE_BY_PROFILE, payload: response.data });
        } catch (error) {
            console.error('Error al obtener el courso del perfil del usuario:', error);

        }
    }
}
export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT });
    };
};
