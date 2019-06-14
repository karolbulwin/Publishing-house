import React from "react";
import styles from "./Header-styles";
import NavigationLink from "./NavigationLink";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light py-3 bg-light"
      style={styles.root}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto flex-grow-1 justify-content-lg-around">
          <NavigationLink to="/" text="Home" />
          <NavigationLink to="/books" text="Books" />
          <NavigationLink to="/authors" text="Authors" />
          <NavigationLink to="/about" text="About" />
        </ul>
      </div>
    </nav>
  );
};

export default Header;
