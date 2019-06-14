import React from "react";
import styles from "../common/BgText-styles";

const AboutPage = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "80vh" }}
  >
    <div className="container" style={styles}>
      <div className="row">
        <div className="col text-center py-4">
          <h1>About</h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center py-4">
          <p>
            This app uses React, Redux, React Router, and many other helpful
            libraries.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
