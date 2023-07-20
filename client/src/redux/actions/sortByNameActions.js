import { SORT_BY_NAME, SET_DATA } from "../action-type/action-types";
import axios from "axios";
/*export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}*/

/*export function getSortByName(name) {
    return async function (dispatch) {
        const { data } = await axios.get(`/courseForSale?name=${name}`);
        return dispatch({
            type: "SORT_BY_NAME",
            data: response
        });
    };
}*/

// actions.js
export const getSortByName = (name) => {
    return async function (dispatch){
      
        // Realizar la solicitud a la base de datos con la letra opcional
        const {response} = await axios.get (`/courseForSale`); // ¡Reemplaza 'database.fetchData' con la llamada real a tu base de datos!
  
        // Actualizar el estado de Redux con los datos filtrados
        return dispatch({
             type: SORT_BY_NAME, 
             data: response 
            });
      };
    }

   export const setData = (data) => {
        return {
          type: SET_DATA,
          payload: data
        };
    }
  