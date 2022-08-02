import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./barList.scss"
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import TimePicker from "../../../../base/TimePicker/TimePicker";

function BarList(props) {
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
        PHONE: "phone",
        ADULTS: "adults",
        CHILD: "child",
        DATE: "date",
        TIME: "time",
        PEOPLE: "people",
    };

    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            width: "250px",
        },
        {
            title: "Số điện thoại",
            dataIndex: COLUMN_TABLE_INDEX_MENU.PHONE,
            width: "200px",
        },
        {
            title: "SL người lớn",
            dataIndex: COLUMN_TABLE_INDEX_MENU.ADULTS,
            width: "100px",
        },
        {
            title: "SL trẻ em",
            dataIndex: COLUMN_TABLE_INDEX_MENU.CHILD,
            width: "100px",
        },
        {
            title: "Ngày checkin",
            dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
            sorter: true,
            width: "200px",
        },
        {
            title: "Giờ checkin",
            dataIndex: COLUMN_TABLE_INDEX_MENU.TIME,
            sorter: true,
            width: "100px",
        },
        {
            title: "Người nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.PEOPLE,
            width: "150px",
        },
    ];

    const data = [
        {
            key: "1",
            name: "chị Linh",
            phone: "0358100337",
            adults: 5,
            child: 1,
            date: "28/07/2022",
            time: "20:00",
            people: "LinhDTT",
        },
        {
            key: "2",
            name: "chị Linh",
            phone: "0358100337",
            adults: 5,
            child: 1,
            date: "28/07/2022",
            time: "20:00",
            people: "LinhDTT",
        },
        {
            key: "3",
            name: "chị Linh",
            phone: "0358100337",
            adults: 5,
            child: 1,
            date: "28/07/2022",
            time: "20:00",
            people: "Website",
        },
        {
            key: "4",
            name: "chị Linh",
            phone: "0358100337",
            adults: 5,
            child: 1,
            date: "28/07/2022",
            time: "20:00",
            people: "LinhDTT",
        }
    ];

    const OPTION_MORE_TABLE = [
        {
            title: "Xếp bàn",
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
    function columnPhone(item) {
        return <div>{item?.phone}</div>;
    }
    function columnAdults(item) {
        return <div>{item?.adults}</div>;
    }
    function columnChild(item) {
        return <div>{item?.child}</div>;
    }
    function columnDate(item) {
        return <div>{item?.date}</div>;
    }
    function columnTime(item) {
        return <div>{item?.time}</div>;
    }
    function columnPeople(item) {
        return <div>{item?.people}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.PHONE]: columnPhone(item),
                [COLUMN_TABLE_INDEX_MENU.ADULTS]: columnAdults(item),
                [COLUMN_TABLE_INDEX_MENU.CHILD]: columnChild(item),
                [COLUMN_TABLE_INDEX_MENU.DATE]: columnDate(item),
                [COLUMN_TABLE_INDEX_MENU.TIME]: columnTime(item),
                [COLUMN_TABLE_INDEX_MENU.PEOPLE]: columnPeople(item),
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
            title={"Danh sách mặt hàng sắp hết"}
            index={MENU_TAB_ADMIN.BAR}
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
                                onChange={(val) => {
                                    setBookDate(val);
                                }}
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
export default BarList