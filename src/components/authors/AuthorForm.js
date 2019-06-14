import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import styles from "../common/BgText-styles";

const AuthorForm = ({
  author,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <div className="container py-4" style={styles}>
      <form onSubmit={onSave}>
        <h1 className="py-3">{author.id ? "Edit" : "Add"} Author</h1>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}

        <TextInput
          name="name"
          label="Name"
          value={author.name}
          onChange={onChange}
          error={errors.name}
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

AuthorForm.propTypes = {
  author: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default AuthorForm;
