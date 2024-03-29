import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminPage from "../AdminPage";
import "./turnover.scss"

function Turnover(props) {

    const [sortType, setSortType] = useState();
    const COLUMN_TABLE_INDEX_MENU = {
        NAME: "name",
        AGE: "age",
        ADDRESS: "address",
    };

    const columns = [
        {
            title: "Name",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            sorter: true,
            width: "300px",
        },
        {
            title: "Age",
            dataIndex: COLUMN_TABLE_INDEX_MENU.AGE,
            defaultSortOrder: SORT_TYPE.DESC,
            sorter: true,
            width: "300px",
        },
        {
            title: "Address",
            dataIndex: COLUMN_TABLE_INDEX_MENU.ADDRESS,
            width: "300px",
        },
    ];

    const data = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
        },
        {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
        },
        {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
        },
        {
            key: "4",
            name: "Jim Red",
            age: 32,
            address: "London No. 2 Lake Park",
        },
    ];

    const OPTION_MORE_TABLE = [
        {
            title: "Thêm",
            onSelect: () => alert("thêm"),
        },
        {
            title: "Sửa",
            onSelect: () => {
                alert("Sửa");
            },
        },
        {
            title: "Xóa",
            onSelect: () => {
                alert("Xóa");
            },
        },
    ];

    const getQuyen = JSON.parse(localStorage.getItem("quyen"))

    function columnName(item) {
        return <div>{item?.name}</div>;
    }
    function columnAge(item) {
        return <div>{item?.age}</div>;
    }
    function columnAddress(item) {
        return <div>{item?.address}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.AGE]: columnAge(item),
                [COLUMN_TABLE_INDEX_MENU.ADDRESS]: columnAddress(item),
                key: idx,
            };
        });
        return [...listData];
    }

    function handleClickAddnew(type) {
        // setIsShowPopupAddnew(true);
    }
    return (
        <AdminPage
            title={"Quản lý doanh thu"}
            index={MENU_TAB_ADMIN.TURNOVER}
        >
            <div className="turnover-manager">
                <div className="turnover-manager__filter">
                    <div className="turnover-manager__filter-search">
                        <InputField placeholder={"Tìm kiếm theo từ khóa"} width={400} />
                    </div>
                    <div className="turnover-manager__filter-create-new">
                        <Button2
                            name={"Thêm mới doanh thu"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddnew()}
                        />
                    </div>
                </div>
                <div className="turnover-manager__content">
                    <TableBase
                        // onChangePagination={(page, pageSize)=>{}}
                        columns={columns}
                        total={90}
                        data={convertDataTable(data)}
                        loading={false}
                        hasMoreOption
                        option={OPTION_MORE_TABLE}
                        setObjectSort={(field, order) => {
                            setSortType({
                                field: field,
                                order: order,
                            });
                        }}
                    />
                </div>
            </div>
        </AdminPage>

    )

}
export default Turnover