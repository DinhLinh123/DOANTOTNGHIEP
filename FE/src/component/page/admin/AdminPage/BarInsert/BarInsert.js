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
        GROUP: "group",
        AMOUNT: "amount",
        UNIT: "unit",
        UNITPRICE: "unitPrice",
        INTOMONEY: "intoMoney",
        NOTE: "note",
        PERSON: "person",
        DATE: "date",

    };

    const columns = [
        {
            title: "Mã mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.CODE,
            width: "150px",
        },
        {
            title: "Tên mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            sorter: true,
            width: "250px",
        },
        {
            title: "Nhóm mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.GROUP,
            width: "200px",
        },
        {
            title: "Số lượng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.AMOUNT,
            width: "200px",
        },
        {
            title: "Đơn vị tính",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
            width: "200px",
        },
        {
            title: "Đơn giá",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNITPRICE,
            width: "200px",
        },
        {
            title: "Thành tiền",
            dataIndex: COLUMN_TABLE_INDEX_MENU.INTOMONEY,
            width: "200px",
        },
        {
            title: "Ghi chú",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
            width: "250px",
        },
        {
            title: "Người nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.PERSON,
            width: "200px",
        },
        {
            title: "Ngày nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
            width: "250px",
        },
    ];

    const data = [
        {
            key: "1",
            code: "ps",
            name: "pepsi",
            group: "nước ngọt",
            amount: 60,
            unit: "lon",
            unitPrice: 8000,
            intoMoney: 480000,
            note: "đã thanh toán",
            person: "Linhdtt",
            date: "12/12/2022"
        },
        {
            key: "2",
            code: "rd",
            name: "Rượu dừa",
            group: "Rượu",
            amount: 60,
            unit: "Quả",
            unitPrice: 80000,
            intoMoney: 4800000,
            note: "đã thanh toán",
            person: "Linhdtt",
            date: "12/12/2022"
        },
        
    ];
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
    function columnGroup(item) {
        return <div>{item?.group}</div>;
    }
    function columnAmount(item) {
        return <div>{item?.amount}</div>;
    }
    function columnUnit(item) {
        return <div>{item?.unit}</div>;
    }
    function columnUnitPrice(item) {
        return <div>{item?.unitPrice}</div>;
    }
    function columnIntoMoney(item) {
        return <div>{item?.intoMoney}</div>;
    }
    function columnNote(item) {
        return <div>{item?.note}</div>;
    }
    function columnPerson(item) {
        return <div>{item?.person}</div>;
    }
    function columnDate(item) {
        return <div>{item?.date}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.CODE]: columnCode(item),
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.GROUP]: columnGroup(item),
                [COLUMN_TABLE_INDEX_MENU.AMOUNT]: columnAmount(item),
                [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
                [COLUMN_TABLE_INDEX_MENU.UNITPRICE]: columnUnitPrice(item),
                [COLUMN_TABLE_INDEX_MENU.INTOMONEY]: columnIntoMoney(item),
                [COLUMN_TABLE_INDEX_MENU.NOTE]: columnNote(item),
                [COLUMN_TABLE_INDEX_MENU.PERSON]: columnPerson(item),
                [COLUMN_TABLE_INDEX_MENU.DATE]: columnDate(item),
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
            title={"Quản lý nhập liệu"}
            index={MENU_TAB_ADMIN.BAR_INSERT}
        >
            <div className="barInsert-manager">
                <div className="barInsert-manager__filter">
                    <div className="barInsert-manager__filter-code">
                        <InputField
                            label={"Mã mặt hàng"}
                            placeholder={"Mã mặt hàng"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="barInsert-manager__filter-name">
                        <InputField
                            label={"Tên mặt hàng"}
                            placeholder={"Tên mặt hàng"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="barInsert-manager__filter-position">
                            <Dropdown 
                                listOption={dataDrinks} 
                                placeholder={"Chọn nhóm mặt hàng"} 
                                title={"Nhóm mặt hàng"}
                            />
                    </div>
                    <div className="barInsert-manager__filter-date">
                    <DatePicker
                            defaultValue={moment().unix()
                                * 1000}
                            //min={moment().unix() * 1000 - ONE_DAY}
                            // onChange={(val) => {
                            //     setStaffDate(val);
                            // }}
                            placeholder="dd/MM/yyyy"
                            label={"Ngày nhập"}
                            width={"100%"}
                        />
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
                    <div className="barInsert-manager__button-create-new">
                        <Button2
                            name={"Thêm mới mặt hàng"}
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
                    title={"Thêm mới mặt hàng"}
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
                                label={"Mã mặt hàng"}
                                defaultValue={drinksCode}
                                onChange={(val) => {
                                    setDrinksCode(val);
                                }}
                                autoFocus
                            />
                            <Dropdown 
                                listOption={dataDrinks} 
                                placeholder={"Nhập hoặc chọn tên mặt hàng"} 
                                title={"Tên mặt hàng"} 
                                defaultValue={drinksName}
                                onChange={(val) => { setDrinksName(val) }}
                                />
                            <Dropdown 
                                listOption={dataDrinks} 
                                placeholder={"Chọn nhóm mặt hàng"} 
                                title={"Nhóm mặt hàng"} 
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
                
            </div>
        </AdminPage>

    )

}
export default BarInsert