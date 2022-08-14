import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "../../../../base/Input/Input";
import "./staff.scss"
import Popup from "../../../../base/Popup/Popup";
import { Radio, Select } from "antd";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Dropdown from "../../../../base/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteStaff, getStaff, postStaff, updateStaff } from "../../../../../reudux/action/staffAction";

function Staff(props) {
    const [sortType, setSortType] = useState();
    const [statusAction, setStatusAction] = useState("ADD")
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const [idStaff, setIdStaff] = useState();
    console.log("idStaff", idStaff);
    const [isShowPopupAddPosition, setIsShowPopupAddPosition] = useState(false);
    const [staffCode, setStaffCode] = useState(0);
    console.log("staffCode", staffCode);
    const [staffName, setStaffName] = useState("");
    const [staffSex, setStaffSex] = useState("Nam");
    const [staffDate, setStaffDate] = useState(moment().unix()
    * 1000);
    const [staffPosition, setStaffPosition] = useState("Phục vụ bàn");
    console.log("staffPosition", staffPosition);
    const [staffPhone, setStaffPhone] = useState("");
    const [staffAddress, setStaffAddress] = useState("");
    const [staffNote, setStaffNote] = useState("");

    // Thêm mới chức vụ
    const [PositionCode, setPositionCode] = useState("");
    const [PositionName, setPositionName] = useState("");
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
            note: "nhân viên order"
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
            note: "nhân viên order"
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
            note: "nhân viên order"
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
            note: "nhân viên order"
        },
    ];
    const dataPosition = [
        {
            value: "Phục vụ bàn",
            label: "Phục vụ bàn"
        },
        {
            value: "Bếp",
            label: "Bếp"
        },
        {
            value: "Thu ngân",
            label: "Thu ngân"
        },
    ]

    const OPTION_MORE_TABLE = [
        {
            title: "Sửa",
            onSelect: (item) => {
            // console.log("aaa", item?.fullName.props.children);
            setIsShowPopupAddnew(true);
            setStatusAction("UPDATE")
            console.log({item});
            setIdStaff(item?.code.props.children[1].props.children)
            setStaffCode(item?.code.props.children[0])
            setStaffName(item?.name.props.children)
            setStaffSex(item?.sex.props.children)
            setStaffDate(item?.date.props.children)
            setStaffPosition(item?.position.props.children)
            setStaffPhone(item?.phone.props.children)
            setStaffAddress(item?.address.props.children)
            setStaffNote(item?.note.props.children)
            },
        },
        {
            title: "Xóa",
            onSelect: async (item) => {

                dispatch(deleteStaff(item?.code.props.children[1].props.children))
            },
        },
    ];

    const {dataStaff, loading} = useSelector(state => state.staffReducer);
    console.log("dataStaff", dataStaff);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStaff())
    },[dispatch, loading])

    // Select chức vụ
    const { Option } = Select;
    const onChange = (value) => {
        console.log(`selected ${value}`);
        setStaffPosition(value)
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    
    function columnCode(item) {
        return <div>{item?.maNV}
            <div className="hidden-id">{item.id}</div>
        </div>;
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
            };
        });
        return [...listData];
    }

    function handleClickAddnew(type) {
        setIsShowPopupAddnew(true);
        setStatusAction("ADD")
       
    }
    function handleClickAddPosition(type) {
        setIsShowPopupAddPosition(true);
    }
    function onChangeTab() {
        const date = new Date()
        if (statusAction === "ADD") {
            const body = {
                maNV: 0,
                fullName: staffName,
                phai: staffSex,
                ngaySinh: date.toISOString(staffDate),
                chucVu: staffPosition,
                soDienThoai: staffPhone,
                diaChi: staffAddress,
                chiChu: staffNote
            }
            dispatch(postStaff(body))
        } else {
            const body = {
                id: idStaff,
                maNV: staffCode,
                fullName: staffName,
                phai: staffSex,
                ngaySinh: date.toISOString(staffDate),
                chucVu: staffPosition,
                soDienThoai: staffPhone,
                diaChi: staffAddress,
                chiChu: staffNote
            }
            console.log("VÀo đây");

            dispatch(updateStaff({id: body.id, body}))
        }
       
        setIsShowPopupAddnew(false)
        setStaffAddress("")
        setStaffCode("")
        setStaffName("")
        setStaffDate("")
        setStaffPhone("")
        setStaffNote("")
        setStaffSex(1)
        setStaffPosition(1)

    }
    function onChangeAddPosition() {
        setIsShowPopupAddPosition(false)
    }

    useEffect(()=>{console.log(staffName)},[staffName])
    return (
        <AdminPage
            title={"Quản lý nhân viên"}
            index={MENU_TAB_ADMIN.STAFF}
        >
            <div className="staff-manager">
                <div className="staff-manager__filter">
                    <div className="staff-manager__filter-code">
                        <InputField
                            label={"Mã nhân viên"}
                            placeholder={"Mã nhân viên"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="staff-manager__filter-name">
                        <InputField
                            label={"Tên nhân viên"}
                            placeholder={"Tên nhân viên"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="staff-manager__filter-position">
                            <Dropdown listOption={dataPosition} placeholder={"Chọn chức vụ"} title={"Chức vụ"} setStaffPosition = {setStaffPosition}/>
                    </div>
                </div>
                <div className="staff-manager__button">
                    <div className="staff-manager__button-search">
                        <Button2
                            name={"Tìm kiếm"}
                            leftIcon={<SearchOutlined />}
                        //onClick={() => handleClickAddPosition()}
                        />
                    </div>
                    <div className="staff-manager__button-create-new">
                        <Button2
                            name={"Thêm mới nhân viên"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddnew()}
                        />
                    </div>
                </div>
                <div className="staff-manager__content">
                    <TableBase
                        // onChangePagination={(page, pageSize)=>{}}
                        columns={columns}
                        total={90}
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
                    onClickClose={() =>setIsShowPopupAddnew(false)}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() =>setIsShowPopupAddnew(false)}
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
                                type = "number"
                                value={staffCode}
                                onChange={(val) => {
                                    setStaffCode(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Tên nhân viên"}
                                value={staffName}
                                onChange={(val) => { setStaffName(val) }}
                                autoFocus
                            />
                            <div className="staff-manager__popup-sex-lable">Giới tính</div>
                            <Radio.Group onChange={(val) => { setStaffSex(val.target.value) }} value={staffSex}>
                                <Radio value={'Nam'}>Nam</Radio>
                                <Radio value={'Nữ'}>Nữ</Radio>
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
                                setStaffPosition = {setStaffPosition}
                                onChange={(val) => { setStaffPosition(val) }}
                                />
                            <Input
                                label={"Số điện thoại"}
                                value={staffPhone}
                                onChange={(val) => { setStaffPhone(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Địa chỉ"}
                                value={staffAddress}
                                onChange={(val) => { setStaffAddress(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Ghi chú"}
                                value={staffNote}
                                onChange={(val) => { setStaffNote(val) }}
                                autoFocus
                            />
                        </div>
                    }
                />
                
            </div>
        </AdminPage>

    )

}
export default Staff