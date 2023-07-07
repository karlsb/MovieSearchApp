import React from 'react'
import "./index.css"

function NavBar({...props}) {

  return (
    <nav className="bg-red-100"> 
        {/* <h1>arch App</h1> */}
        {props.children}
    </nav>
  )
}

export default NavBar