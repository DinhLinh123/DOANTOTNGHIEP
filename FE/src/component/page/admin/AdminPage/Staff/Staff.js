import React, { useEffect, useState } from "react";
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
import Input from "../../../../base/Input/Input";
import "./staff.scss";
import Popup from "../../../../base/Popup/Popup";
import { Radio, Select } from "antd";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Dropdown from "../../../../base/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStaff,
  getStaff,
  postStaff,
  searchStaff,
  updateStaff,
} from "../../../../../reudux/action/staffAction";
import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import { Switch, Tree } from "antd";
import axios from "axios";
import { URL_API } from "../../../../../utils/urpapi";
import commonFunction from "../../../../base/common/commonFunction";

function Staff(props) {
  const [sortType, setSortType] = useState();
  const [statusAction, setStatusAction] = useState("ADD");
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
  const [idStaff, setIdStaff] = useState();
  const [isShowPopupAddPosition, setIsShowPopupAddPosition] = useState(false);
  const [staffCode, setStaffCode] = useState(0);
  const [staffName, setStaffName] = useState("");
  const [staffSex, setStaffSex] = useState("Nam");
  const [isShowPopupSetup, setIsShowPopupSetup] = useState(false);
  const [staffDate, setStaffDate] = useState(moment().unix() * 1000);
  const [staffPosition, setStaffPosition] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffAddress, setStaffAddress] = useState("");
  const [staffNote, setStaffNote] = useState("");
  const [acountName, setAcountName] = useState("")
  const [password, setPassword] = useState("")
  const [searchUser, setSearchUser] = useState({
    TextSearch: "",
    ChucVu: ""
  })
  const [permission, setPermission] = useState([]);
  // Thêm mới chức vụ
  const [PositionCode, setPositionCode] = useState("");
  const [PositionName, setPositionName] = useState("");
  const [role, setRole] = useState("");
  const COLUMN_TABLE_INDEX_MENU = {
    CODE: "code",
    NAME: "name",
    SEX: "sex",
    DATE: "date",
    POSITION: "position",
    PHONE: "phone",
    ADDRESS: "address",
    NOTE: "note",
  };



  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: COLUMN_TABLE_INDEX_MENU.CODE,
      width: "150px",
    },
    {
      title: "Tên nhân viên",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
      sorter: true,
      width: "250px",
    },
    {
      title: "Giới tính",
      dataIndex: COLUMN_TABLE_INDEX_MENU.SEX,
      width: "100px",
    },
    {
      title: "Ngày sinh",
      dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
      width: "200px",
    },
    {
      title: "Chức vụ",
      dataIndex: COLUMN_TABLE_INDEX_MENU.POSITION,
      width: "200px",
    },
    {
      title: "Số điện thoại",
      dataIndex: COLUMN_TABLE_INDEX_MENU.PHONE,
      width: "200px",
    },
    {
      title: "Địa chỉ",
      dataIndex: COLUMN_TABLE_INDEX_MENU.ADDRESS,
      width: "300px",
    },
    {
      title: "Ghi chú",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
      width: "250px",
    },
  ];

  const data = [
    {
      key: "1",
      code: "B001",
      name: "John Brown",
      sex: "Nữ",
      date: "12/12/2022",
      position: "Nhân viên bàn",
      phone: "0358100337",
      address: "18 phố viên",
      note: "nhân viên order",
    },
    {
      key: "2",
      code: "B002",
      name: "John Brown",
      sex: "Nữ",
      date: "12/12/2022",
      position: "Nhân viên bàn",
      phone: "0358100337",
      address: "18 phố viên",
      note: "nhân viên order",
    },
    {
      key: "3",
      code: "B003",
      name: "John Brown",
      sex: "Nữ",
      date: "12/12/2022",
      position: "Nhân viên bàn",
      phone: "0358100337",
      address: "18 phố viên",
      note: "nhân viên order",
    },
    {
      key: "4",
      code: "B004",
      name: "John Brown",
      sex: "Nữ",
      date: "12/12/2022",
      position: "Nhân viên bàn",
      phone: "0358100337",
      address: "18 phố viên",
      note: "nhân viên order",
    },
  ];
  const dataPosition = [
    {
      value: "Phục vụ bàn",
      label: "Phục vụ bàn",
    },
    {
      value: "Bếp",
      label: "Bếp",
    },
    {
      value: "Thu ngân",
      label: "Thu ngân",
    },
    {
      value: "Admin",
      label: "Admin",
    },
  ];

  const getQuyen = JSON.parse(localStorage.getItem("quyen"))

  const quyen = getQuyen

  const quyen1 = quyen?.find((item) => item === "0-5-0")
  const quyen2 = quyen?.find((item) => item === "0-5-1")
  const quyen3 = quyen?.find((item) => item === "0-5-2")
  const quyen4 = quyen?.find((item) => item === "0-5-3")


  const OPTION_MORE_TABLE = [
    {
      title: "Phân quyền",
      onSelect: (item) => {
        if (quyen4 === "0-5-3") {

          setIdStaff(item?.code.props.children[1].props.children);
          setStaffCode(item?.code.props.children[0]);
          setStaffName(item?.name.props.children);
          setStaffSex(item?.sex.props.children);
          setStaffDate(item?.date.props.children);
          setStaffPosition(item?.position.props.children);
          setStaffPhone(item?.phone.props.children);
          setStaffAddress(item?.address.props.children);
          setStaffNote(item?.note.props.children);
          setAcountName(item?.data.userName)
          if (item?.listTree !== "string") {
            setCheckedKeys(JSON.parse(item?.listTree))
          }
          setIsShowPopupSetup(true);
        } else {
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền phân quyền")

        }

      },
    },
    {
      title: "Sửa",
      onSelect: (item) => {
        if (quyen2 === "0-5-1") {
          setIsShowPopupAddnew(true);
          setStatusAction("UPDATE");
          setIdStaff(item?.code.props.children[1].props.children);
          setStaffCode(item?.code.props.children[0]);
          setStaffName(item?.name.props.children);
          setStaffSex(item?.sex.props.children);
          setStaffDate(item?.date.props.children);
          setStaffPosition(item?.position.props.children);
          setStaffPhone(item?.phone.props.children);
          setStaffAddress(item?.address.props.children);
          setStaffNote(item?.note.props.children);
          setAcountName(item?.data.userName)
          setPassword(item?.data.password)

        } else {
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền sửa nhân viên")
        }


      },
    },
    {
      title: "Xóa",
      onSelect: async (item) => {
        if (quyen3 === "0-5-2") {
          dispatch(deleteStaff(item?.code.props.children[1].props.children));
        } else {
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa nhân viên")
        }
      },
    },
  ];
  //Phân quyền

  const treeData = [
    {
      title: "Menu",
      key: "0-0",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm menu",
          key: "0-0-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa menu",
          key: "0-0-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa menu",
          key: "0-0-2",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Chi tiêu",
      key: "0-1",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm chi tiêu",
          key: "0-1-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa chi tiêu",
          key: "0-1-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa chi tiêu",
          key: "0-1-2",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Doanh thu",
      key: "0-2",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Xem doanh thu",
          key: "0-2-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: " doanh thu",
          key: "0-2-0",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Bếp",
      key: "0-3",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm yêu cầu nguyên liệu",
          key: "0-3-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa yêu cầu nguyên liệu",
          key: "0-3-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa yêu cầu nguyên liệu",
          key: "0-3-2",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Thêm Hóa đơn bếp",
          key: "0-3-3",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa Hóa đơn bếp",
          key: "0-3-4",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa Hóa đơn bếp",
          key: "0-3-5",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Bar",
      key: "0-4",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm mặt hàng",
          key: "0-4-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa mặt hàng",
          key: "0-4-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa mặt hàng",
          key: "0-4-2",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Nhân viên",
      key: "0-5",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm nhân viên",
          key: "0-5-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa nhân viên",
          key: "0-5-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa nhân viên",
          key: "0-5-2",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Phân Quyền",
          key: "0-5-3",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Đặt bàn",
      key: "0-6",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm đặt bàn",
          key: "0-6-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa đặt bàn",
          key: "0-6-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa đặt bàn",
          key: "0-6-2",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xếp bàn",
          key: "0-6-3",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Khu vực",
      key: "0-7",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm Khu vực",
          key: "0-7-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa Khu vực",
          key: "0-7-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa Khu vực",
          key: "0-7-2",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Thêm bàn",
          key: "0-7-3",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa bàn",
          key: "0-7-4",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa bàn",
          key: "0-7-5",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Danh mục",
      key: "0-8",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thêm danh mục menu",
          key: "0-8-0",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa danh mục menu",
          key: "0-8-1",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa danh mục menu",
          key: "0-8-2",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Thêm danh mục quầy bar",
          key: "0-8-3",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa danh mục quầy bar",
          key: "0-8-4",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa danh mục quầy bar",
          key: "0-8-5",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Thêm danh mục quầy chức vụ",
          key: "0-8-6",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Sửa danh mục quầy chức vụ",
          key: "0-8-7",
          icon: <CarryOutOutlined />,
        },
        {
          title: "Xóa danh mục quầy chức vụ",
          key: "0-8-8",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Thanh toán ",
      key: "0-9",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Thanh toán hóa đơn",
          key: "0-9-0",
          icon: <CarryOutOutlined />,
        },
      ],
    },
    {
      title: "Order ",
      key: "0-10",
      icon: <CarryOutOutlined />,
      children: [
        {
          title: "Order",
          key: "0-10-0",
          icon: <CarryOutOutlined />,
        },
      ],
    },
  ];

  const { dataStaff, loading } = useSelector((state) => state.staffReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStaff(searchUser));
  }, [dispatch, loading, searchUser]);

  // useEffect(() => {
  //   if (staffPosition) {
  //     dispatch(searchStaff(staffPosition));
  //   }
  // }, [dispatch]);

  // Select chức vụ
  const { Option } = Select;
  const onChange = (value) => {
    setStaffPosition(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  function columnCode(item) {
    return (
      <div>
        {item?.maNV}
        <div className="hidden-id">{item.id}</div>
      </div>
    );
  }
  function columnName(item) {
    return <div>{item?.fullName}</div>;
  }
  function columnSex(item) {
    return <div>{item?.phai}</div>;
  }
  function columnDate(item) {
    return <div>{moment(item?.ngaySinh).format("DD-MM-YYYY")}</div>;
  }
  function columnPosition(item) {
    return <div>{item?.chucVu}</div>;
  }
  function columnPhone(item) {
    return <div>{item?.soDienThoai}</div>;
  }
  function columnAddress(item) {
    return <div>{item?.diaChi}</div>;
  }
  function columnNote(item) {
    return <div>{item?.chiChu}</div>;
  }

  function convertDataTable(dataTable) {
    let listData;
    listData = dataTable?.map((item, idx) => {
      return {
        [COLUMN_TABLE_INDEX_MENU.CODE]: columnCode(item),
        [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
        [COLUMN_TABLE_INDEX_MENU.SEX]: columnSex(item),
        [COLUMN_TABLE_INDEX_MENU.DATE]: columnDate(item),
        [COLUMN_TABLE_INDEX_MENU.POSITION]: columnPosition(item),
        [COLUMN_TABLE_INDEX_MENU.PHONE]: columnPhone(item),
        [COLUMN_TABLE_INDEX_MENU.ADDRESS]: columnAddress(item),
        [COLUMN_TABLE_INDEX_MENU.NOTE]: columnNote(item),
        key: idx,
        listTree: item.quyen,
        data: item
      };
    });
    return [...listData];
  }

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
    setStatusAction("ADD");
    setIdStaff("");
    setStaffCode("");
    setStaffName("");
    setStaffSex("");
    setStaffDate("");
    setStaffPosition("");
    setStaffPhone("");
    setStaffAddress("");
    setStaffNote("");
    setAcountName("")
    setPassword("");
  }
  function handleClickAddPosition(type) {
    setIsShowPopupAddPosition(true);
  }
  async function onChangeTab() {
    const date = new Date();
    const user = JSON.parse(localStorage.getItem("roleType"))

    if (statusAction === "ADD") {

      const res = await axios.get(`http://backend1002-001-site1.atempurl.com/checkexist/${acountName}`)
      if (res.data.code === 500) {
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Tài khoản đã tồn tại")
      } else {

        const body = {
          maNV: staffCode,
          fullName: staffName,
          phai: staffSex,
          ngaySinh: date.toISOString(staffDate),
          chucVu: staffPosition,
          soDienThoai: staffPhone,
          quyen: staffPosition === "Admin" ? "[\"0-0\",\"0-0-0\",\"0-0-1\",\"0-0-2\",\"0-1\",\"0-1-0\",\"0-1-1\",\"0-1-2\",\"0-2\",\"0-2-0\",\"0-3\",\"0-3-0\",\"0-3-1\",\"0-3-2\",\"0-3-3\",\"0-3-4\",\"0-3-5\",\"0-4\",\"0-4-0\",\"0-4-1\",\"0-4-2\",\"0-5\",\"0-5-0\",\"0-5-1\",\"0-5-2\",\"0-6\",\"0-6-0\",\"0-6-1\",\"0-6-2\",\"0-6-3\",\"0-7\",\"0-7-0\",\"0-7-1\",\"0-7-2\",\"0-7-3\",\"0-7-4\",\"0-7-5\",\"0-8\",\"0-8-0\",\"0-8-1\",\"0-8-2\",\"0-8-3\",\"0-8-4\",\"0-8-5\",\"0-8-6\",\"0-8-7\",\"0-8-8\",\"0-9\",\"0-9-0\",\"0-10\",\"0-10-0\"]" : null,
          diaChi: staffAddress,
          chiChu: staffNote,
          userName: acountName,
          password: password,
          createdByUserName: user.userName,
          createdOnDate: date
        };
        dispatch(postStaff(body));
      }

    } else if (statusAction === "UPDATE") {
      const body = {
        id: idStaff,
        maNV: staffCode,
        fullName: staffName,
        phai: staffSex,
        ngaySinh: date.toISOString(staffDate),
        chucVu: staffPosition,
        soDienThoai: staffPhone,
        diaChi: staffAddress,
        chiChu: staffNote,
        userName: acountName,
        password: password,
      };
      dispatch(updateStaff({ id: body.id, body }));
    }

    setIsShowPopupAddnew(false);
    setStaffAddress("");
    setStaffCode("");
    setStaffName("");
    setStaffDate("");
    setStaffPhone("");
    setStaffNote("");
    setStaffSex(1);
    setStaffPosition(1);
  }
  function onChangeAddPosition() {
    setIsShowPopupAddPosition(false);
  }

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    const idUser = localStorage.getItem("infoUser")
    const findUser = dataStaff?.find(item => item.id === idUser)
    const date = new Date();
    const body = {
      id: idStaff,
      maNV: staffCode,
      fullName: staffName,
      phai: staffSex,
      quyen: JSON.stringify(checkedKeysValue),
      ngaySinh: date.toISOString(staffDate),
      userName: acountName,
      chucVu: staffPosition,
      soDienThoai: staffPhone,
      diaChi: staffAddress,
      chiChu: staffNote,
    };

    dispatch(updateStaff({ id: body.id, body }));
    setCheckedKeys(checkedKeysValue);
    if (findUser) {
      localStorage.setItem("quyen", findUser.quyen)
    } else {
      console.log("Vào đây 1");

    }

  };

  const onSelect = (selectedKeysValue, info) => {
    // console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <AdminPage title={"Quản lý nhân viên"} index={MENU_TAB_ADMIN.STAFF}>
      <div className="staff-manager">
        <div className="staff-manager__filter">
          <div className="staff-manager__filter-code">
            <InputField
              label={"Mã nhân viên/Tên nhân viên"}
              placeholder={"Mã nhân viên/Tên nhân viên"}
              onChange={(event) => setSearchUser({ ...searchUser, TextSearch: event })}
            />
          </div>
          <div className="staff-manager__filter-position">
            <Dropdown
              listOption={dataPosition}
              placeholder={"Chọn chức vụ"}
              title={"Chức vụ"}
              setStaffPosition={setStaffPosition}
              onChange={(item) => {
                setPositionName(item)
                setSearchUser({ ...searchUser, TextSearch: item })
              }}
              value={PositionName}
            />
          </div>

          <div className="staff-manager__filter-button">
            <div className="staff-manager__button-create-new">
              {quyen1 === "0-5-0" ? <Button2
                name={"Thêm mới nhân viên"}
                leftIcon={<PlusOutlined />}
                onClick={() => handleClickAddnew()}
              /> : null}

            </div>
          </div>
        </div>
        <div className="staff-manager__content">
          <TableBase
            // onChangePagination={(page, pageSize)=>{}}
            columns={columns}
            total={dataStaff?.length}
            data={convertDataTable(dataStaff)}
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
          title={"Thêm mới nhân viên"}
          show={isShowPopupAddnew}
          onClickClose={() => setIsShowPopupAddnew(false)}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => setIsShowPopupAddnew(false)}
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
            <div className="staff-manager__popup">
              <Input
                label={"Mã nhân viên"}
                value={staffCode}
                onChange={(val) => {
                  setStaffCode(val);
                }}
                autoFocus
              />
              <Input
                label={"Tên nhân viên"}
                value={staffName}
                onChange={(val) => {
                  setStaffName(val);
                }}
                autoFocus
              />
              <div className="staff-manager__popup-sex-lable">Giới tính</div>
              <Radio.Group
                onChange={(val) => {
                  setStaffSex(val.target.value);
                }}
                value={staffSex}
              >
                <Radio value={"Nam"}>Nam</Radio>
                <Radio value={"Nữ"}>Nữ</Radio>
              </Radio.Group>
              <DatePicker
                defaultValue={staffDate}
                onChange={(val) => {
                  setStaffDate(val);
                }}
                placeholder="dd/MM/yyyy"
                label={"Ngày sinh"}
              />
              <Dropdown
                listOption={dataPosition}
                placeholder={"Chọn chức vụ"}
                title={"Chức vụ"}
                value={staffPosition}
                setStaffPosition={setStaffPosition}
                onChange={(val) => {
                  setStaffPosition(val);
                }}
              />
              <Input
                label={"Số điện thoại"}
                value={staffPhone}
                onChange={(val) => {
                  setStaffPhone(val);
                }}
                autoFocus
              />
              <Input
                label={"Địa chỉ"}
                value={staffAddress}
                onChange={(val) => {
                  setStaffAddress(val);
                }}
                autoFocus
              />

              <Input
                label={"Tài khoản"}
                value={acountName}
                onChange={(val) => {
                  setAcountName(val);
                }}
                autoFocus
              />
              <Input
                label={"Mật khẩu"}
                value={password}
                type="password"
                onChange={(val) => {
                  setPassword(val);
                }}
                autoFocus
              />

              <Input
                label={"Ghi chú"}
                value={staffNote}
                onChange={(val) => {
                  setStaffNote(val);
                }}
                autoFocus
              />
            </div>
          }
        />
        <Popup
          title={"Phân quyền"}
          show={isShowPopupSetup}
          onClickClose={() => setIsShowPopupSetup(false)}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => setIsShowPopupSetup(false)}
            />,
          ]}
          width={"60%"}
          //className={"staff-manager-create"}
          body={
            <div>
              <Tree
                checkable
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={treeData}
              />
            </div>
          }
        />
      </div>
    </AdminPage>
  );
}
export default Staff;
