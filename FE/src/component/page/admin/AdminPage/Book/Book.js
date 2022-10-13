import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  ONE_DAY,
  SORT_TYPE,
  TYPE_MESSAGE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./book.scss";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import TimePicker from "../../../../base/TimePicker/TimePicker";
import Dropdown from "../../../../base/Dropdown/Dropdown";
import { useEffect } from "react";
import {
  deleteBooking,
  editTable,
  getBooking,
  getTable,
  postBooking,
  searchBooking,
  updateBooking,
} from "../../../../../reudux/action/bookingActions";
import { useDispatch, useSelector } from "react-redux";
import commonFunction from "../../../../base/common/commonFunction";

function Book(props) {
  const [idBooking, setIdBooking] = useState();
  const [sortType, setSortType] = useState();
  const [status, setStatus] = useState("ADD");
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
  const [isShowPopupSetup, setIsShowPopupSetup] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookNote, setBookNote] = useState("");
  const [bookAdults, setBookAdults] = useState();
  const [bookChild, setBookChild] = useState();
  const [bookDate, setBookDate] = useState();
  const [bookTime, setBookTime] = useState();
  const [name, setName] = useState()
  const dataTable = [
    {
      value: "1",
      label: "B01",
    },
    {
      value: "2",
      label: "B02",
    },
    {
      value: "3",
      label: "b03",
    },
  ];
  const dataArea = [
    {
      value: "1",
      label: "Khu vực 1",
    },
    {
      value: "2",
      label: "Khu vực 2",
    },
    {
      value: "3",
      label: "Khu vực 3",
    },
  ];
  const COLUMN_TABLE_INDEX_TABLE = {
    NAME_TABLE: "nametable",
    AREA: "area",
    DATE: "date",
    STATUS: "status",
    CLIENT: "client",
    ACTION: "action",
  };
  const COLUMN_TABLE_INDEX_MENU = {
    NAME: "name",
    PHONE: "phone",
    ADULTS: "adults",
    CHILD: "child",
    DATE: "date",
    NOTE: "note",
    TIME: "time",
    PEOPLE: "people",
    STATUS_BOOK: "status"
  };
  const columns_setup = [
    {
      title: "Tên bàn",
      dataIndex: COLUMN_TABLE_INDEX_TABLE.NAME_TABLE,
      width: "150px",
    },
    {
      title: "Khu vực",
      dataIndex: COLUMN_TABLE_INDEX_TABLE.AREA,
      width: "250px",
    },
    {
      title: "Ngày checkin",
      dataIndex: COLUMN_TABLE_INDEX_TABLE.DATE,
      width: "250px",
    },
    {
      title: "Trạng thái",
      dataIndex: COLUMN_TABLE_INDEX_TABLE.STATUS,
      width: "250px",
    },
    {
      title: "Tên khách",
      dataIndex: COLUMN_TABLE_INDEX_TABLE.CLIENT,
      width: "200px",
    },
    {
      title: "Thao tác",
      dataIndex: COLUMN_TABLE_INDEX_TABLE.ACTION,
      width: "200px",
    },
  ];

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
    {
      title: "Trang thái",
      dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS_BOOK,
      width: "150px",
    },
  ];
  const data_setup = [
    {
      key: "1",
      nametable: "B01",
      area: "Khu vực 1",
      date: "13/08/2022",
      status_code: 1,
      status: "Bàn đang hoạt động",
      client: "Chị Linh",
    },
    {
      key: "2",
      nametable: "B02",
      area: "Khu vực 1",
      date: "13/08/2022",
      status_code: 2,
      status: "Bàn đã được đặt",
      client: "Anh Đức",
    },
    {
      key: "3",
      nametable: "B11",
      area: "Khu vực 2",
      date: "13/08/2022",
      status_code: 0,
      status: "Bàn trống",
      client: "",
    },
    {
      key: "4",
      nametable: "B04",
      area: "Khu vực 2",
      date: "13/08/2022",
      status_code: 0,
      status: "Bàn trống",
      client: "",
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
    },
  ];
  const OPTION_MORE_TABLE = [
    {
      title: "Xếp bàn",
      onSelect: (item) => {
        if (quyen4 === "0-6-3") {
          setIsShowPopupSetup(true);
          setName(item.name)
          // console.log("item.name.props.children[1].props.children", item);
          setIdBooking(item.id);
          setBookName(item?.name);
          setBookPhone(item?.phone?.props?.children);
          setBookAdults(item?.adults?.props?.children);
          setBookChild(item?.child?.props?.children);
          setBookDate(item?.date?.props?.children);
          setBookTime(item?.time?.props?.children);
          setBookNote(item?.note?.props?.children);
        } else {
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xếp bàn")
        }
      },
    },
    {
      title: "Sửa",
      onSelect: (item) => {
        if (quyen2 === "0-6-1") {
          setIsShowPopupAddnew(true);
          setIdBooking(item.id);
          setBookName(item?.name);
          setBookPhone(item?.phone?.props?.children);
          setBookAdults(item?.adults?.props?.children);
          setBookChild(item?.child?.props?.children);
          setBookDate(item?.date?.props?.children);
          setBookTime(item?.time?.props?.children);
          setBookNote(item?.note?.props?.children);
          setStatus("UPDATE");
        } else {
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền sửa đặt bàn")
        }

      },
    },
    {
      title: "Xóa",
      onSelect: (item) => {
        if (quyen3 === "0-6-2") {
          dispatch(deleteBooking(item.id));
        } else {
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa đặt bàn")
        }

      },
    },
  ];

  //Cột bảng Đặt bàn

  const { dataBooking, dataXB, loading } = useSelector((state) => state.bookingReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooking());
    dispatch(getTable())
  }, [dispatch, loading]);


  function columnName(item) {
    return (
      <div>
        {item?.khachHang?.name ?? bookName}
        <div className="hidden-id">{item.id}</div>
      </div>
    );
  }

  function columnPhone(item) {
    return <div>{item?.khachHang?.soDienThoai ?? "Chưa có số điện thoại"}</div>;
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

  function columnStatusBook(item) {
    return <div>{item.trangThai === 0 ? "Chưa xếp bàn" : "Đã xếp bàn"} - {item.trangThai}</div>
  }

  // Cột trong bảng xếp bàn

  function columnNameTable(item) {
    return <div>{item?.name}</div>;
  }
  function columnArea(item) {
    return <div>{item?.tenKhuVuc}</div>;
  }
  function columnDateCheckin(item) {
    return <div>{item?.createdOnDate}</div>;
  }
  function columnStatus(item) {
    return <div>{item?.trangThai === 0 ? "Chưa xếp bàn" : "Đã xếp bàn"}</div>;
  }
  function columnClient(item) {
    return <div>{item?.createdByUserName}</div>;
  }
  const getQuyen = JSON.parse(localStorage.getItem("quyen"))

  const quyen = getQuyen

  const quyen1 = quyen?.find((item) => item === "0-6-0")
  const quyen2 = quyen?.find((item) => item === "0-6-1")
  const quyen3 = quyen?.find((item) => item === "0-6-2")
  const quyen4 = quyen?.find((item) => item === "0-6-3")

  const onSubmitXB = (item) => {
    const date = new Date()
    const body = {
      id: item.id,
      name: item.name,
      soNguoiToiDa: item.soNguoiToiDa,
      loaiBan: item.loaiBan,
      top: item.top,
      left: item.left,
      trangThai: 2,
      kieuDang: item.kieuDang,
      idKhuVuc: item.idKhuVuc,
      createdByUserName: name,
    }

    const bodyBook = {
      id: idBooking,
      trangThai: 1,
      tenKhachHang: bookName,
      soDienThoai: bookPhone,
      soNguoiLon: bookAdults,
      soTreEm: bookChild,
      gioDen: date.toISOString(bookTime),
      ghiChu: bookNote,
    }
    dispatch(editTable(body))
    // dispatch(updateBooking(bodyBook))
  }

  const onSubmitHXB = (item) => {
    const date = new Date();

    const body = {
      id: item.id,
      name: item.name,
      soNguoiToiDa: item.soNguoiToiDa,
      loaiBan: item.loaiBan,
      top: item.top,
      left: item.left,
      trangThai: 0,
      kieuDang: item.kieuDang,
      idKhuVuc: item.idKhuVuc,
      createdByUserName: ""
    }
    const bodyBook = {
      id: idBooking,
      trangThai: 0,
      tenKhachHang: bookName,
      soDienThoai: bookPhone,
      soNguoiLon: bookAdults,
      soTreEm: bookChild,
      thoiGian: date.toISOString(bookDate),
      gioDen: date.toISOString(bookTime),
      ghiChu: bookNote,
    }
    dispatch(editTable(body))
    // dispatch(updateBooking(bodyBook))
  }
  function columnActive(item) {
    if (item.trangThai === 0) {
      return (
        <div>
          <Button2
            name={"Xếp bàn"}
            onClick={() => onSubmitXB(item)}
            background="#fa983a"
          />
        </div>
      );
    }
    if (item.trangThai === 2) {
      return (
        <div>
          <Button2
            name={"Hủy Xếp bàn"}
            onClick={() => onSubmitHXB(item)}
            background="#fa983a"
          />
        </div>
      );
    } else return <div></div>;
  }

  function convertDataTable(dataTable) {
    let listData;
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
        [COLUMN_TABLE_INDEX_MENU.STATUS_BOOK]: columnStatusBook(item),
        key: idx,
        name: item?.khachHang?.name,
        id: item?.id
      };
    });
    return [...listData];
  }

  function convertDataTableSetup(dataTableSetup) {
    let listDataSetup;
    listDataSetup = dataTableSetup.map((item, idx) => {
      return {
        [COLUMN_TABLE_INDEX_TABLE.NAME_TABLE]: columnNameTable(item),
        [COLUMN_TABLE_INDEX_TABLE.AREA]: columnArea(item),
        [COLUMN_TABLE_INDEX_TABLE.DATE]: columnDateCheckin(item),
        [COLUMN_TABLE_INDEX_TABLE.STATUS]: columnStatus(item),
        [COLUMN_TABLE_INDEX_TABLE.CLIENT]: columnClient(item),
        [COLUMN_TABLE_INDEX_TABLE.ACTION]: columnActive(item),
        key: idx,
        id: item.id,
      };
    });
    return [...listDataSetup];
  }

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
  }
  function onChangeTab() {
    setIsShowPopupAddnew(false);
  }
  function onChangeSetup() {
    setIsShowPopupSetup(false);
  }

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
    setStatus("ADD");
  }
  function onChangeTab() {
    setIsShowPopupAddnew(false);
    const date = new Date();
    const body = {
      tenKhachHang: bookName,
      soDienThoai: bookPhone,
      soNguoiLon: bookAdults,
      soTreEm: bookChild,
      thoiGian: date.toISOString(bookDate),
      gioDen: date.toISOString(bookTime),
      ghiChu: bookNote,
    };
    if (status === "ADD") {
      dispatch(postBooking(body));
    } else if (status === "UPDATE") {
      const id = idBooking;
      dispatch(
        updateBooking({
          id,
          body,
        })
      );
    }
    setBookName("");
    setBookPhone("");
    setBookAdults("");
    setBookChild("");
    setBookNote("");
  }

  const closeTab = () => {
    setIsShowPopupAddnew(false);
  };

  const searchBook = (text) => {
    dispatch(searchBooking(text))
  }
  return (
    <AdminPage title={"Quản lý đặt bàn"} index={MENU_TAB_ADMIN.BOOK}>
      <div className="book-manager">
        <div className="book-manager__filter">
          <div className="book-manager__filter-name">
            <InputField
              placeholder={"Tên khách hàng/Số điện thoại"}
              width={"100%"}
              label={"Tên khách/Số điện thoại"}
              onChange={(event) => searchBook(event)}
            />
          </div>
          {/* <div className="book-manager__filter-phone">
            <InputField
              placeholder={"Số điện thoại"}
              width={"100%"}
              label={"Số điện thoại"}
            />
          </div> */}
          <div className="book-manager__filter-date">
            <DatePicker
              defaultValue={moment().unix() * 1000}
              // min={moment().unix() * 1000 - ONE_DAY}
              // onChange={(val) => {
              //     setStaffDate(val);
              // }}
              placeholder="dd/MM/yyyy"
              label={"Ngày checkin"}
              width={"100%"}
              onChange={(val) => {
                const date = new Date()
                searchBook(date.toISOString(val));
              }}
            />
          </div>
          <div className="book-manager__filter-create-new">
            {quyen1 === "0-6-0" ? <Button2
              name={"Thêm mới đặt bàn"}
              leftIcon={<PlusOutlined />}
              onClick={() => handleClickAddnew()}
            /> : null}

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
            <Button2 name={"Đóng"} onClick={() => closeTab()} />,
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
                onChange={(val) => {
                  setBookPhone(val);
                }}
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
                onChange={(val) => {
                  setBookChild(val);
                }}
                autoFocus
              />
              <DatePicker
                defaultValue={moment().unix() * 1000}
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
                onChange={(val) => {
                  setBookNote(val);
                }}
                autoFocus
              />
            </div>
          }
        />
        <Popup
          title={"Xếp bàn"}
          show={isShowPopupSetup}
          onClickClose={() => onChangeSetup()}
          button={[<Button2 name={"Đóng"} onClick={() => onChangeSetup()} />]}
          width={"90%"}
          //className={"staff-manager-create"}
          body={
            <div className="book-manager__popupsetup">
              <div className="book-manager__popupsetup-search">
                <div className="book-manager__popupsetup-search-time">
                  <DatePicker
                    defaultValue={moment().unix() * 1000}
                    //min={moment().unix() * 1000 - ONE_DAY}
                    // onChange={(val) => {
                    //     setStaffDate(val);
                    // }}
                    placeholder="dd/MM/yyyy"
                    label={"Ngày checkin"}
                    width={"100%"}
                  />
                </div>
                <div className="book-manager__popupsetup-search-table">
                  <Dropdown
                    listOption={dataTable}
                    placeholder={"Chọn bàn"}
                    title={"Số bàn"}
                  />
                </div>
                <div className="book-manager__popupsetup-search-area">
                  <Dropdown
                    listOption={dataArea}
                    placeholder={"Chọn khu vực"}
                    title={"Khu vực"}
                  />
                </div>
              </div>
              <TableBase
                // onChangePagination={(page, pageSize)=>{}}
                columns={columns_setup}
                total={90}
                data={convertDataTableSetup(dataXB)}
                loading={false}
                //hasMoreOption
                option={OPTION_MORE_TABLE}
                setObjectSort={(field, order) => {
                  setSortType({
                    field: field,
                    order: order,
                  });
                }}
              />
            </div>
          }
        />
      </div>
    </AdminPage>
  );
}
export default Book;
