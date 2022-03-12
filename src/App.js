import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './table/datatable';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
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
            style: { textAlign: 'right' },
            isDecimal: true,
            width: '5rem'
        },
        {
            key: 'btnEdit',
            style: { textAlign: 'right' },
            content: (item) => (
                <button
                    className='btn btn-sm btn-primary'
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

    return (
        <div className='App container'>
            <DataTable
                pageSize={10}
                columns={columns}
                data={data}
                hideSearch={false}
                searchLabel='Search albums'
                searchLabelPlaceholder='Start typing...'
                searchColumns={['id', 'userId', 'title']}
                readonly={false}
                onRowClick={(item) => console.log(item)}
                markRowOnClick={false}
                printEnable={true}
                printColumns={columns}
                printHeader='Placeholder albums'
                sumColumns={['userId']}
                currency='€'
            />
        </div>
    );
}

export default App;
