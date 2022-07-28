import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./book.scss"
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import TimePicker from "../../../../base/TimePicker/TimePicker";

function Book(props) {
    const [sortType, setSortType] = useState();
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const [bookName, setBookName] = useState("");
    const [bookPhone, setBookPhone] = useState("");
    const [bookAdults, setBookAdults] = useState();
    const [bookChild, setBookChild] = useState();
    const [bookDate, setBookDate] = useState();
    const [bookTime, setBookTime] = useState();
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
        }
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
    function onChangeTab() {
        setIsShowPopupAddnew(false)
    }
    return (
        <AdminPage
            title={"Quản lý đặt bàn"}
            index={MENU_TAB_ADMIN.BOOK}
        >
            <div className="book-manager">
                <div className="book-manager__filter">
                    <div className="book-manager__filter-name">
                        <InputField
                            placeholder={"Tên khách hàng"}
                            width={"100%"}
                            label={"Tên khách"}
                        />
                    </div>
                    <div className="book-manager__filter-phone">
                        <InputField
                            placeholder={"Số điện thoại"}
                            width={"100%"}
                            label={"Số điện thoại"}
                        />
                    </div>
                    <div className="book-manager__filter-date">
                        <DatePicker
                            defaultValue={moment().unix()
                                * 1000}
                            min={moment().unix() * 1000 - ONE_DAY}
                            // onChange={(val) => {
                            //     setStaffDate(val);
                            // }}
                            placeholder="dd/MM/yyyy"
                            label={"Ngày đặt bàn"}
                            width={"100%"}
                        />
                    </div>
                    <div className="book-manager__filter-create-new">
                        <Button2
                            name={"Thêm mới đặt bàn"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddnew()}
                        />
                    </div>
                </div>

                <div className="book-manager__content">
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
                    title={"Thêm mới đặt bàn"}
                    show={isShowPopupAddnew}
                    onClickClose={() => onChangeTab()}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() => onChangeTab()}
                        />,
                        <Button2
                            name={"Lưu"}
                            onClick={() => onChangeTab()}
                            background="#fa983a"
                        />,
                    ]}
                    width={600}
                    //className={"staff-manager-create"}
                    body={
                        <div className="book-manager__popup">
                            <Input
                                label={"Tên khách hàng"}
                                defaultValue={bookName}
                                onChange={(val) => {
                                    setBookName(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Số điện thoại"}
                                defaultValue={bookPhone}
                                onChange={(val) => { setBookPhone(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Số lượng người lớn"}
                                defaultValue={bookAdults}
                                onChange={(val) => {
                                    setBookAdults(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Số lượng trẻ em"}
                                defaultValue={bookChild}
                                onChange={(val) => { setBookChild(val) }}
                                autoFocus
                            />
                            <DatePicker
                                defaultValue={moment().unix()
                                    * 1000}
                                min={moment().unix() * 1000 - ONE_DAY}
                                // onChange={(val) => {
                                //     setStaffDate(val);
                                // }}
                                placeholder="dd/MM/yyyy"
                                label={"Ngày đặt bàn"}
                                width={"100%"}
                            />
                            <TimePicker
                                placeholder="dd/MM/yyyy"
                                label={"Giờ"}
                                defaultValue={bookTime}
                                onChange={(val) => {
                                    setBookTime(val);
                                }}
                            />
                        </div>
                    }
                />
            </div>
        </AdminPage>

    )

}
export default Book