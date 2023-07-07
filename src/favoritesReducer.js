/* 
    movie - {title, year, poster, imdbID}

*/
export const INITIAL_STATE = []


export function favoritesReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case 'ADD_FAVORITE':
            return [...state, action.payload]
        case 'REMOVE_FAVORITE':
            return state.filter(movie => movie.imdbID !== action.payload.imdbID) 
        default:
            return state
    }
}