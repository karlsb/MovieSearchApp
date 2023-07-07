import React, { useReducer } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom'
import Discover from './Discover'
import Favorites from './Favorites'

import NavBar from './NavBar'

import { favoritesReducer } from './favoritesReducer'
import { FavoritesContext } from './FavoritesContext'
/* here i should provide a context so with a useReducer */


export default function App() {
    const [favorites,dispatch] = useReducer(favoritesReducer, [])

    const favoritesState={
        favorites,
        dispatch
    }


  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={ 
                    <FavoritesContext.Provider value={favoritesState}>
                        <Layout/>
                    </FavoritesContext.Provider>
                }>
                        <Route path="/favorites" element={<Favorites />}/>
                        <Route path="/discover" element={<Discover/>}/>
                </Route>
            </Routes>
        </Router>
    </div>
  )
}



function Layout(){
    return (
        <div className="font-poppins divide-y font-bold ">
            <nav className="flex flex-row h-24 items-center">
                <h1 className=" text-2xl flex-grow ml-4" >Movie Search App</h1>
                <Link className="hover:bg-slate-200 mr-8 rounded-full px-2 py-1" to="/discover">Discover</Link>
                <Link className="hover:bg-slate-200 mr-8 rounded-full px-2 py-1" to="/favorites">Favorites</Link>
            </nav>
        <Outlet/>
        </div>
    )
}