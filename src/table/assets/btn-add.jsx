import React from 'react';
const AddButton = ({ onClick }) => {
    return (
        <button className='btn btn-sm btn-success' onClick={onClick}>
            Add new item
        </button>
    );
};

export default AddButton;
