import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Input from "../../../../base/Input/Input";
import "./feedback.scss"
import Popup from "../../../../base/Popup/Popup";
import { Radio, Select } from "antd";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Dropdown from "../../../../base/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getFeedback } from "../../../../../reudux/action/feedbackAction";

function ManagerFeedback(props) {
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
        NAME: "name",
        EMAIL: "email",
        PHONE: "phone",
        CONTENT: "content",
        DATE: "date"

    };

    const columns = [
        {
            title: "Họ Tên",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            width: "200px",
        },
        {
            title: "Email",
            dataIndex: COLUMN_TABLE_INDEX_MENU.EMAIL,
            width: "200px",
        },
        {
            title: "Số điện thoại",
            dataIndex: COLUMN_TABLE_INDEX_MENU.PHONE,
            width: "200px",
        },
        {
            title: "Nội dung",
            dataIndex: COLUMN_TABLE_INDEX_MENU.CONTENT,
            width: "300px",
        },
        {
            title: "Ngày nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
            width: "100px",
        },
        
    ];

    const data = [
        {
            key: "1",
            name: "Linh",
            email: "linh123@gmail.com",
            phone: "0358100337",
            content: "Đồ ăn hơi mặn",
            date: "12/12/2022",
            
        },
        {
            key: "2",
            name: "Linh",
            email: "linh123@gmail.com",
            phone: "0358100337",
            content: "Đồ ăn hơi mặn",
            date: "12/12/2022",
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

    const {dataFeedback} = useSelector(state => state.feedbackReducer)
    console.log("dataFeedback", dataFeedback);

    const disptach = useDispatch()
    useEffect(() => {
        disptach(getFeedback())
    },[disptach])

    // Select chức vụ
    const { Option } = Select;
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    

    function columnName(item) {
        return <div>{item?.tenKH}</div>;
    }
    function columnEmail(item) {
        return <div>{item?.email}</div>;
    }
    function columnPhone(item) {
        return <div>{item?.soDienThoai}</div>;
    }
    function columnContent(item) {
        return <div>{item?.noiDung}</div>;
    }
    function columnDate(item) {
        return <div>{item?.date}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable?.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.EMAIL]: columnEmail(item),
                [COLUMN_TABLE_INDEX_MENU.PHONE]: columnPhone(item),
                [COLUMN_TABLE_INDEX_MENU.CONTENT]: columnContent(item),
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
            title={"Quản lý góp ý từ khách hàng"}
            index={MENU_TAB_ADMIN.FEEDBACK}
        >
            <div className="managerfeedback-manager">
                <div className="managerfeedback-manager__filter">
                    <div className="managerfeedback-manager__filter-code">
                        <InputField
                            label={"Họ tên"}
                            placeholder={"Họ Tên"}
                        //width={"20%"} 
                        />
                    </div>
                    <div className="managerfeedback-manager__filter-name">
                        <InputField
                            label={"Số điện thoại"}
                            placeholder={"Số điện thoại"}
                        //width={"20%"} 
                        />
                    </div>
                    
                    <div className="managerfeedback-manager__filter-search">
                        <Button2
                            name={"Tìm kiếm"}
                            leftIcon={<SearchOutlined />}
                        //onClick={() => handleClickAddPosition()}
                        />
                    </div> 
                </div>
                
                <div className="managerfeedback-manager__content">
                    <TableBase
                        // onChangePagination={(page, pageSize)=>{}}
                        columns={columns}
                        total={90}
                        data={convertDataTable(dataFeedback)}
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
export default ManagerFeedback