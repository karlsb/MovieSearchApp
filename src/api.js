export async function fetchMoviesJSON(searchQuery, page) {

    const queryArray = searchQuery.split(' ');
    const query = "http://www.omdbapi.com/?s=" + queryArray.join('+') + "&page="+ page + "&apikey=" + process.env.REACT_APP_OMDB_API_KEY;
    console.log(query); 
    try{
      console.log()
      const data = await fetch(query)
      const movies = await data.json()
      return movies;
    } catch(error){
      throw error;
    }
}


export async function fetchMovieDetailsJSON(imdbID) {
  const query = "http://www.omdbapi.com/?i=" + imdbID +"&plot=full&apikey=" + process.env.REACT_APP_OMDB_API_KEY;

  try{
    console.log()
    const data = await fetch(query)
    const movies = await data.json()
    return movies;
  } catch(error){
    throw error;
  }
}