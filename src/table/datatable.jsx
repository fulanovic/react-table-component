import React, { useEffect, useState } from 'react';
import TableHeader from './assets/table-header';
import TableBody from './assets/table-body';
import Pagination from './assets/pagination';
import { paginate } from './assets/paginate';
import SearchTerm from './assets/search';
import _ from 'lodash';
import Print from './print/print';
import TableFooter from './assets/table-footer';
import './styles.scss';

/*
   Ako za neku kolumnu treba ispis sume vrijednosti onda navodim svojstvo:
   sumColumns=['column.path','column.path',...]
*/

const DataTable = ({
    columns,
    data,
    readonly,
    hideSearch = false,
    searchColumns = [],
    searchLabel = 'Search',
    searchLabelPlaceholder = '',
    searchBackground = true,
    searchNoDataItemPrefix = 'No data for',
    enableRowHover = true,
    markRowOnClick = false,
    markedRowStyle = {},
    onRowClick,
    pageSize = 19,
    btnAdd = null,
    printEnable = false,
    printHeader = '',
    printColumns = null,
    sumColumns = [],
    currency = '€'
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState({ path: '', order: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const tblContainer = document.querySelector('.bf-table-container');
        if (enableRowHover) {
            tblContainer.classList.add('enable-hover');
        }
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const raiseSort = (path) => {
        const sc = { ...sortColumn };
        if (sc.path === path) sc.order = sc.order === 'asc' ? 'desc' : 'asc';
        else {
            sc.path = path;
            sc.order = 'asc';
        }

        setSortColumn(sc);
    };

    data = data.map((d) => {
        const _obj = {
            ...d,
            searchData: ''
        };
        if (!searchColumns) return _obj;
        if (searchColumns.length === 0) return _obj;

        let searchData = '';
        searchColumns.forEach((column) => {
            searchData += `${d[column]} `;
        });

        return {
            ...d,
            searchData
        };
    });
    const filtriraniPodaci = data.filter((c) => {
        return c.searchData
            .toLowerCase()
            .includes(searchTerm.toLocaleLowerCase());
    });

    const filteredData = searchTerm.length > 0 ? filtriraniPodaci : data;

    const sortedData = _.orderBy(
        filteredData,
        [sortColumn.path],
        [sortColumn.order]
    );

    const paginatedData = paginate(sortedData, currentPage, pageSize);
    const noSearchData = paginatedData.length === 0 && searchTerm.length > 0;

    const itemsCount =
        searchTerm.length !== 0 ? filteredData.length : data.length;

    const closePrintDialog = () => {
        console.log('closePrintDialog');
    };

    const printBtn = (
        <Print onClose={closePrintDialog} header={printHeader}>
            <table className='table table-striped table-sm'>
                <TableHeader
                    columns={printColumns ?? columns}
                    onSort={raiseSort}
                    sortColumn={sortColumn}
                />
                <TableBody
                    data={sortedData}
                    columns={printColumns ?? columns}
                    readonly={readonly}
                    onRowClick={onRowClick}
                    markedRowStyle={markedRowStyle}
                    printingData={true}
                />
                {sumColumns.length > 0 && (
                    <TableFooter
                        data={paginatedData}
                        allData={data}
                        columns={columns}
                        sumColumns={sumColumns}
                    />
                )}
            </table>
        </Print>
    );

    return (
        <>
            <div className='bf-table-container'>
                {!hideSearch && data.length > 0 && (
                    <div className={searchBackground ? 'form mb-5' : ''}>
                        <div className='row'>
                            <div className='col-3'>
                                <SearchTerm
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    data={data}
                                    filteredData={filteredData}
                                    setCurrentPage={setCurrentPage}
                                    noSearchDataCondition={noSearchData}
                                    searchNoDataItemPrefix={
                                        searchNoDataItemPrefix
                                    }
                                    label={searchLabel}
                                    placeholder={searchLabelPlaceholder}
                                />
                            </div>
                            <div className='col-9'>
                                <div className='bf-btns-container'>
                                    {printEnable && printBtn}
                                    {btnAdd}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!noSearchData && data.length > 0 && (
                    <>
                        <table className='table table-striped table-sm'>
                            <TableHeader
                                columns={columns}
                                onSort={raiseSort}
                                sortColumn={sortColumn}
                            />
                            <TableBody
                                data={paginatedData}
                                columns={columns}
                                readonly={readonly}
                                onRowClick={onRowClick}
                                markRowOnClick={markRowOnClick}
                                markedRowStyle={markedRowStyle}
                            />
                            {sumColumns.length > 0 && (
                                <TableFooter
                                    data={paginatedData}
                                    allData={data}
                                    columns={columns}
                                    sumColumns={sumColumns}
                                    hidePaginateSum={
                                        filteredData.length <= pageSize &&
                                        searchTerm.length === 0
                                    }
                                    currency={currency}
                                />
                            )}
                        </table>
                        <Pagination
                            onPageChange={handlePageChange}
                            itemsCount={itemsCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default DataTable;
