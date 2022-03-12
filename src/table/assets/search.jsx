import React from 'react';
import Input from './input';

const SearchTerm = ({
    searchTerm,
    setSearchTerm,
    data,
    filteredData,
    setCurrentPage,
    noSearchDataCondition,
    label = 'Search',
    placeholder = 'Start typing search term'
}) => {
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
                name='search'
                onChange={({ target: input }) => {
                    const searchTerm = input.value;
                    setCurrentPage(1);
                    setSearchTerm(searchTerm);
                }}
                placeholder={placeholder}
            />
            {noSearchDataCondition && (
                <div className='mb-5'>
                    No data for the search term{' '}
                    <span style={{ fontWeight: 700 }}>{`${searchTerm}`}</span>
                </div>
            )}
        </div>
    );
};

export default SearchTerm;
