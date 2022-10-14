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
  const [idBooking, setIdBooking] = useState("");
  console.log("idBookingidBookingidBooking", idBooking);
  const [sortType, setSortType] = useState();
  const [status, setStatus] = useState("ADD");
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
  const [isShowPopupSetup, setIsShowPopupSetup] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookNote, setBookNote] = useState("");
  const [bookAdults, setBookAdults] = useState("");
  const [bookChild, setBookChild] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [name, setName] = useState("");
  const [idMKH, setIdMKH] = useState("");
  const [idBan, setIdBan] = useState("");
  const [ngayCheckIn, setNgayCheckIn] = useState("");
  const [textSearch, setTextSearch] = useState("");



  console.log("idMKH", idMKH);

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
      dataIndex: COLUMN_TABLE_INDEX_MENU.TIME,
      sorter: true,
      width: "200px",
    },
    {
      title: "Giờ checkin",
      dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
      sorter: true,
      width: "100px",
    },
    {
      title: "Ghi chú",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
      sorter: true,
      width: "200px",
    },
    // {
    //   title: "Người nhập",
    //   dataIndex: COLUMN_TABLE_INDEX_MENU.PEOPLE,
    //   width: "150px",
    // },
    // {
    //   title: "Trang thái",
    //   dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS_BOOK,
    //   width: "150px",
    // },
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
          setName(item.nameKH)
          // console.log("item.name.props.children[1].props.children", item);, 
          setIdMKH(item?.IdMKH)
          setIdBan(item?.idBan)
          setIdBooking(item?.id);
          setBookName(item?.nameKH);
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
          setIdMKH(item?.IdMKH)
          setIdBan(item?.idBan)
          setIdBooking(item?.id);
          setBookName(item?.nameKH);
          setBookPhone(item?.phone?.props?.children[0]);
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
  console.log("dataXBdataXBdataXB", dataXB);

  useEffect(() => {
    dispatch(getBooking({ngayCheckIn, textSearch}));
    dispatch(getTable())
  }, [dispatch, loading, ngayCheckIn, textSearch]);

  function columnName(item) {
    console.log("itemitemitem", item);
    return (
      <div>
        {item?.tenKhachHang}
        <div className="hidden-id">{item.id}</div>
      </div>
    );
  }

  function columnPhone(item) {
    return <div>{item?.khachHang?.soDienThoai ?? "Chưa có số điện thoại"} {item.idMKH}</div>;
  }

  function columnAdults(item) {
    return <div>{item?.soNguoiLon}</div>;
  }
  function columnChild(item) {
    return <div>{item?.soTreEm}</div>;
  }
  function columnDate(item) {
    return <div>{moment(item?.thoiGian).format("hh:mm")}</div>;
  }
  function columnTime(item) {
    return <div>{moment(item?.gioDen).format("DD-MM-YYYY")}</div>;
  }
  function columnNote(item) {
    return <div>{item?.ghiChu}</div>;
  }
  function columnPeople(item) {
    return <div>{item?.createdByUserName}</div>;
  }

  function columnStatusBook(item) {
    return <div>{item.trangThai === 0 ? "Chưa xếp bàn" : "Đã xếp bàn"}</div>
  }

  // Cột trong bảng xếp bàn

  function columnNameTable(item) {
    return <div>{item?.ban?.name}</div>;
  }
  function columnArea(item) {
    return <div>{item?.ban?.tenKhuVuc}</div>;
  }
  function columnDateCheckin(item) {
    return <div>{moment(item?.createdOnDate).format("DD-MM-YYYY")}</div>;
  }
  function columnStatus(item) {
    return <div>{item?.trangThai === 0 ? "Chưa xếp bàn" : "Đã xếp bàn"}</div>;
  }
  function columnClient(item) {
    return <div>{item?.khachHang?.name}</div>;
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
      idBan: item.ban.id,
      monAns: item?.doAns,
      idThuNgan: item.idThuNgan,
      idKhachHang: idMKH,
      tongTien: item.tongTien,
      thucThu: item.thucThu,
      vocher: item.vocher,
      soTienGiam: item.soTienGiam,
      trangThaiBan: 2,
      trangThai: 2,
      lastModifiedByUserId: item.lastModifiedByUserId,
      lastModifiedByUserName: item.lastModifiedByUserName
    }

    const bodyBook = {
      id: idBooking,
      trangThai: 1,
      idBan: idBan,
      KhackHang: idMKH,
      tenKhachHang: bookName,
      soDienThoai: bookPhone[0],
      soNguoiLon: bookAdults,
      soTreEm: bookChild,
      gioDen: date.toISOString(bookTime),
      ghiChu: bookNote,
      lastModifiedByUserId: "00000000-0000-0000-0000-000000000000",
    }
    dispatch(editTable(body))
    console.log("bodybodybodybody", bodyBook);

    dispatch(updateBooking(bodyBook))
  }

  const onSubmitHXB = (item) => {
    const date = new Date();
    console.log("itemitemitem", item);

    const body = {
      id: item.id,
      idBan: item.ban.id,
      monAns: item.doAns,
      idThuNgan: item.idThuNgan,
      khachHang: null,
      tongTien: item.tongTien,
      thucThu: item.thucThu,
      vocher: item.vocher,
      soTienGiam: item.soTienGiam,
      trangThaiBan: 0,
      trangThai: 0,
      lastModifiedByUserId: item.lastModifiedByUserId,
      lastModifiedByUserName: item.lastModifiedByUserName
    }
    const bodyBook = {
      id: idBooking,
      trangThai: 0,
      idBan: "00000000-0000-0000-0000-000000000000",
      maKhackHang: idMKH,
      tenKhachHang: bookName,
      soDienThoai: bookPhone[0],
      soNguoiLon: bookAdults,
      soTreEm: bookChild,
      gioDen: date.toISOString(bookTime),
      ghiChu: bookNote,
      lastModifiedByUserId: "00000000-0000-0000-0000-000000000000",
    }
    dispatch(editTable(body))
    dispatch(updateBooking(bodyBook))
  }
  function columnActive(item) {
    console.log("item.ban.trangThaiitem.ban.trangThai", item.ban.trangThai);
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
    if (item.trangThai === 2 || item.trangThai === 1) {
      return (
        <div>
          <Button2
            name={"Hủy Xếp bàn"}
            onClick={() => onSubmitHXB(item)}
            background="#fa983a"
          />
        </div>
      );
    }
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
        nameKH: item?.khachHang?.name ?? item?.tenKhachHang,
        id: item?.id,
        IdMKH: item?.khachHang?.id,
        idBan: item?.idBan
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

    if (status === "ADD") {
      const body = {
        tenKhachHang: bookName,
        soDienThoai: bookPhone,
        soNguoiLon: bookAdults,
        soTreEm: bookChild,
        thoiGian: date.toISOString(bookTime),
        gioDen: bookDate,
        ghiChu: bookNote,
      };
      console.log("bodybodybody", body);
      dispatch(postBooking(body));
    } else if (status === "UPDATE") {
      const body = {
        id: idBooking,
        idBan: idBan,
        maKhachHang: idMKH,
        tenKhachHang: bookName,
        soDienThoai: bookPhone,
        gioDen: date.toISOString(bookTime),
        thoiGian: date.toISOString(bookDate),
        soNguoiLon: bookAdults,
        soTreEm: bookChild,
        ghiChu: bookNote,
        lastModifiedByUserId: "00000000-0000-0000-0000-000000000000",
        lastModifiedByUserName: "string"
      };
      console.log("bodybodybodybody", body);
      dispatch(
        updateBooking(
          body
        )
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
              placeholder={"Tên khách hàng"}
              width={"100%"}
              label={"Tên khách"}
              onChange={(event) => setTextSearch(event)}
            />
          </div>
          <div className="book-manager__filter-date">
            <DatePicker
              defaultValue={moment().unix() * 1000}
              // min={moment().unix() * 1000 - ONE_DAY}
              // onChange={(val) => {
              //     setStaffDate(val);
              // }}
              ngayCheckIn = {setNgayCheckIn}
              placeholder="dd/MM/yyyy"
              label={"Ngày checkin"}
              width={"100%"}
              onChange={(val) => {
                const date = moment(val).format("YYYY-MM-DDT00:00:00")
                setNgayCheckIn(date);
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
                  const date = moment(val).format("YYYY-MM-DDT00:00:00")
                  setBookDate(date);
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
