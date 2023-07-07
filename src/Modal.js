import ReactModal from 'react-modal'
import { useState , useEffect} from 'react'
import { fetchMovieDetailsJSON } from './api'
import {useFavorites} from './FavoritesContext'


function Modal({imdbID, closeModal}){
    const {dispatch} = useFavorites()

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [poster, setPoster] = useState('')
    const [plot, setPlot] = useState('')
    const [actors, setActors] = useState('')
    const [director, setDirector] = useState('')
    const [genre, setGenre] = useState('')
    const [rating, setRating] = useState('')
    const [runtime, setRuntime] = useState('')
    const [language, setLanguage] = useState('')
    const [country, setCountry] = useState('')
    const [awards, setAwards] = useState('')


    const fetchMovieDetails = (imdbID) => {
        fetchMovieDetailsJSON(imdbID)
        .then((movie) => {
            setTitle(movie.Title);
            setYear(movie.Year);
            setPoster(movie.Poster);
            setPlot(movie.Plot);
            setActors(movie.Actors);
            setDirector(movie.Director);
            setGenre(movie.Genre);
            setRating(movie.Ratings[0].Value);
            setRuntime(movie.Runtime);
            setLanguage(movie.Language);
            setCountry(movie.Country);
            setAwards(movie.Awards);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const addToFavorites = () => {
        dispatch({type: 'ADD_FAVORITE', payload: {title, year, poster, imdbID}})
    }


    useEffect(() => {
        fetchMovieDetails(imdbID);
    }, [imdbID])

    return (
    
        <ReactModal className="bg-neutral-50 xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-lg m-auto md:mt-5 rounded-lg px-5 py-5" isOpen={true} ariaHideApp={false}>
            <div className="flex flex-col">

            <div className="flex"> 
                <h1 className="font-bold flex-grow">{title}</h1>
                <button className="bg-slate-100 hover:bg-gray-200 rounded-full py-2 px-4" onClick={closeModal}>X</button>  
            </div>
            <div className="divide-y w-full lg:w-2/3">
                <img src={poster} alt={title} loading="lazy" className="mb-2"></img>
                <div className="flex space-x-2"><h3 className="font-bold">Year:</h3><span>{year}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Plot:</h3><span>{plot}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Actors:</h3><span>{actors}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Director:</h3><span>{director}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Genre:</h3><span>{genre}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Rating:</h3><span>{rating}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Runtime:</h3><span>{runtime}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Language:</h3><span>{language}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Country:</h3><span>{country}</span></div>
                <div className="flex space-x-2"><h3 className="font-bold">Awards:</h3><span>{awards}</span></div>
            </div>
            <div className=" space-x-2 mt-2">
                
                <button className="bg-slate-100 hover:bg-gray-200 rounded-full py-2 px-4" onClick={addToFavorites}>Add To Favorites</button>
            </div>
            </div>
        </ReactModal>
   
    )
}

export default Modal
