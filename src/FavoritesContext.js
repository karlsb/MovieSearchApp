import {createContext , useContext} from 'react'

export const FavoritesContext = createContext();

export function useFavorites(){
    return useContext(FavoritesContext)
}