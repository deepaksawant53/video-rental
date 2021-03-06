import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.jsxContent) return column.jsxContent(item);

    return _.get(item, column.propertyName);
  }

  createKey = (item, column) => {
    return _.get(item, this.props.keyPropertyForBody.name) + column.key;
  }

  render() {
    const { data, columns, keyPropertyForBody } = this.props;

    return (
      <tbody>
        {data.map(item =>
          <tr key={_.get(item, keyPropertyForBody.name)}>
            {columns.map(column =>
              <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
            )}
          </tr>)}
      </tbody>
    );
  }
}
export default TableBody;