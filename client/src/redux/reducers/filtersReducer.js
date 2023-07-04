import { getCourseForSale } from "../../services/courseForSaleRequest";
import {
  APPLY_FILTER,
  FILTER_COURSE_CATEGORY,
  FILTER_ORDEN_ALFABETICO,
  GET_COURSE_FILTER_DEFAULT,
  SET_DEFAULT_FILTERS,
  SET_OPTION_FILTERS,
  UPDATE_OPTION_FILTERS,
} from "../action-type/action-types";
import { getCourseDefaultFilters } from "../actions/filterActions";

const initialState = {
  cursos: [],
  cursosFiltrados: [],
  filters: {
    category: "todos",
    precio: "todos",
    orderAlphabetico: "A-z",
  },
  isFiltered: false,
  // otros estados iniciales...
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTION_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case APPLY_FILTER:
      console.log(action.filters);
      const { category, precio, orderAlphabetico } = action.filters;

      if (category !== "todos") {
        const data = state.cursos.courseAll.filter((c) => {
          return c.category.includes(category);
        });
        return {
          ...state,
          cursos: state.cursos,
          cursosFiltrados: { courseAll: data },
          isFiltered: action.isFiltered,
        };
      }
      if(orderAlphabetico !=='A-z'){
        const copia = [...state.cursos.courseAll];
      const ordenAlfiltrado = copia.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      return {
        ...state,
        cursos: state.cursos,
        cursosFiltrados: { courseAll: ordenAlfiltrado },
        isFiltered: action.isFiltered,
      }; 
    }
    if(orderAlphabetico !=='Z-A'){
      const copia = [...state.cursos.courseAll];
    const ordenAlfiltrado = copia.sort((a, b) =>
      b.name.localeCompare(a.name)
    );

    return {
      ...state,
      cursos: state.cursos,
      cursosFiltrados: { courseAll: ordenAlfiltrado },
      isFiltered: action.isFiltered,
    }; 
  }
      return state;

    case GET_COURSE_FILTER_DEFAULT:
      return {
        ...state,
        cursos: action.payload,
        isFiltered: action.isFiltered,
      };
    case FILTER_COURSE_CATEGORY:
      const categoriaFiltrada = action.data.filter((item) =>
        item.category.includes(action.payload)
      );
      console.log("=>", categoriaFiltrada);
      return {
        ...state,
        cursosFiltrados: [...categoriaFiltrada],
      };

    case FILTER_ORDEN_ALFABETICO:
      const copia = [...action.payload];
      const ordenAlfiltrado = copia.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log("===>", ordenAlfiltrado);
      return {
        ...state,
        cursosFiltrados: [...ordenAlfiltrado],
      };

    default:
      return state;
  }
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
