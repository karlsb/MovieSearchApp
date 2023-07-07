import { useState, useEffect } from "react";
import MovieContainer from "./MovieContainer";
import { fetchMoviesJSON } from "./api";
import "./app.css"

function Discover() {
  const [searchField,setSearchField] = useState('')
  const [errorMessage,setErrorMessage] = useState(null)
  const [movieArray, setMovieArray] = useState([])
  const [mPage, setmPage] = useState(1);
  const [resultName, setResultName] = useState('')
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    const cachedData = localStorage.getItem('movieArray');
    if(!cachedData){
      fetchMovies('batman', 1);
      setmPage(1);
    }
    else{
      const parsedData = JSON.parse(cachedData);
      setMovieArray(parsedData);
      setLastPage(Math.ceil(parsedData.length/10));
    }
  }, [])

  const searchMovie = () => {
    setmPage(1);
    setResultName(searchField);
    fetchMovies(searchField, 1);
  }
  
  const fetchMovies = async (searchName, page) => {
    try{
      const movies = await fetchMoviesJSON(searchName,page);
      if(movies.Response === "False"){
        setErrorMessage(movies.Error);
      }
      else{
        localStorage.setItem('movieArray', JSON.stringify(movies.Search));
        setMovieArray(movies.Search);
        setLastPage(Math.ceil(movies.totalResults/10));
      }
      console.log(movies);
    }
    catch(error){
      console.log(error);
    }
  }
  
  const onInputChange = (e) => {
    setSearchField(e.target.value)
  }

  const errorDisplay = () => {
    if(errorMessage){
      return <p>{errorMessage}</p>
    }
  }

  const movieDisplay = () => {
    if(movieArray.length !== 0){
      return movieArray.map((movie, key) => {
        return <MovieContainer key={key} title={movie.Title} year={movie.Year} poster={movie.Poster} imdbID={movie.imdbID}></MovieContainer>
      })
    }
  }

   const nextPage = () => {
    if(mPage === lastPage){
        return;
    }
    console.log(mPage+1);
    fetchMovies(resultName, mPage+1);
    setmPage(mPage => mPage + 1);
    console.log(lastPage)
  }

  const prevPage = () => {
    if(mPage === 1){
      return;
    }
    console.log(mPage-1);
    fetchMovies(resultName, mPage-1);
    
    setmPage(mPage => mPage - 1);
  }
 
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex mt-10 sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <input className="shadow-lg border rounded-full ml-4 px-4 font-bold w-full" onChange={onInputChange}></input>
        <button className="ml-2 bg-slate-100 hover:bg-slate-200 rounded-full px-4 py-2" onClick={searchMovie}>Search</button>
      </div>
      {errorDisplay()}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2 xl:grid-cols-5 gap-3 py-10 w-full md:w-2/3 place-items-center">
        {movieDisplay()}
      </div>
      <div className="pb-20 space-x-3">
        <button className="bg-slate-100 hover:bg-slate-200 rounded-full px-4 py-2" onClick={prevPage}>Prev</button>
        <button className="bg-slate-100 hover:bg-slate-200 rounded-full px-4 py-2" onClick={nextPage}>Next</button>
      </div>
    </div>
    );
}

export default Discover;
