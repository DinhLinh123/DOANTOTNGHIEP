import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  SORT_TYPE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./pay.scss";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import { Tooltip } from "antd";
import { changeAccount } from "../../../../../reudux/action/accountAction";

function Spending(props) {
  const [listTable, setListTable] = useState([
    {
      id: "6879a96c-aff7-4a34-13bc-08da7223d6dd",
      name: "bàn 1",
      soNguoiToiDa: 5,
      loaiBan: "string",
      kieuDang: "0",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T12:05:12.302",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "1",
      tenKhuVuc: "Tầng 1",
      status: 2
    },
    {
      id: "6879a96c-aff7-4a34-13bc-08da7223d6df",
      name: "bàn 2",
      soNguoiToiDa: 5,
      loaiBan: "string",
      kieuDang: "1",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T12:05:12.302",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "1",
      tenKhuVuc: "Tầng 1",
      status: 0
    },
    {
      id: "6879a96c-aff7-4a34-13bc-08da7223d6dg",
      name: "bàn 6",
      soNguoiToiDa: 5,
      loaiBan: "string",
      kieuDang: "0",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T12:05:12.302",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "1",
      tenKhuVuc: "Tầng 1",
      status: 2
    },
    {
      id: "6879a96c-aff7-4a34-13bc-08da7223d6dh",
      name: "bàn 5",
      soNguoiToiDa: 5,
      loaiBan: "string",
      kieuDang: "1",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T12:05:12.302",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "1",
      tenKhuVuc: "Tầng 1",
      status: 1
    },

    {
      id: "6879a96c-aff7-4a34-13bc-08da7223d6d7",
      name: "bàn 7",
      soNguoiToiDa: 5,
      loaiBan: "string",
      kieuDang: "0",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T12:05:12.302",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "1",
      tenKhuVuc: "Tầng 1",
      status: 0
    },
    {
      id: "6879a96c-aff7-4a34-13bc-08da7223d6d4",
      name: "bàn 8",
      soNguoiToiDa: 5,
      loaiBan: "string",
      kieuDang: "1",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T12:05:12.302",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "1",
      tenKhuVuc: "Tầng 1",
      status: 0
    },

    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "bàn 3",
      soNguoiToiDa: 0,
      loaiBan: "string",
      kieuDang: "2",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-07-30T09:42:33.461",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
      idKhuVuc: "2",
      tenKhuVuc: "Tầng 2",
      status: 1
    },
  ]);

  const [listArea, setListArea] = useState([
    {
      id: "1",
      name: "Tầng 1",
      htmlObject: "string",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-08-02T15:12:10.380Z",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
    },
    {
      id: "2",
      name: "Tầng 2",
      htmlObject: "string",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-08-02T15:12:10.380Z",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
    },
  ]);

  const [itemBill, setItemBill] = useState("");
  const [itemBillDate, setItemBillDate] = useState("");
  const [listItems, setListItems] = useState([
    { name: "", unit: "", amount: "", unitprice: "" },
  ]);
  const [itemImage, setItemImage] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);

  return (
    <AdminPage title={"Thanh toán hóa đơn"} index={MENU_TAB_ADMIN.PAY}>
      <div className="pay-manager">
        <div className="pay-manager__area">
          {listArea?.map((item) => {
            return (
              <>
                <div className="pay-manager__area-name">{item?.name}</div>
                <div className="pay-manager__area-table">
                  {listTable?.map((_item) => {
                    debugger;
                    if (_item?.idKhuVuc === item?.id) {
                      return (
                        <div className="pay-manager__area-table-name"
                        style={{
                            backgroundColor: _item.status == 0 ? '#dcdde1' : _item.status == 1 ? '#c23616' : '#fbc531',
                      color: _item.status == 0 ? '#000' : _item.status == 1 ? '#fff' : '#fff'
                        }}
                        >
                          {_item?.name}
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            );
          })}
        </div>
        <div className="pay-manager__bill"></div>
      </div>
    </AdminPage>
  );
}
export default Spending;
