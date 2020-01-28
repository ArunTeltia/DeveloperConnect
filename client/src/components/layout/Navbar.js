import React from "react";
import {Link} from 'react-router-dom';
export const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i class="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="!#">Developers</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};
