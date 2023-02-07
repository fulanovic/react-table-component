import React from 'react';
import Input from './input';

const SearchTerm = ({
   searchTerm,
   setSearchTerm,
   data,
   filteredData,
   setCurrentPage,
   noSearchDataCondition,
   searchNoDataItemPrefix,
   label = 'Search',
   placeholder = 'Start typing search term'
}) => {
   const debounce = (callback, delay = 0) => {
      let timeout;
      return (...args) => {
         clearTimeout(timeout);
         timeout = setTimeout(() => {
            callback(...args);
         }, delay);
      };
   };

   const updateStateDebounce = debounce((searchTerm) => {
      setCurrentPage(1);
      setSearchTerm(searchTerm);
   });

   const handleOnChange = ({ target: input }) => {
      const searchTerm = input.value;
      updateStateDebounce(searchTerm);
   };

   return (
      <div className='search-term'>
         <Input
            label={`${label} ${
               searchTerm.length !== 0
                  ? filteredData.length > 0
                     ? `- ${filteredData.length}/${data.length}`
                     : ''
                  : ''
            }`}
            name='search-term'
            onChange={handleOnChange}
            placeholder={placeholder}
         />
         {noSearchDataCondition && (
            <div className='mb-5'>
               {`${searchNoDataItemPrefix} `}
               <span style={{ fontWeight: 700 }}>{`${searchTerm}`}</span>
            </div>
         )}
      </div>
   );
};

export default SearchTerm;
