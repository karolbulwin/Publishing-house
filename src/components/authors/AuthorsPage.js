import React from "react";
import { connect } from "react-redux";
import * as bookActions from "../../redux/actions/bookActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorList from "./AuthorList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class AuthorsPage extends React.Component {
  state = {
    redirectToAddAuthorPage: false
  };

  componentDidMount() {
    const { books, authors, actions } = this.props;

    if (books.length === 0) {
      actions.loadBooks().catch(error => {
        alert("Loading books failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }

  checkAuthorHaveBooks = author => {
    const { books } = this.props;
    const authorBooks = books.filter(book => {
      return book.authorId === author.id;
    });
    return authorBooks.length > 0
      ? { pass: true, nrOfBooks: authorBooks.length }
      : { pass: false, nrOfBooks: 0 };
  };

  handleDeleteAuthor = async author => {
    const { pass, nrOfBooks } = await this.checkAuthorHaveBooks(author);

    if (pass === false) {
      toast.success("Author deleted");
      try {
        await this.props.actions.deleteAuthor(author);
      } catch (error) {
        toast.error("Delete failed. " + error.message, { autoClose: false });
      }
    } else {
      toast.error(
        `${author.name} has ${nrOfBooks} ${
          nrOfBooks === 1 ? "book" : "books"
        }.`,
        { autoClose: false }
      );
    }
  };

  handleAddAuthor = () => {
    this.setState({ redirectToAddAuthorPage: true });
  };

  render() {
    return (
      <div className="container">
        {this.state.redirectToAddAuthorPage && <Redirect to="/author" />}
        <div className="row">
          <div className="col text-center py-4">
            <h1>Authors</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.props.loading ? (
              <Spinner />
            ) : (
              <AuthorList
                onDeleteClick={this.handleDeleteAuthor}
                authors={this.props.authors}
                onAddClick={this.handleAddAuthor}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

AuthorsPage.propTypes = {
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
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
