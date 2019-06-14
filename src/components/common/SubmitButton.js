import PropTypes from "prop-types";
import Radium from "radium";
import React from "react";
import styles from "./SubmitButton-styles";

const SubmitButton = ({ text, type }) => (
  <button style={styles.subBtn} type={type} className="btn btn-outline-success">
    {text}
  </button>
);

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

SubmitButton.defaultTypes = {
  type: "submit"
};

export default Radium(SubmitButton);
