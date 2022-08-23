import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE, TYPE_MESSAGE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./categoryDrinks.scss"
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import TimePicker from "../../../../base/TimePicker/TimePicker";
import commonFunction from "../../../../base/common/commonFunction";

function CategoryDrinks(props) {
    const [sortType, setSortType] = useState();
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const [categoryCode, setCategoryCode] = useState(""); 
    const [categoryName, setCategoryName] = useState("");
    const [categoryNote, setCategoryNote] = useState("");
    
    const COLUMN_TABLE_INDEX_MENU = {
        CODE: "code",
        NAME: "name",
        NOTE: "note",
        PERSON: "person",
        DATE: "date",
    };

    const columns = [
        {
            title: "Mã nhóm mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.CODE,
            width: "100px",
        },
        {
            title: "Tên nhóm mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
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
            width: "100px",
        },
        {
            title: "Ngày nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
            sorter: true,
            width: "100px",
        },
        
    ];

    const data = [
        {
            key: "1",
            code: "111",
            name: "bia",
            note: "đồ uống",
            person: "LinhDTT",
            date: "28/07/2022",
        },
        {
            key: "2",
            code: "111",
            name: "rượu",
            note: "đồ uống",
            person: "LinhDTT",
            date: "28/07/2022",
        },
        {
            key: "3",
            code: "111",
            name: "nước ngọt",
            note: "đồ uống",
            person: "LinhDTT",
            date: "28/07/2022",
        },
        
    ];

    const getQuyen = JSON.parse(localStorage.getItem("quyen"))

    const quyen = getQuyen
  
    const quyen1 = quyen?.find((item) => item === "0-8-3")
    const quyen2 = quyen?.find((item) => item === "0-8-4")
    const quyen3 = quyen?.find((item) => item === "0-8-5")

    const OPTION_MORE_TABLE = [
        {
            title: "Sửa",
            onSelect: () => {
                if(quyen2 === "0-8-4"){
                    alert("Sửa");
                }else{
                    commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền sửa danh mục quầy bar")
                }
            },
        },
        {
            title: "Xóa",
            onSelect: () => {
                if(quyen2 === "0-8-5"){
                    alert("Xóa");
                }else{
                    commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa danh mục quầy bar")
                }
            },
        },
    ];
    function columnCode(item) {
        return <div>{item?.code}</div>;
    }
    function columnName(item) {
        return <div>{item?.name}</div>;
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
    function onChangeTab() {
        setIsShowPopupAddnew(false)
    }
    return (
        <AdminPage
            title={"Quản lý nhóm mặt hàng quầy bar"}
            index={MENU_TAB_ADMIN.CATEGOGY_DRINKS}
        >
            <div className="categorydrinks-manager">
                <div className="categorydrinks-manager__filter">
                    <div className="categorydrinks-manager__filter-name">
                        <InputField
                            placeholder={"Mã nhóm mặt hàng"}
                            width={"100%"}
                            label={"Mã nhóm mặt hàng"}
                        />
                    </div>
                    <div className="categorydrinks-manager__filter-phone">
                        <InputField
                            placeholder={"Tên nhóm mặt hàng"}
                            width={"100%"}
                            label={"Tên nhóm mặt hàng"}
                        />
                    </div>
                    <div className="categorydrinks-manager__filter-date">
                        <DatePicker
                            defaultValue={moment().unix()
                                * 1000}
                            min={moment().unix() * 1000 - ONE_DAY}
                            // onChange={(val) => {
                            //     setStaffDate(val);
                            // }}
                            placeholder="dd/MM/yyyy"
                            label={"Ngày nhập"}
                            width={"100%"}
                        />
                    </div>
                    <div className="categorydrinks-manager__filter-create-new">
                       {quyen1 === "0-8-3" ?  <Button2
                            name={"Thêm mới nhóm mặt hàng"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => handleClickAddnew()}
                        /> : null}
                    </div>
                </div>

                <div className="categorydrinks-manager__content">
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
                    title={"Thêm mới nhóm mặt hàng quầy bar"}
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
                        <div className="categorydrinks-manager__popup">
                            <Input
                                label={"Mã nhóm mặt hàng"}
                                defaultValue={categoryCode}
                                onChange={(val) => {
                                    setCategoryCode(val);
                                }}
                                autoFocus
                            />
                            <Input
                                label={"Tên nhóm mặt hàng"}
                                defaultValue={categoryName}
                                onChange={(val) => { setCategoryName(val) }}
                                autoFocus
                            />
                            <Input
                                label={"Ghi chú"}
                                defaultValue={categoryNote}
                                onChange={(val) => {
                                    setCategoryNote(val);
                                }}
                                autoFocus
                            />
                            
                        </div>
                    }
                />
            </div>
        </AdminPage>

    )

}
export default CategoryDrinks