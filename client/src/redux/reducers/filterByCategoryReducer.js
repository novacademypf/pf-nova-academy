import{
    FILTER_BY_CATEGORY
} from "../action-type/action-types"



const initialState = {
  
  categories: [],
};

const filterByCategoryRed = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        dogs: action.payload,
      };
    default:
      return state;
  }
};

export default filterByCategoryRed;