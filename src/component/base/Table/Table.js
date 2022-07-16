import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';

TableBase.propTypes = {
    total: PropTypes.number,
    loading: PropTypes.bool
}

TableBase.defaultProps = {
    total: 85,
    loading: false
}

function TableBase(props) {

    const { total, loading } = props

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name - b.name,
            defaultSortOrder: 'descend',
            width: '200px',
            render: ()=> (<div>hjkhjsadhjkasdhjk</div>)

        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    const onChange = (pagination, filters, sorter) => {
        // debugger
        console.log('params', pagination, filters, sorter);
      };

    return (
        <div className='table-container'>
            <div className='table-container__table'>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={{ ...rowSelection }}
                    pagination={false}
                    scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                    onChange={onChange}
                    loading={loading}
                    s
                />
            </div>
            <div className='table-container__paging'>
                <Pagination
                    total={total}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={20}
                    defaultCurrent={1}
                    onChange={(val, _val)=>{debugger}}
                />
            </div>
        </div>)

}

export default TableBase