import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import icon from "./goodreads_icon_16x16-fc141070fc3ea1a7cd145a4af570ec14.png";

const BookList = ({ books, onDeleteClick, onAddClick }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col" />
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Category</th>
          <th scope="col" className="text-right">
            <button
              className="btn btn-outline-success add-author btn-sm"
              onClick={() => onAddClick()}
            >
              Add Book
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => {
          return (
            <tr key={book.id}>
              <td className="text-center">
                <a className="" href={book.url}>
                  <img src={icon} alt="" />
                </a>
              </td>
              <td>
                <Link to={"/book/" + book.slug}>{book.title}</Link>
              </td>
              <td>{book.authorName}</td>
              <td>{book.category}</td>
              <td className="text-right">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(book)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
};

export default BookList;
