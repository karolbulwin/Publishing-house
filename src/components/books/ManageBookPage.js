import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadBooks, saveBook } from "../../redux/actions/bookActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import BookForm from "./BookForm";
import { newBook } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

export function ManageBookPage({
  books,
  authors,
  loadAuthors,
  loadBooks,
  saveBook,
  history,
  redirectToAddPageNotFound,
  ...props
}) {
  const [book, setBook] = useState({ ...props.book });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        alert("Loading books failed" + error);
      });
    } else {
      setBook({ ...props.book });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.book]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
    addAuthorName(event);
  }

  function getAuthorName(number) {
    return authors.find(author => author.id === number);
  }

  function addAuthorName(event) {
    const { name, value } = event.target;
    let author;
    if (name === "authorId") {
      author = getAuthorName(parseInt(value));

      setBook(prevBook => ({
        ...prevBook,
        authorName: author.name
      }));
    }
  }

  function formIsValid() {
    const { title, authorId, category } = book;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    saveBook(book)
      .then(() => {
        toast.success("Book saved.");
        history.push("/books");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return redirectToAddPageNotFound === true ? (
    <Redirect to="/PageNotFound" />
  ) : authors.length === 0 || books.length === 0 ? (
    <Spinner />
  ) : (
    <BookForm
      book={book}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageBookPage.propTypes = {
  book: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  loadBooks: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveBook: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  redirectToAddPageNotFound: PropTypes.bool.isRequired
};

export function getBookBySlug(books, slug) {
  return books.find(book => book.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const book =
    slug && state.books.length > 0 ? getBookBySlug(state.books, slug) : newBook;

  const redirectToAddPageNotFound = book === null ? true : false;

  return {
    redirectToAddPageNotFound,
    book,
    books: state.books,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadBooks,
  loadAuthors,
  saveBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBookPage);
