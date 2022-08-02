import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, SORT_TYPE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./pay.scss"
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import { Tooltip } from "antd";
import { changeAccount } from "../../../../../reudux/action/accountAction";

function Spending(props) {

    const [listArea, setListArea] = useState([
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "name": "string",
            "htmlObject": "string",
            "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "createdByUserName": "string",
            "createdOnDate": "2022-07-31T10:59:45.471Z",
            "lastModifiedByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "lastModifiedByUserName": "string"
        },
        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
            "name": "string",
            "htmlObject": "string",
            "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "createdByUserName": "string",
            "createdOnDate": "2022-07-31T10:59:45.471Z",
            "lastModifiedByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "lastModifiedByUserName": "string"
        },

        {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa8",
            "name": "string",
            "htmlObject": "string",
            "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "createdByUserName": "string",
            "createdOnDate": "2022-07-31T10:59:45.471Z",
            "lastModifiedByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "lastModifiedByUserName": "string"
        },
    ]);
    const [itemBill, setItemBill] = useState("");
    const [itemBillDate, setItemBillDate] = useState("");
    const [listItems, setListItems] = useState([{ name: "", unit: "", amount: "", unitprice: "" }]);
    const [itemImage, setItemImage] = useState("");
    const [itemNote, setItemNote] = useState("");
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);


    return (

        <AdminPage
            title={"Thanh toán hóa đơn"}
            index={MENU_TAB_ADMIN.PAY}
        >
            <div className="pay-manager">
                <div className="pay-manager__area">
                    {
                        listArea?.map
                    }
                    <div className="pay-manager__area">

                    </div>
                </div>
                <div className="pay-manager__bill">

                </div>
            </div>
        </AdminPage>

    )

}
export default Spending