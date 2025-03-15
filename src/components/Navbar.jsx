import React from 'react'
import { Link } from 'react-router-dom'
import "../components/Navbar.css"
const Navbar = () => {
  return (
    <div className='navbar'>
    <Link to="/" className='navbar-link'>Inicio</Link>
    <Link to="/domiciliarios" className='navbar-link'>Domiciliarios</Link>
    <Link to="/rapidin" className='navbar-link'>Rapidin</Link>
    <Link to="/domicilio" className='navbar-link'>Domicilios</Link>
    </div>
  )
}

export default Navbar
