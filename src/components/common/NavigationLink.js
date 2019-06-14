import PropTypes from "prop-types";
import React from "react";
import Radium from "radium";
import { NavLink } from "react-router-dom";
import styles from "./NavigationLink-styles";

const NavigationLink = ({ to, text }) => {
  return (
    <li className="nav-item" style={styles.navLink}>
      <NavLink
        className="nav-link"
        to={to}
        activeStyle={styles.activeStyle}
        exact
      >
        {text}
      </NavLink>
    </li>
  );
};

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Radium(NavigationLink);
