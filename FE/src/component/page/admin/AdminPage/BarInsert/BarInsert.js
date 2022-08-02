import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "../../../../base/Input/Input";
import "./barInsert.scss"
import Popup from "../../../../base/Popup/Popup";
import { Radio, Select } from "antd";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Dropdown from "../../../../base/Dropdown/Dropdown";

function BarInsert(props) {
    const [sortType, setSortType] = useState();
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const [isShowPopupAddPosition, setIsShowPopupAddPosition] = useState(false);
    const [staffCode, setStaffCode] = useState("");
    const [staffName, setStaffName] = useState("");
    const [staffSex, setStaffSex] = useState(1);
    const [staffDate, setStaffDate] = useState(moment().unix()
    * 1000);
    const [staffPosition, setStaffPosition] = useState(1);
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
            value: "1",
            label: "Phục vụ bàn"
        },
        {
            value: "2",
            label: "Bếp"
        },
        {
            value: "3",
            label: "Thu ngân"
        },
    ]

    const OPTION_MORE_TABLE = [
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

    // Select chức vụ
    const { Option } = Select;
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    
    function columnCode(item) {
        return <div>{item?.code}</div>;
    }
    function columnName(item) {
        return <div>{item?.name}</div>;
    }
    function columnSex(item) {
        return <div>{item?.sex}</div>;
    }
    function columnDate(item) {
        return <div>{item?.date}</div>;
    }
    function columnPosition(item) {
        return <div>{item?.position}</div>;
    }
    function columnPhone(item) {
        return <div>{item?.phone}</div>;
    }
    function columnAddress(item) {
        return <div>{item?.address}</div>;
    }
    function columnNote(item) {
        return <div>{item?.note}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
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
    }
    function handleClickAddPosition(type) {
        setIsShowPopupAddPosition(true);
    }
    function onChangeTab() {
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
            title={"Quản lý quầy Bar"}
            index={MENU_TAB_ADMIN.BAR_INSERT}
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
                            <Dropdown listOption={dataPosition} placeholder={"Chọn chức vụ"} title={"Chức vụ"}/>
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
                    <div className="staff-manager__button-position">
                        <Button2
                            name={"Thêm mới Chức vụ"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddPosition()}
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
                    title={"Thêm mới nhân viên"}
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
                        <div className="staff-manager__popup">
                            <Input
                                label={"Mã nhân viên"}
                                defaultValue={staffCode}
                                onChange={(val) => {
                                    setStaffCode(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Tên nhân viên"}
                                defaultValue={staffName}
                                onChange={(val) => { setStaffName(val) }}
                                autoFocus
                            />
                            <div className="staff-manager__popup-sex-lable">Giới tính</div>
                            <Radio.Group onChange={(val) => { setStaffSex(val.target.value) }} value={staffSex}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>
                            <DatePicker
                                defaultValue={staffDate}
                                onChange={(val) => {
                                    setStaffDate(val);
                                }}
                                placeholder="dd/MM/yyyy"
                                label={"Ngày sinh"}
                            />
                            <div className="staff-manager__popup-position-lable">Chức vụ</div>
                            <div className="staff-manager__popup-position-select">
                                <Select
                                    showSearch
                                    placeholder="Chọn chức vụ"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    height={36}
                                    width={546}
                                // filterOption={(input, option) =>
                                //     (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                // }
                                >
                                    {dataPosition?.map((item, index) => {
                                        return (
                                            <Option value={index}>{item.name}</Option>
                                        );
                                    })}
                                </Select>
                            </div>
                            <Input
                                label={"Số điện thoại"}
                                defaultValue={staffPhone}
                                onChange={(val) => { setStaffPhone(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Địa chỉ"}
                                defaultValue={staffAddress}
                                onChange={(val) => { setStaffAddress(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Ghi chú"}
                                defaultValue={staffNote}
                                onChange={(val) => { setStaffNote(val) }}
                                autoFocus
                            />
                        </div>
                    }
                />
                <Popup
                    title={"Thêm mới chức vụ"}
                    show={isShowPopupAddPosition}
                    onClickClose={() => onChangeAddPosition()}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() => onChangeAddPosition()}
                        />,
                        <Button2
                            name={"Lưu"}
                            onClick={() => onChangeAddPosition()}
                            background="#fa983a"
                        />,
                    ]}
                    width={600}
                    className={"menu-popup-create"}
                    body={
                        <div>
                            <Input
                                label={"Mã chức vụ"}
                                defaultValue={PositionCode}
                                onChange={(val) => {
                                    setPositionCode(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Tên chức vụ"}
                                defaultValue={PositionName}
                                onChange={(val) => { setPositionName(val) }}
                                autoFocus
                            />
                        </div>
                    }
                />
            </div>
        </AdminPage>

    )

}
export default BarInsert