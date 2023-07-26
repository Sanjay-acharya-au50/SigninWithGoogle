import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div style={{display:'flex', gap:'20px'}}>
            <Link to={'/'}>home</Link>
            <Link to={'/login'}>login</Link>
            <Link to={'/post/:id'}>post</Link>

    </div>
  )
}

export default Navbar