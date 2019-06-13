import React, { useEffect } from "react";
import { connect } from "react-redux";

import { loadBooks } from "../../redux/actions/bookActions";
import PropTypes from "prop-types";

function BooksCounter({ books, loadBooks }) {
  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        alert("Loading books failed" + error);
      });
    }
  }, [books]);

  return (
    <span className="badge badge-light">
      Books: {books.length === 0 ? 0 : books.length}
    </span>
  );
}

BooksCounter.propTypes = {
  books: PropTypes.array.isRequired,
  loadBooks: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books
  };
}

const mapDispatchToProps = {
  loadBooks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksCounter);
