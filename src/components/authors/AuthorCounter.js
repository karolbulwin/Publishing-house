import React, { useEffect } from "react";
import { connect } from "react-redux";

import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

function AuthorsCounter({ authors, loadAuthors }) {
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading Authors failed" + error);
      });
    }
  }, [authors]);

  return (
    <span className="badge badge-light">
      Authors: {authors.length === 0 ? 0 : authors.length}
    </span>
  );
}

AuthorsCounter.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadAuthors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsCounter);
