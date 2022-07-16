import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';
import "./table.scss"

TableBase.propTypes = {
    total: PropTypes.number,
    loading: PropTypes.bool,
    onChangePagination: PropTypes.func,
    columns: PropTypes.array,
    data: PropTypes.array
}

TableBase.defaultProps = {
    total: 0,
    loading: false,
    onChangePagination: ()=>{},
    columns: [],
    // data: []
}

function TableBase(props) {

    const { total, loading, onChangePagination, columns, data } = props;
    
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
                />
            </div>
            <div className='table-container__paging'>
                <Pagination
                    total={total}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={20}
                    defaultCurrent={1}
                    onChange={(page, pageSize)=>{onChangePagination(page, pageSize)}}
                />
            </div>
        </div>)

}

export default TableBase