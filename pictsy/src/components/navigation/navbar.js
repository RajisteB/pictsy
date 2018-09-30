import React from 'react'
import './navbar.css';

const NavBar = () => {
    return (
      <div className="nav-bar">
        <h1>PICTSY</h1>
        <div className="search">
          <i className="fas fa-camera-retro fa-lg"></i>
          <input type="text" placeholder="Search Images"/>
        </div>
        <div className="links">
          <h3>Browse</h3>
          <h3>License</h3>
          <button className="add-photo-btn">Add Photos</button>
          <i className="fas fa-ellipsis-v fa-rotate-90 fa-lg"></i>
        </div>
        <i className="fas fa-ellipsis-v fa-rotate-90 fa-lg mobile-icon"></i>
      </div>
    )
}

export default NavBar;