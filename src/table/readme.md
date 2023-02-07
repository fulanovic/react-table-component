# Table component
## Packages
`@fortawesome/fontawesome-svg-core@1.3.0`

`@fortawesome/free-solid-svg-icons@6.0.0`

`@fortawesome/react-fontawesome@0.1.17`

`react-to-print@2.14.4`

`lodash@4.17.21`

`bootstrap@5.1.3`


## Table usage

```jsx
import React, {useEffect, useState} from 'react';
import DataTable from './datatable';
import axios from 'axios';
import AddButton from './assets/btn-add';

function TableUsage(props) {

    const [data, setData] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const { data } = await axios.get(
                'https://jsonplaceholder.typicode.com/albums'
            );
            setData(data);
        };
        loadData();
    }, []);

    const columns = [
        {
            sortable: false,
            label: 'Album title',
            path: 'title',
            width: '30rem'
        },
        {
            sortable: true,
            center: true,
            label: 'Id',
            path: 'id',
            width: '5rem'
        },
        {
            sortable: true,
            label: 'User Id',
            path: 'userId',
            currency: true,
            style: {textAlign: 'right'},
            isDecimal: true,
            width: '5rem'
        },
        {
            key: 'btnEdit',
            style: {textAlign: 'right'},
            content: (item) => (
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleButtonClick(item)}
                >
                    Details
                </button>
            )
        }
    ];
    const handleButtonClick = (item) => {
        console.log(item);
    };

    const handleAddClick = () => {
        console.log('add click...');
    };

    return (
        <DataTable
            pageSize={10}
            columns={columns}
            data={data}
            hideSearch={false}
            markSearchTerm={true}
            searchLabel='Search albums'
            searchLabelPlaceholder='Start typing...'
            searchColumns={['id', 'userId', 'title']}
            searchNoDataItemPrefix='No data for item'
            readonly={false}
            enableRowHover={true}
            onRowClick={(item) => console.log(item)}
            markRowOnClick={false}
            btnAdd={<AddButton onClick={handleAddClick} />}
            printEnable={true}
            printColumns={columns}
            printHeader='Placeholder albums'
            sumColumns={['userId']}
            currency='€'
        />
    );
}

export default TableUsage;
```