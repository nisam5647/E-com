import React from 'react'
import { Link } from 'react-router-dom'
const name="<cArT/>";

function Header() {
  return (
<header className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white shadow-md flex flex-row justify-evenly items-center" >
  <div className='ml-32 text-5xl font-bold'>{name}</div>    
   <div className="container py-12 flex flex-row justify-end gap-16 " >  
            <Link to="/"className="hover:text-gr-500 transition">Home</Link>
            <Link to="/Products"className="hover:underline">Products</Link>
            <Link to="/About"className="hover:underline">About</Link>
            <Link to="/Contact"className="hover:underline ">Contact</Link>
            <Link to="/Cart"className="hover:underline mr-16">🛒Cart</Link>
            <Link to="/Tickets"className="hover:underline mr-16">Tickets</Link>
      </div>

    </header>
  )
}

export default Header
