import { SET_DEFAULT_FILTERS, UPDATE_OPTION_FILTERS } from "../action-type/action-types";

const initialState = {
  filters: {
    category: "todos",
    precio: "todos",
  },
  // otros estados iniciales...
};
export const setOptionsFiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_FILTERS:
      return {
        ...state,
        filters: {
          category: "todos",
          precio: "todos",
          ubicacion: "todos",
        },
      };
    case UPDATE_OPTION_FILTERS:
      return { ...state, filters: action.payload };
    // otros casos de acciones...
    default:
      return state;
  }
};
