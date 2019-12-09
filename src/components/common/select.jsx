import React from 'react';

const Select = ({ onChange, selectedOption, name, label, options, keyProperty, valueProperty, optionProperty, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="custom-select"
        name={name}
        defaultValue={selectedOption}
        onChange={onChange}>
        {!selectedOption && <option></option>}
        {options.map(option =>
          <option
            key={option[keyProperty]}
            value={option[optionProperty]}
            selected={selectedOption === option[optionProperty] ? true : false}
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