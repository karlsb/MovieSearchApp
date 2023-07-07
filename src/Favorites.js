import React from 'react'
import {useFavorites} from './FavoritesContext'

export default function Favorites() {
  /*  movie - {title, year, poster, imdbID} */
  const {favorites, dispatch} = useFavorites()


  const removeFavorite = (movie) => {
    dispatch({type: 'REMOVE_FAVORITE', payload: movie})
  }


  return (
    <div>
      <ul>
        {favorites.map((movie,index) => <li key={index}>
                                              <h3>{movie.title}</h3>
                                              <img src={movie.poster} alt=""></img>
                                              <h3>{movie.year}</h3>
                                              <button onClick={() => removeFavorite(movie)}>remove</button>
                                              </li>)}
      </ul>
    </div>
  )
}
