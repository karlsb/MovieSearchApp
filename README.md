## Movie Search App

A movie searching front-end web application built in React.

The appliction is only a front-end that uses omdbapi which provides movie data.  

The purpose of the application was for me to showcase working with existing api's, how to use async request and using some of react's built in hooks such as useReducer and useContext.

The styling of the application is very basic, it focuses more on functionality rather than style.

## Tech Stack
- [React](https://react.dev/) (create-react-app)
- [React-Router](https://reactrouter.com/en/main)
- [omdbapi](https://www.omdbapi.com/)
- [Tailwind.css](https://tailwindcss.com/)

## Installation & Running Locally

### Prerequisites 

- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/downloads)


### Setup

install dependencies

```bash
npm install
```

(optional)
Fix vulnerability issues. I don't recommend running  ```npm audit fix --force```

```bash
npm audit fix
```

You may still get warnings from npm, but the app should run fine locally.

### Connect to API

Get an api key from [OmdbAPI](https://www.omdbapi.com/apikey.aspx)

Create a .env file in the project root directory

inside .env, set the variable REACT_APP_OMDB_API_KEY = your_api_key

### Run the web app

```bash
npm start
```
## Application overview
_________
The discover view is the landing page. Here the user can type in a search query and look for movies through next/prev page button on the bottom of the screen (out of view in the image). The user can also press a thumbnail to see more info about the movie.

![image](/images/Discover.png)
_________

In the Modal view shows more info about a specific movie the user can add the movie to the Favorites with the "Add to Favorites" button.

![image](/images/Modal.png)
_________

The Favorites view shows all the movies the user has added to favorites. Here we can also remove movies we no longer want in our favorites with the "Remove" button.  

![image](/images/Favorites.png)


# Implementation Details

## Components
- **[App](#app)**
- **[Discover](#discover)**
- **[Favorites](#favorites)**
- **[Modal](#modal)**
- **[MovieContainer](#moviecontainer)**

### App

***View***

A Wrapper for our two routes Favorites and Discover. App defines a layout which contains a navbar and React-Router Outlet which helps render either Favorites or Discover while keeping the same navbar.

***Functionality***

**useReducer** - Is used as a small data storage with help of the custom reducer favoritesReducer. The reducer provides the actions = ADD_FAVORITE and REMOVE_FAVORITE.

**React-Router** -  Is used to handle routing. The application has two routes /favorites and /discover.

### Discover

**View**
Displays a search field and a grid of movie thumbnails. The user can click on the thumbnails of the movies to open a modal that displays more information about the movie.

**Functionality**

State
- searchField
- errorMessage
- movieArray
- mPage
- resultName
- lastPage

A useEffect handles the first rendering. It fetches the movies found by the string 'batman' and sets these as the movieArray.

The button labled Search makes an API call for the string  searchField which is updated through the input next to the Search button.

the async function fetchMovies makes an call to omdbapi with the searchName string. The recieved data is stored in localStorage aswell as in the components state.

The functions prevPage and nextPage makes new calls to omdbapi with the next or previous page number defined by mPage. It also updates mPage

### Favorites

**View**

Displays a list of all the movies inside the favorites context.

**Functionality**

Here we make use of the favorites context which uses our favorites reducer to update the context.

The components access the context provided by the App component. The context contains data "favorites" and a dispatch function "dispatch" that is used to update the data(favorites) through our favoritesReducer.

The Favorite component only defines a removeFavorite method and from this view favorites can on;y be removed. Adding favorites is done inside the Modal component.

### Modal

**View**

This component shows a more detailed description of a movie. It is a pop-up displayed when a user clicks on a thumbnail inside the discover view.

The user can adding the movie shown in the modal to Favorites with the "Add to Favorites" button and can close the modal with the "X" button.

**Functionality**

When a modal is opened a call to omdbapi is made. This api call gets more data of the specific movie based on an imdbID which is found in the data fetched inside the Discover view.

The modal stores relevant data from the api call into its state and displays it in a set of divs.

The user can call AddToFavorites through a button. The function dispatches a ADD_FAVORITE action with the modals movie as payload. This adds the movie to our favoritesContext so that it can be displayed in the Favorites view.

### MovieContainer

**View**

A wrapper for movie data inside the Discover view. The main purpose of this component is to make sure that the thumbnail of a movie looks good. This component could be renamed to thumbnail.

**Functionality**

Provides functions that opens and closes the Modal component which just manages a boolean state. The Open function is tied to an onClick listener for the outmost div inside the MovieContainer. The Close function is sent as a prop to the Modal.


## API Communication

The application uses fetch to make requests to the API. it defines a query inside a function and executes ```fetch(query)``` and the parses the response into json so that i can easily be used inside the components.

Two api call functions are defined in the application
- fetchMoviesJson 
- fetchMovieDetailsJson 

fetchMoviesJson takes a search string and recieves a response with a list of movies based on the search string. The query used is: "http://www.omdbapi.com/?s=searchstring&page=page&apikey=myapikey"

fetchMovieDetailsJson requests detailed info about a specfic movie. It fetches the query "http://www.omdbapi.com/?i=imdbID&plot=full&apikey=myapikey"

