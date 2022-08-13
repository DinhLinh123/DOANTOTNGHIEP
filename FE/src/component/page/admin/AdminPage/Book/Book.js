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
import { useEffect } from "react";
import { deleteBooking, getBooking, postBooking, updateBooking } from "../../../../../reudux/action/bookingActions";
import { useDispatch, useSelector } from "react-redux";

function Book(props) {
    const [idBooking, setIdBooking]= useState()
    const [sortType, setSortType] = useState();
    const [status, setStatus] = useState("ADD")
    console.log("sortType", sortType);
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const [bookName, setBookName] = useState("");
    const [bookPhone, setBookPhone] = useState("");
    const [bookNote, setBookNote] = useState("");
    const [bookAdults, setBookAdults] = useState();
    const [bookChild, setBookChild] = useState();
    const [bookDate, setBookDate] = useState();
    const [bookTime, setBookTime] = useState();
    console.log("bookName", bookName, bookPhone);
    const COLUMN_TABLE_INDEX_MENU = {
        NAME: "name",
        PHONE: "phone",
        ADULTS: "adults",
        CHILD: "child",
        DATE: "date",
        NOTE: "note",
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
            title: "Ghi chú",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
            sorter: true,
            width: "200px",
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
            note: "buffet",
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
            note: "buffet",
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
            note: "buffet",
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
            note: "buffet",
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
            onSelect: (item) => {
                setIsShowPopupAddnew(true);
                setIdBooking(item.name.props.children[1].props.children)
                setBookName(item?.name?.props?.children[0])
                setBookPhone(item?.phone?.props?.children)
                setBookAdults(item?.adults?.props?.children)
                setBookChild(item?.child?.props?.children)
                setBookDate(item?.date?.props?.children)
                setBookTime(item?.time?.props?.children)
                setBookNote(item?.note?.props?.children)
                console.log("dataaa", item);
                setStatus("UPDATE")
            },
        },
        {
            title: "Xóa",
            onSelect: (item) => {
               
                const id = item.name.props.children[1].props.children
                dispatch(deleteBooking(id));
            },
        },
    ];

    const {dataBooking} = useSelector(state=> state.bookingReducer)
    console.log("dataBooking", dataBooking);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooking())
    },[dispatch])

    function columnName(item) {
        return <div>
                    {item?.khachHang?.name || item?.tenKhachHang}
                    <div className="hidden-id">
                         {item.id}
                    </div>
                </div>;
    }
    function columnPhone(item) {
        return <div>{item?.khachHang?.soDienThoai}</div>;
    }
    function columnAdults(item) {
        return <div>{item?.soNguoiLon}</div>;
    }
    function columnChild(item) {
        return <div>{item?.soTreEm}</div>;
    }
    function columnDate(item) {
        return <div>{moment(item?.thoiGian).format("DD-MM-YYYY")}</div>;
    }
    function columnTime(item) {
        return <div>{moment(item?.gioDen).format("hh:mm")}</div>;
    }
    function columnNote(item) {
        return <div>{item?.ghiChu}</div>;
    }
    function columnPeople(item) {
        return <div>{item?.createdByUserName}</div>;
    }

   
    function convertDataTable(dataTable) {
        let listData;
        console.log("listData", dataTable);
        listData = dataTable?.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.PHONE]: columnPhone(item),
                [COLUMN_TABLE_INDEX_MENU.ADULTS]: columnAdults(item),
                [COLUMN_TABLE_INDEX_MENU.CHILD]: columnChild(item),
                [COLUMN_TABLE_INDEX_MENU.DATE]: columnDate(item),
                [COLUMN_TABLE_INDEX_MENU.TIME]: columnTime(item),
                [COLUMN_TABLE_INDEX_MENU.NOTE]: columnNote(item),
                [COLUMN_TABLE_INDEX_MENU.PEOPLE]: columnPeople(item),
                key: idx,
            };
        });
        return [...listData];
    }

    function handleClickAddnew(type) {
        setIsShowPopupAddnew(true);
        setStatus("ADD")
    }
    function onChangeTab() {

        setIsShowPopupAddnew(false)
        const date = new Date();
        const body = {
            tenKhachHang: bookName,
            soDienThoai:bookPhone,
            soNguoiLon: bookAdults,
            soTreEm : bookChild,
            thoiGian: date.toISOString(bookDate),
            gioDen:  date.toISOString(bookTime),
            ghiChu: bookNote
          }
          if(status === "ADD"){
            dispatch(postBooking(body))
            console.log("thêm mới");

          }
          else if(status === "UPDATE"){
            const id = idBooking
            console.log("update");
            dispatch(updateBooking({
                id,
                body
            }))
          }
         setBookName('')
         setBookPhone('')
         setBookAdults('')
         setBookChild('')
         setBookNote('')
    }

    const closeTab = () => {
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
                            label={"Ngày checkin"}
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
                        data={convertDataTable(dataBooking)}
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
                    onClickClose={() => closeTab()}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() => closeTab()}
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
                                value={bookName}
                                onChange={(val) => {
                                    setBookName(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Số điện thoại"}
                                value={bookPhone}
                                onChange={(val) => { setBookPhone(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Số lượng người lớn"}
                                value={bookAdults}
                                onChange={(val) => {
                                    setBookAdults(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Số lượng trẻ em"}
                                value={bookChild}
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
                            <Input
                                label={"Ghi chú"}
                                value={bookNote}
                                onChange={(val) => { setBookNote(val) }}
                                autoFocus
                            />
                        </div>
                    }
                />
            </div>
        </AdminPage>

    )

}
export default Book