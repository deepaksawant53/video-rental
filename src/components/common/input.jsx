import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control"
      />
      {/* If error is truthy then only the element will be rendered else if error is falsy element wont be rendered. */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;