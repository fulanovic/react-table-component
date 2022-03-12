import React from 'react';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableHeader = ({ columns, sortColumn, onSort }) => {
    const renderSortIcon = (column) => {
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc')
            return <FontAwesomeIcon icon={faSortUp} />;
        return <FontAwesomeIcon icon={faSortDown} />;
    };

    const handleColumnClick = (column) => {
        onSort(column.path);
    };

    return (
        <thead className='table-header-light'>
            <tr>
                {columns.map((column) => (
                    <th
                        {...(column.sortable
                            ? { onClick: () => handleColumnClick(column) }
                            : {})}
                        key={column.path || column.key}
                        style={{
                            cursor: column.sortable ? 'pointer' : 'not-allowed',
                            width: column.width ? column.width : 'auto',
                            textAlign: column.center ? 'center' : 'left',
                            ...(column.style ? column.style : {})
                        }}
                    >
                        {column.label} {renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
