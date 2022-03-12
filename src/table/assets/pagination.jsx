import React from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
   const pagesCount = Math.ceil(itemsCount / pageSize);

   if (pagesCount === 1) return null;

   const pages = _.range(1, pagesCount + 1);

   return (
      <ul
         className='pagination pagination-sm'
         style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
         {pages.map((page) => (
            <li
               className={
                  currentPage === page ? 'page-item active' : 'page-item'
               }
               key={uuid()}
            >
               {page <= 20 && (
                  <button
                     className='page-link'
                     type='button'
                     onClick={() => {
                        onPageChange(page);
                     }}
                  >
                     {page === 20 ? '+' : page}
                  </button>
               )}
            </li>
         ))}
      </ul>
   );
};

export default Pagination;
