import {
    FILTER_BY_PRICE
} from "../action-type/action-types"

const initialState = {
  
    courses: [],
  };
  
  const filterByPriceRed = (state = initialState, action) => {
    switch (action.type) {

case FILTER_BY_PRICE:
          let sortedCoursesByPrice = [...state.courses] 
          sortedRecipesByScore = action.payload === 'asc' ?
          state.courses.sort(function(a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            return 0;
          }) :
          state.courses.sort(function(a, b) {
            if (a.price < b.price) return 1;
            if (a.price > b.price) return -1;
            return 0;
          });
          return {
            ...state,
            courses: sortedCoursesByPrice
          };
        }