import React from 'react';
import AnimatedTR from './animated-tr';
import { getFormatedValue } from './table-service';

const TableFooter = ({
    data,
    allData,
    columns,
    sumColumns,
    hidePaginateSum,
    currency
}) => {
    const getMinSumColumnsIndex = () => {
        const getColumnIndex = (column) => {
            for (let i = 0; i < columns.length; i++) {
                if (columns[i].path === column) return i;
            }
        };

        const sumColumnsIndices = [];
        sumColumns.forEach((c) => {
            sumColumnsIndices.push(getColumnIndex(c));
        });
        return Math.min(...sumColumnsIndices);
    };

    const getPaginatedColumnSum = (column, isDecimal) => {
        let sum = 0;
        data.forEach((d) => (sum += d[column]));
        return isDecimal ? getFormatedValue(sum) : sum;
    };

    const getColumnSum = (column, isDecimal) => {
        let sum = 0;
        allData.forEach((d) => (sum += d[column]));
        return isDecimal ? getFormatedValue(sum) : sum;
    };

    const getTableRow = (label, sumFn, index) => (
        <AnimatedTR
            key={`tr_${data.length}_${columns.length}_${index}`}
            index={index}
            // className='border-bottom'
        >
            <td
                colSpan={getMinSumColumnsIndex()}
                style={{ textAlign: 'right' }}
            >
                {label}
            </td>
            {columns.map((column, index) => {
                //preskoči sve kolumne do prve čiju sumu treba ispisat
                if (index < getMinSumColumnsIndex()) return;
                if (sumColumns.includes(column.path))
                    return (
                        <td
                            className='align-middle'
                            key={`tfoot_${column.path}`}
                        >
                            {column.currency
                                ? `${sumFn(
                                      column.path,
                                      column.isDecimal
                                  )} ${currency}`
                                : `${sumFn(column.path, column.isDecimal)}`}
                        </td>
                    );
                else return <td key={`tfoot_${column.path}`}></td>;
            })}
        </AnimatedTR>
    );

    return (
        <tfoot>
            {!hidePaginateSum &&
                getTableRow(
                    'The sum of the current display',
                    getPaginatedColumnSum,
                    1
                )}
            {getTableRow('The sum of all data', getColumnSum, 2)}
        </tfoot>
    );
};

export default TableFooter;
