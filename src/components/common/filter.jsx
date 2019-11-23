import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => {
  const { elementList, selectedElement, onClick, textProperty, valueProperty } = props;

  return (
    <ul className="list-group">
      {elementList.map(element => <li style={{ cursor: "pointer" }} key={element[valueProperty]} onClick={() => onClick(element)} className={element[valueProperty] === selectedElement ? "list-group-item active" : "list-group-item"}>{element[textProperty]}</li>)}
    </ul>
  );
};

Filter.propTypes = {
  elementList: PropTypes.array.isRequired,
  selectedElement: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}
export default Filter;