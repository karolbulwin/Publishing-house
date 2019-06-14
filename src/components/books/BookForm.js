import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import styles from "../common/BgText-styles";

const BookForm = ({
  book,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <div className="container py-4" style={styles}>
      <form onSubmit={onSave}>
        <h1 className="py-3">{book.id ? "Edit" : "Add"} Book</h1>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInput
          name="title"
          label="Title"
          value={book.title}
          onChange={onChange}
          error={errors.title}
        />

        <SelectInput
          name="authorId"
          label="Author"
          value={book.authorId || ""}
          defaultOption="Select Author"
          options={authors.map(author => ({
            value: author.id,
            text: author.name
          }))}
          onChange={onChange}
          error={errors.author}
        />

        <TextInput
          name="category"
          label="Category"
          value={book.category}
          onChange={onChange}
          error={errors.category}
        />

        <button
          type="submit"
          disabled={saving}
          className="btn btn-outline-dark btn-lg"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  authors: PropTypes.array.isRequired,
  book: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default BookForm;
