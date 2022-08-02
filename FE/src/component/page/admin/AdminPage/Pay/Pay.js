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

    const [sortType, setSortType] = useState();
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
                
            </div>
        </AdminPage>

    )

}
export default Spending