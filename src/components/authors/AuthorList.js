import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorList = ({ authors, onDeleteClick, onAddClick }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col" />
          <th scope="col">Author Name</th>
          <th scope="col" className="text-right">
            <button
              className="btn btn-outline-success add-author btn-sm"
              onClick={() => onAddClick()}
            >
              Add Author
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author => {
          return (
            <tr key={author.id}>
              <td />
              <td>
                <Link to={"/author/" + author.slug}>{author.name}</Link>
              </td>
              <td className="text-right">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(author)}
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

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired
};

export default AuthorList;