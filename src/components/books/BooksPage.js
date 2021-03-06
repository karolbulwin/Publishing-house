import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as bookActions from "../../redux/actions/bookActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import BookList from "./BookList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import Filter from "../common/Filter";
import styles from "../common/BgText-styles";

const BooksPage = ({ books, authors, loading, actions }) => {
  const [redirectToAddBookPage, setRedirectToAddBookPage] = useState(false);
  const [filterOpt, setFilterOpt] = useState({ authorId: "", category: "" });
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        if (books.length === 0) {
          await actions
            .loadBooks()
            .then(() => {
              setFilteredBooks(books);
            })
            .catch(error => {
              alert("Loading books failed" + error);
            });
          setIsLoading(false);
        } else {
          setFilteredBooks(books);
          setIsLoading(false);
          filterBooks();
        }

        if (authors.length === 0) {
          await actions.loadAuthors().catch(error => {
            alert("Loading authors failed" + error);
          });
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [books, authors, filterOpt]);

  function handleDeleteBook(book) {
    toast.success("Book deleted");
    try {
      actions.deleteBook(book);
      const books = filteredBooks.filter(b => book !== b);

      setFilteredBooks(books);
      if (books.length === 0) {
        setFilterOpt({
          authorId: "",
          category: ""
        });
        document.getElementById("authorId").value = "";
        document.getElementById("category").value = "";
      }
      filterBooks();
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFilterOpt({
      ...filterOpt,
      authorId:
        name !== "authorId"
          ? filterOpt.authorId
          : !Number.isNaN(parseInt(value))
          ? parseInt(value)
          : "",
      category: name === "category" ? value : filterOpt.category
    });
  }

  function filterBooks() {
    let filteredBooks;
    if (filterOpt.authorId !== "" && filterOpt.category !== "") {
      filteredBooks = books
        .filter(book => {
          return book.authorId === filterOpt.authorId;
        })
        .filter(book => {
          return book.category === filterOpt.category;
        });
    } else if (filterOpt.authorId !== "") {
      filteredBooks = books.filter(book => {
        return book.authorId === filterOpt.authorId;
      });
    } else if (filterOpt.category !== "") {
      filteredBooks = books.filter(book => {
        return book.category === filterOpt.category;
      });
    } else if (filterOpt.category === "" && filterOpt.authorId === "") {
      filteredBooks = [...books];
    }
    setFilteredBooks(filteredBooks);
  }

  function handleSave(event) {
    event.preventDefault();
    filterBooks();
  }

  function handleAddBook() {
    setRedirectToAddBookPage(true);
  }

  return (
    <div className="container" style={styles}>
      {redirectToAddBookPage && <Redirect to="/book" />}
      <div className="row">
        <div className="col text-center py-4">
          <h1>Books</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Filter
                authors={authors}
                books={books}
                onChange={handleChange}
                onSave={handleSave}
              />
              <BookList
                onDeleteClick={handleDeleteBook}
                books={filteredBooks}
                onAddClick={handleAddBook}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

BooksPage.propTypes = {
  authors: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    books:
      state.authors.length === 0
        ? []
        : state.books.map(book => {
            return {
              ...book,
              authorName: state.authors.find(a => a.id === book.authorId).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadBooks: bindActionCreators(bookActions.loadBooks, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteBook: bindActionCreators(bookActions.deleteBook, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksPage);
