
import { FILTER_COURSE_CATEGORY, FILTER_ORDEN_ALFABETICO, SET_DEFAULT_FILTERS, UPDATE_OPTION_FILTERS } from "../action-type/action-types";

const initialState = {
  filters: {
    category: "todos",
    precio: "todos",
    
  },

  
  // otros estados iniciales...
};

const estadoInicial = {
  listaCategoria : []
};

export const filterReducer = (state= initialState, action) => {
  switch (action.type){
    case FILTER_COURSE_CATEGORY:
      const categoriaFiltrada = action.data.filter((item) =>
        item.category.includes(action.payload)
      );
      console.log("=>", categoriaFiltrada)
      return{

        ...state,
        listaCategoria: [...categoriaFiltrada]
      }

    case FILTER_ORDEN_ALFABETICO: 
      const copia = [...action.payload]
      const ordenAlfiltrado = copia.sort((a,b) => a.name.localeCompare(b.name))
      console.log('===>', ordenAlfiltrado)
      return{
        ...state,
        listaCategoria: [...ordenAlfiltrado]
      }
      
      default:
      return state;
  }

}



  



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
