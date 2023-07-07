import "./app.css"
import { useState } from "react"
import Modal from "./Modal"

function MovieContainer({title, year, poster, imdbID}){
    const [isModalOpen, setisModalOpen] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

    const openModal = () => {
        setisModalOpen(true)
    }
    
    const closeModal = () => {
        setisModalOpen(false)
    }


    return (
        <>
            <div className="rounded-lg flex flex-col text-center items-center w-2/3 md:w-full  space-y-4 p-4 transform motion-safe:hover:scale-110 duration-100"
                 onClick={openModal} 
                 >
                <p className="max-w-full truncate">{title}</p>
                <img src={poster} alt={title} loading="lazy" className="object-cover w-2/3 md:w-full" ></img>
                <h3>Year: {year}</h3>
            {/*    {isHovering && <button>Add to favorites</button>} */}
            </div>
            {isModalOpen && (<Modal imdbID={imdbID} closeModal={closeModal}></Modal>)}
        </>
    )
}

export default MovieContainer