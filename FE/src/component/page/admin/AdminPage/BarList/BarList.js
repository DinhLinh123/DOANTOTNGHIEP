import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "../../../../base/Input/Input";
import "./barList.scss"
import Popup from "../../../../base/Popup/Popup";
import { Radio, Select } from "antd";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Dropdown from "../../../../base/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getBars } from "../../../../../reudux/action/barsAction";

function BarList(props) {
    const [textSearch, setTextSearch] = useState("")
    const [textSearchTime, setTextSearchTime] = useState("")
    const [textSearchNMH, setTextSearchNMH] = useState("")

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
        NOTE: "note",

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
            sorter: true,
        },
        {
            title: "Đơn vị tính",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
            width: "200px",
        },
        // {
        //     title: "Ghi chú",
        //     dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
        //     width: "250px",
        // },
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
            value: "Rượu",
            label: "Rượu"
        },
        {
            value: "Bia",
            label: "Bia"
        },
        {
            value: "Nước ngọt",
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

    const { dataBars } = useSelector(state => state.barsReducer)
    const disptach = useDispatch()
   
    useEffect(() => {
        disptach(getBars({
            PageSize: 1,
            Page: 10,
            textSearch,
            textSearchTime,
            textSearchNMH
        }))
    }, [disptach, textSearch, textSearchTime, textSearchNMH])


    function columnCode(item) {
        return <div>{item?.maMatHang}</div>;
    }
    function columnName(item) {
        return <div>{item?.tenMatHang}</div>;
    }
    function columnGroup(item) {
        return <div>{item?.nhomMatHang}</div>;
    }
    function columnAmount(item) {
        return <div>{item?.soLuong}</div>;
    }
    function columnUnit(item) {
        return <div>{item?.donVi}</div>;
    }
    // function columnNote(item) {
    //     return <div>{item?.note}</div>;
    // }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.CODE]: columnCode(item),
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.GROUP]: columnGroup(item),
                [COLUMN_TABLE_INDEX_MENU.AMOUNT]: columnAmount(item),
                [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
                // [COLUMN_TABLE_INDEX_MENU.NOTE]: columnNote(item),
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
            title={"Quản lý mặt hàng"}
            index={MENU_TAB_ADMIN.BAR}
        >
            <div className="barlist-manager">
                <div className="barlist-manager__filter">
                    <div className="barlist-manager__filter-code">
                        <InputField
                            label={"Tên mặt hàng"}
                            placeholder={"Tên mặt hàng"}
                            onChange={(val) => setTextSearch(val)}
                        //width={"20%"} 
                        />
                    </div>
                    {/* <div className="barlist-manager__filter-name">
                        <InputField
                            label={"Tên mặt hàng"}
                            placeholder={"Tên mặt hàng"}
                        //width={"20%"} 
                        />
                    </div> */}
                    <div className="barlist-manager__filter-position">
                        <Dropdown
                            listOption={dataDrinks}
                            placeholder={"Chọn nhóm mặt hàng"}
                            title={"Nhóm mặt hàng"}
                            onChange={(val) => setTextSearchNMH(val)}
                            value={textSearchNMH}
                        />
                    </div>

                </div>
                {/* <div className="barlist-manager__button">
                    <div className="barlist-manager__button-search">
                        <Button2
                            name={"Tìm kiếm"}
                            leftIcon={<SearchOutlined />}
                        //onClick={() => handleClickAddPosition()}
                        />
                    </div>
                </div> */}
                <div className="barlist-manager__content">
                    <TableBase
                        // onChangePagination={(page, pageSize)=>{}}
                        columns={columns}
                        total={dataBars?.length}
                        data={convertDataTable(dataBars)}
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

            </div>
        </AdminPage>

    )

}
export default BarList