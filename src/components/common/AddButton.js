import PropTypes from "prop-types";
import Radium from "radium";
import React from "react";
import styles from "./AddButton-styles";

const AddButton = ({ onAddClick, text }) => (
  <button
    style={styles.addBtn}
    className="btn btn-outline-success add-author btn-sm"
    onClick={() => onAddClick()}
  >
    {text}
  </button>
);

AddButton.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Radium(AddButton);
