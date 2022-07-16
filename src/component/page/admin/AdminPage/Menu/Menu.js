import React  from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";

function Menu(props) {

    const COLUMN_TABLE_INDEX_MENU={
        NAME: 'NAME',
        AGE: 'AGE',
        ADDRESS: 'ADDRESS'
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            sorter: (a, b) => a.name - b.name,
            defaultSortOrder: 'descend',
            width: '200px',
        },
        {
            title: 'Age',
            dataIndex: COLUMN_TABLE_INDEX_MENU.AGE,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: COLUMN_TABLE_INDEX_MENU.ADDRESS,
        },
    ];

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

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item)=>{
            
        })
    }

    return (
        <AdminPage 
            title={"Quản lý menu"}
            index={MENU_TAB_ADMIN.MENU}
        >
            <TableBase
                // onChangePagination={(page, pageSize)=>{}}
                columns={columns}
                total={90}
                data={convertDataTable(data)}
                loading={false}
            />
        </AdminPage>

    )

}
export default Menu