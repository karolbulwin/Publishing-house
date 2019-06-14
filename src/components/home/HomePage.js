import React from "react";
import styles from "../common/BgText-styles";

const HomePage = () => (
  <>
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div className="jumbotron" style={styles}>
        <hr className="my-4" />
        <h1 className="text-center display-4">Publishing house</h1>
        <hr className="my-4" />
      </div>
    </div>
  </>
);

export default HomePage;
