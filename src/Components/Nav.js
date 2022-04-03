import React from 'react';
import { NavLink } from 'react-router-dom';

//<NavLink > navigate around our applications,
// it renders an <a href=""> for us that points to a route
const Nav = () => (

    <nav className="main-nav">
    <ul>
      <li><NavLink to="/cats">Cats</NavLink></li>
      <li><NavLink to="/lajolla">La Jolla</NavLink></li>
      <li><NavLink to="/sunset">Sunset</NavLink></li>
    </ul>
    </nav>
);

export default Nav;