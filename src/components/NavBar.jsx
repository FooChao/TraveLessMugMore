import React from 'react'
import {Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="container flex mx-auto p-6 bg-green-500 h-20 justify-between mb-5">
        
            {/* <!--Title--> */}
            <div className="rounded-lg pl-3 pr-3 pt-2 pb-2 h-10 bl-2 bg-red-400 text-white font-bold text-lg">
                TraveLessMugMore
            </div>
            {/* <!--Menu Items--> */}
            <div className="flex pt-2 space-x-0.5 md:space-x-20 lg:space-x-40 xl:space-x-60">
                <Link to="/" className="text-black hover:text-gray-500">
                    Home/About
                </Link>
                <Link to="/Tools" className="text-black hover:text-gray-500">
                    Tools
                </Link>
                <Link to="/Custom" className="text-black hover:text-gray-500">
                    Custom
                </Link>
                <Link to="/Credits" className="text-black hover:text-gray-500">
                    Credits
                </Link>
            </div>
            
        
        
    </nav>
  )
}

export default NavBar