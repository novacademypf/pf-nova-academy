import {
    SORT_BY_NAME, SET_DATA
} from "../action-type/action-types"

const initialState = {
  
    filter: " ",
    data: []
  };

   /* function sortByNameReducer(state= initialState, action) {
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
                        filteredData:action.data
                    }
                default:
                    return state;
        }
    }

    export default sortByNameReducer;*/

      
      const sortByNameReducer = (state = initialState, action) => {
        switch (action.type) {
          case SORT_BY_NAME:
            return {
              ...state,
              filter: action.data,
            };
           case SET_DATA:
                return{
                    ...state,
                    data: action.payload
                };
          // Otros casos de acción...
          default:
            return state;
        }
      };
      
      export default sortByNameReducer;

            
           