import React from 'react';

const SearchBox = ({ name, value, onChange }) => {
  return (
    <input
      name={name}
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      type="text"
      placeholder="Search..."
      className="form-control my-3"
    />
  );
};
export default SearchBox;