import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => {
  const { elementList, selectedElement, onElementSelected, textProperty, valueProperty } = props;
  return (
    <ul className="list-group">
      {elementList.map(element => <li style={{ cursor: "pointer" }} key={element[valueProperty]} onClick={() => onElementSelected(element)} className={element[valueProperty] === selectedElement._id ? "list-group-item active" : "list-group-item"}>{element[textProperty]}</li>)}
    </ul>
  );
};

Filter.propTypes = {
  elementList: PropTypes.array.isRequired,
  selectedElement: PropTypes.object.isRequired,
  onElementSelected: PropTypes.func.isRequired
}

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}
export default Filter;