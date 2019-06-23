import React from "react";
import PropTypes from "prop-types";
import SelectInput from "./SelectInput";

const Filter = ({ books, authors, onSave, onChange, errors = {} }) => {
  return (
    <div className="py-1">
      <button
        className="btn btn-light btn-sm"
        type="button"
        data-toggle="collapse"
        data-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Filter options
      </button>

      <div className="collapse" id="collapseExample">
        <div
          className="card card-body"
          style={{ backgroundColor: "#f0f8ffab" }}
        >
          <form onSubmit={onSave}>
            <div className="form-row">
              {errors.onSave && (
                <div className="alert alert-danger" role="alert">
                  {errors.onSave}
                </div>
              )}
            </div>
            <div className="form-row align-items-center justify-content-center">
              <div className="col-md-4 mb-3">
                <SelectInput
                  name="authorId"
                  label="Author"
                  defaultOption="Select Author"
                  options={authors.map(author => ({
                    value: author.id,
                    text: author.name
                  }))}
                  onChange={onChange}
                  error={errors.author}
                />
              </div>
              <div className="col-md-4 mb-3">
                <SelectInput
                  name="category"
                  label="Category"
                  defaultOption="Select Category"
                  options={[
                    ...new Set(books.map(book => book.category).sort())
                  ].map(category => ({
                    value: category,
                    text: category
                  }))}
                  onChange={onChange}
                  error={errors.author}
                />
              </div>
              <div className="col-md-1" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  authors: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default Filter;
