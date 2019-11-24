import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.jsxContent) return column.jsxContent(item);

    return _.get(item, column.propertyName);
  }

  render() {
    const { data, columns, keyProperty } = this.props;

    return (
      <tbody>
        {data.map(item =>
          <tr key={_.get(item, keyProperty.name)}>
            {columns.map(column =>
              <td key={column.key}>{this.renderCell(item, column)}</td>
            )}
          </tr>)}
      </tbody>
    );
  }
}
export default TableBody;