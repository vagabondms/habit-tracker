import React from "react";

const Navbar = ({ count }) => {
  return (
    <nav className="navbar">
      <span className="navbar-logo">
        <i className="fas fa-leaf"></i>
      </span>
      Habit Tracker
      <span className="navbar-count">{count}</span>
    </nav>
  );
};

export default Navbar;
