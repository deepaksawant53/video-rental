import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';


const Table = props => {
  const { data, columns, sortColumn, onSort, keyPropertyForBody } = props;

  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort} />

      <TableBody
        data={data}
        columns={columns}
        keyPropertyForBody={keyPropertyForBody} />
    </table>
  );
};
export default Table;