import React from 'react';
import { NavLink } from 'react-router-dom';
import 'assets/css/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard Menu</h2>
      <ul>
        <li>
          <NavLink
            to="/admin/overview"
            className="nav-link"
            activeClassName="active-link"
          >
            OverView
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/user-details"
            className="nav-link"
            activeClassName="active-link"
          >
            User Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/user-reports"
            className="nav-link"
            activeClassName="active-link"
          >
            User Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/property-reports"
            className="nav-link"
            activeClassName="active-link"
          >
            Property Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/reviews"
            className="nav-link"
            activeClassName="active-link"
          >
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/property-types"
            className="nav-link"
            activeClassName="active-link"
          >
            Property Types
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/amenities"
            className="nav-link"
            activeClassName="active-link"
          >
            Amenities
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
