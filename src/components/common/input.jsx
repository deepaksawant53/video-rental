import React from 'react';

const Input = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label
        htmlFor={name}>
        {label}
      </label>
      <input
        name={name}
        onChange={onChange}
        value={value}
        id={name}
        type="text"
        className="form-control"
      />
      {/* If error is truthy then only the element will be rendered else if error is falsy element wont be rendered. */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;