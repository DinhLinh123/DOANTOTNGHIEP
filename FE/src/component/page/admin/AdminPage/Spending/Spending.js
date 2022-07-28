import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./spending.scss"
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";

function Spending(props) {

    const [sortType, setSortType] = useState();
    const [itemName, setItemName] = useState("");
    const [itemAmount, setItemAmount] = useState("");
    const [itemUnitprice, setItemUnitprice] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [itemNote, setItemNote] = useState("");
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const COLUMN_TABLE_INDEX_MENU = {
        NAME: "name",
        AMOUNT: "amount",
        UNITPRICE: "unitprice",
        UNITPRICE: "unitprice",
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

    function handleClickAddnew(type) {
        setIsShowPopupAddnew(true);
    }
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
        setIsShowPopupAddnew(true);
    }

    return (

        <AdminPage
            title={"Quản lý chi tiêu"}
            index={MENU_TAB_ADMIN.SPENDING}
        >
            <div className="spending-manager">
                <div className="spending-manager__filter">
                    <div className="spending-manager__filter-search">
                        <InputField placeholder={"Tìm kiếm theo từ khóa"} width={400} />
                    </div>
                    <div className="spending-manager__filter-create-new">
                        <Button2
                            name={"Thêm mới chi tiêu"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddnew()}
                        />
                    </div>
                </div>
                <div className="spending-manager__content">
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
                <Popup
                    title={"Thêm mới Chi tiêu"}
                    show={isShowPopupAddnew}
                    onClickClose={() => setIsShowPopupAddnew(false)}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() => setIsShowPopupAddnew(false)}
                        />,
                        <Button2
                            name={"Lưu"}
                            onClick={() => setIsShowPopupAddnew(false)}
                            background="#fa983a"
                        />,
                    ]}
                    width={600}
                    className={"menu-popup-create"}
                    body={
                        <div className="menu-manager__popup">
                            <Input
                                label={"Tên mặt hàng"}
                                defaultValue={itemName}
                                onChange={(val) => {
                                    setItemName(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Số lượng"}
                                defaultValue={itemAmount}
                                onChange={(val) => { setItemAmount(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Đơn giá"}
                                defaultValue={itemUnitprice}
                                onChange={(val) => { setItemUnitprice(val) }}
                                autoFocus
                            />
                            <div className="menu-manager__popup-content_privateDish_status">Ảnh</div>
                            <div>
                                <ImageUpload maxImage={1} images={itemImage} setImages={(val) => { setItemImage(val) }} />
                            </div>
                            <Input
                                label={"Ghi chú"}
                                defaultValue={itemNote}
                                onChange={(val) => { setItemNote(val) }}
                                autoFocus
                            />
                        </div>
                    }
                />
            </div>
        </AdminPage>

    )

}
export default Spending