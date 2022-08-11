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
    const [drinksCode, setDrinksCode] = useState(""); 
    const [drinksGroup, setDrinksGroup] = useState("");
    const [drinksName, setDrinksName] = useState("");
    const [staffSex, setStaffSex] = useState(1);
    const [staffDate, setStaffDate] = useState(moment().unix()
    * 1000);
    const [staffPosition, setStaffPosition] = useState(1);
    const [amountDrinks, setAmountDrinks] = useState("");
    const [unitDrinks, setUnitDrinks] = useState(""); 
    const [unitPriceDrinks, setUnitPriceDrinks] = useState(""); 
    

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
    const dataDrinks = [
        {
            value: "1",
            label: "Rượu"
        },
        {
            value: "2",
            label: "bia"
        },
        {
            value: "3",
            label: "Nước ngọt"
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
        // setStaffAddress("")
        // setStaffCode("")
        // setStaffName("")
        setStaffDate("")
        setAmountDrinks("")
        setUnitPriceDrinks("")
        setStaffSex(1)
        setStaffPosition(1)

    }
    function onChangeAddPosition() {
        setIsShowPopupAddPosition(false)
    }

    // useEffect(()=>{console.log(staffName)},[staffName])
    return (
        <AdminPage
            title={"Quản lý quầy Bar"}
            index={MENU_TAB_ADMIN.BAR_INSERT}
        >
            <div className="barInsert-manager">
                <div className="barInsert-manager__filter">
                    <div className="barInsert-manager__filter-code">
                        <InputField
                            label={"Mã nhân viên"}
                            placeholder={"Mã nhân viên"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="barInsert-manager__filter-name">
                        <InputField
                            label={"Tên nhân viên"}
                            placeholder={"Tên nhân viên"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="barInsert-manager__filter-position">
                            <Dropdown listOption={dataPosition} placeholder={"Chọn chức vụ"} title={"Chức vụ"}/>
                    </div>
                </div>
                <div className="barInsert-manager__button">
                    <div className="barInsert-manager__button-search">
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
                    <div className="barInsert-manager__button-create-new">
                        <Button2
                            name={"Thêm mới đồ uống"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddnew()}
                        />
                    </div>
                </div>
                <div className="barInsert-manager__content">
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
                    title={"Thêm mới đồ uống"}
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
                    //className={"barInsert-manager-create"}
                    body={
                        <div className="barInsert-manager__popup">
                            <Input
                                label={"Mã đồ uống"}
                                defaultValue={drinksCode}
                                onChange={(val) => {
                                    setDrinksCode(val);
                                }}
                                autoFocus
                            />
                            <Dropdown 
                                listOption={dataDrinks} 
                                placeholder={"Nhập hoặc chọn tên đồ uống"} 
                                title={"Tên đồ uống"} 
                                defaultValue={drinksName}
                                onChange={(val) => { setDrinksName(val) }}
                                />
                            <Dropdown 
                                listOption={dataDrinks} 
                                placeholder={"Chọn nhóm đồ uống"} 
                                title={"Nhóm đồ uống"} 
                                defaultValue={drinksGroup}
                                onChange={(val) => { setDrinksGroup(val) }}
                                />
                            <Input
                                label={"Số lượng"}
                                defaultValue={amountDrinks}
                                onChange={(val) => { setAmountDrinks(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Đơn vị tính"}
                                defaultValue={unitDrinks}
                                onChange={(val) => { setUnitDrinks(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Đơn giá"}
                                defaultValue={unitPriceDrinks}
                                onChange={(val) => { setUnitPriceDrinks(val) }}
                                autoFocus
                            />
                            <div className="barInsert-manager__popup-intoMoney">
                                <div className="barInsert-manager__popup-intoMoney-lable">Thành tiền</div>
                                <div>100000</div>
                            </div>
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