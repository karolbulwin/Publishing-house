import PropTypes from "prop-types";
import Radium from "radium";
import React from "react";
import styles from "./SubmitButton-styles";

const SubmitButton = ({ text }) => (
  <button style={styles.subBtn} className="btn btn-outline-success">
    {text}
  </button>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default Radium(SubmitButton);
