import {
    SORT_BY_NAME
} from "../action-type/action-types"

const initialState = {
  
    courses: [],
  };

    function sortByNameReducer(state= initialState, action) {
        switch(action.type){
            case SORT_BY_NAME:
                    const sortedName = action.payload === 'ABC' ?
                        state.courses.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1;
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1;
                            }
                            return 0
                        }) :
                        state.courses.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1;
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return 1;
                            }
                            return 0
                        })
                    return {
                        ...state,
                        courses:sortedName
                    }
                default:
                    return state;
        }
    }

    export default sortByNameReducer;

            
           