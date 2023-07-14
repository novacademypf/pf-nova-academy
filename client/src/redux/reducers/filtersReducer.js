import { SAVE_DATA_FILTER, SET_MENU_OPTIONS } from "../action-type/action-types";

const initialOptions = {
    searchBar: ''
}
const initialDataFilter={
    filtros:{
        searchBar:''
    },
    dataFilter:[]
}
export const setMenuOptionsReducer = (state = initialOptions, action) => {
    switch (action.type) {
        case SET_MENU_OPTIONS:
            return {
                ...state, [action.name]: action.value
            }
        default:
            return state
    }
}
export const saveDataFilterReducer=(state=initialDataFilter,action)=>{
    switch (action.type) {
        case SAVE_DATA_FILTER:
            return {
                ...state,dataFilter:action.data
            }
        default:
            return state
    }
}