import React from 'react';

const Select = ({ onChange, selectedOption, options, keyProperty, valueProperty, error }) => {
  return (
    <div className="form-group">
      <select
        className="custom-select"
        defaultValue={selectedOption}
        onChange={onChange}>
        {!selectedOption && <option></option>}
        {options.map(option =>
          <option
            key={option[keyProperty]}
            value={option[valueProperty]}
          >
            {option[valueProperty]}
          </option>
        )}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div >
  );
};
export default Select;