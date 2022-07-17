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
            width: '300px',
        },
        {
            title: 'Age',
            dataIndex: COLUMN_TABLE_INDEX_MENU.AGE,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
            width: '800px',
        },
        {
            title: 'Address',
            dataIndex: COLUMN_TABLE_INDEX_MENU.ADDRESS,
            width: '800px',
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

    const OPTION_MORE_TABLE=[
        {
            title: "Thêm",
            onclick:()=> alert("thêm")
        },
        {
            title: "Sửa",
            onclick:()=>{
                alert("Sửa")
            }
        },
        {
            title: "Xóa",
            onclick:()=>{
                alert("Xóa")
            }
        }
    ]

    function columnName(item) {
        return(
            <div>
                {item?.name}
            </div>
        )
    }
    function columnAge(item) {
        return(
            <div>
                {item?.age}
            </div>
        )
    }
    function columnAddress(item) {
        return(
            <div>
                {item?.address}
            </div>
        )
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx)=>{
            return{
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.AGE]: columnAge(item),
                [COLUMN_TABLE_INDEX_MENU.ADDRESS]: columnAddress(item),
                key: idx
            }
        });
        return[...listData]
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
                hasMoreOption
                option={OPTION_MORE_TABLE}
            />
        </AdminPage>

    )

}
export default Menu