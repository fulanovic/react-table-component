import React, { useState } from 'react';
import AnimatedTR from './animated-tr';
import { getFormatedValue, getHighlightedText } from './table-service';

const TableBody = ({
   data,
   columns,
   readonly = false,
   searchTerm = '',
   onRowClick,
   printingData,
   markSearchTerm,
   markRowOnClick,
   markedRowStyle
}) => {
   const [rowIndex, setRowIndex] = useState(null);

   const renderCellValue = (item, column) => {
      if (column.content) return column.content(item);
      let value;
      if (markSearchTerm && typeof item[column.path] === 'string')
         value = getHighlightedText(item[column.path], searchTerm);
      else value = item[column.path];

      return column.isDecimal ? getFormatedValue(value) : value;
   };

   const getKey = (item, column) => `${item.Id}_${column.path || column.key}`;

   return (
      <tbody className='tbody-light'>
         {data.map((item, index) => (
            <AnimatedTR
               key={`tr_${data.length}_${columns.length}_${index}`}
               index={index}
               onRowClick={() => setRowIndex(index)}
               markRowOnClick={
                  markRowOnClick && index === rowIndex ? true : false
               }
               markedRowStyle={markedRowStyle}
               className='light'
               printingData={printingData}
               // style={{ backgroundColor: index % 2 === 0 ? '#ccc' : '#fff' }}
            >
               {columns.map((column) => (
                  <td
                     key={getKey(item, column)}
                     style={{
                        width: column.width ? column.width : 'auto',
                        textAlign: column.center ? 'center' : 'left',
                        cursor: readonly ? 'default' : 'hand',
                        ...(column.style ? column.style : {})
                     }}
                     className='align-middle'
                     onClick={() => {
                        if (!readonly && onRowClick) onRowClick(item);
                     }}
                  >
                     {renderCellValue(item, column)}
                  </td>
               ))}
            </AnimatedTR>
         ))}
      </tbody>
   );
};

export default TableBody;
