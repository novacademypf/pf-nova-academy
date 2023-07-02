import { GET_ALL_CATEGORIES } from "../action-type/action-types.js";

const initialState = {
    categoryList: [],
};

export default function categoriesReducer (state = initialState, action) {
    switch (action.type){
        case GET_ALL_CATEGORIES: {
            return {
                ...state,
                categoryList: action.payload,
            };
        }
        default:
            return state;
    }
}