import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="ui secondary pointing menu two item">
      <NavLink to="/tracking-list-app/" activeClassName="active" className="item">
        Home
      </NavLink>
      <NavLink to="/received" activeClassName="active" className="item">
        Recieved Items
      </NavLink>
    </div>
  )
};

export default Nav;
