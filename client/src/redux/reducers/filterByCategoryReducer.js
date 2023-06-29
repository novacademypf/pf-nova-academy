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
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default filterByCategoryRed;