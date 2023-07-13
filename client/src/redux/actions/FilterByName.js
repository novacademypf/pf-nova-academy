import { FILTER_BY_NAME } from "../action-type/action-types"


function filtrarByName(nombre) {
    return {
      type: 'FILTER_BY_NAME',
      payload: {
        nombre: nombre
      }
    };
  }