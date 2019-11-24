import React, { Component } from 'react';

class TableHeader extends Component {
  raiseSort = propertyName => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.propertyName === propertyName) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    } else {
      sortColumn.propertyName = propertyName;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.propertyName === sortColumn.propertyName) {
      return sortColumn.order === 'asc' ? <i className="fa fa-sort-asc"></i> : <i className="fa fa-sort-desc"></i>;
    }
    return null;
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column =>
            <th
              key={column.key}
              onClick={() => this.raiseSort(column.propertyName)}
            >
              {column.label}{this.renderSortIcon(column)}
            </th>)}
        </tr>
      </thead>
    );
  }
}
export default TableHeader;