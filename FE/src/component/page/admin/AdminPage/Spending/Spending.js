import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  SORT_TYPE,
  TYPE_MESSAGE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./spending.scss";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import { Tooltip } from "antd";
import { changeAccount } from "../../../../../reudux/action/accountAction";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpending, getSpending, postSpending } from "../../../../../reudux/action/spendingsAction";
import moment from "moment";
import commonFunction from "../../../../base/common/commonFunction";

function Spending(props) {
  const [sortType, setSortType] = useState();
  const [itemBill, setItemBill] = useState("");
  const [itemBillDate, setItemBillDate] = useState("");
  const [listItems, setListItems] = useState([
    { name: "", unit: "", amount: "", unitprice: "" },
  ]);
  const [itemImage, setItemImage] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
  const [textSearch, setTextSearch] = useState("")
  console.log("textSearch", textSearch);
  const COLUMN_TABLE_INDEX_MENU = {
    BILL: "namebill",
    AMOUNT: "amount",
    BILLDate: "billdate",
    TOTALMONEY: "totalmoney",
    DATAENTRYDATE: "dataentrydate",
    DATAENTRYPERSON: "dataentryperson",
    STATUS: "status",
  };

  const columns = [
    {
      title: "Tên hóa đơn",
      dataIndex: COLUMN_TABLE_INDEX_MENU.BILL,
      width: "200px",
    },
    {
      title: "SL mặt hàng",
      dataIndex: COLUMN_TABLE_INDEX_MENU.AMOUNT,
      width: "100px",
    },
    {
      title: "Ngày hóa đơn",
      dataIndex: COLUMN_TABLE_INDEX_MENU.BILLDate,
      sorter: true,
      width: "200px",
    },
    {
      title: "Tổng tiền",
      dataIndex: COLUMN_TABLE_INDEX_MENU.TOTALMONEY,
      width: "150px",
    },
    {
      title: "Ngày nhập",
      dataIndex: COLUMN_TABLE_INDEX_MENU.DATAENTRYDATE,
      sorter: true,
      width: "200px",
    },
    {
      title: "Người nhập",
      dataIndex: COLUMN_TABLE_INDEX_MENU.DATAENTRYPERSON,
      width: "200px",
    },
    {
      title: "Trạng thái",
      dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS,
      width: "200px",
    },
  ];

  const data = [
    {
      key: "1",
      namebill: "HD2807",
      amount: 5,
      billdate: "28/07/2022",
      totalmoney: "250,000",
      dataentrydate: "28/07/2022",
      dataentryperson: "Linhdtt",
      status: "Nhập mới",
    },
    {
      key: "2",
      namebill: "HD2807",
      amount: 5,
      billdate: "28/07/2022",
      totalmoney: "250,000",
      dataentrydate: "28/07/2022",
      dataentryperson: "Linhdtt",
      status: "Nhập mới",
    },
    {
      key: "3",
      namebill: "HD2807",
      amount: 5,
      billdate: "28/07/2022",
      totalmoney: "250,000",
      dataentrydate: "28/07/2022",
      dataentryperson: "Linhdtt",
      status: "Nhập mới",
    },
    {
      key: "4",
      namebill: "HD2807",
      amount: 5,
      billdate: "28/07/2022",
      totalmoney: "250,000",
      dataentrydate: "28/07/2022",
      dataentryperson: "Linhdtt",
      status: "Nhập mới",
    },
  ];

  const getQuyen = JSON.parse(localStorage.getItem("quyen"))

  const quyen = getQuyen

  const quyen1 = quyen?.find((item) => item === "0-1-0")
  const quyen2 = quyen?.find((item) => item === "0-1-1")
  const quyen3 = quyen?.find((item) => item === "0-1-2")

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
  }
  const OPTION_MORE_TABLE = [
    {
      title: "Chi tiết",
      onSelect: (item) => {
        console.log("item", item);
        window.open(`/admin/spending/detail/${item.key}`, "_self");
      },
    },
    // {
    //   title: "Gửi phê duyệt",
    //   onSelect: () => {
    //     alert("Sửa");
    //   },
    // },
    {
      title: "Xóa",
      onSelect: (item) => {
        if(quyen3 === "0-1-2"){
          dispatch(deleteSpending(item.key))
        }else{
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa chi tiêu")
        }
      },
    },
  ];

  function columnBill(item) {
    return <div>{item?.name}</div>;
  }
  function columnAmount(item) {
    const matHang = JSON.parse(item?.matHang)
    return <div>{matHang.length}</div>;
  }
  function columnBillDate(item) {
    return (
      <div>{moment(item?.ngayHoaDon).format("DD-MM-YYYY")}</div>
    );
  }
  function columnTotalmoney(item) {
    return <div>{item?.tongSoTien}</div>;
  }
  function columnDataentrydate(item) {
    return <div>{moment(item?.createdOnDate).format("DD-MM-YYYY")}</div>;
  }
  function columnDataentryperson(item) {
    return <div>{item?.createdByUserName}</div>;
  }
  function columnStatus(item) {
    return <div>{item?.trangThaiHienTai}</div>;
  }

  function convertDataTable(dataTable) {
    let listData;
    listData = dataTable?.map((item, idx) => {
      return {
        [COLUMN_TABLE_INDEX_MENU.BILL]: columnBill(item),
        [COLUMN_TABLE_INDEX_MENU.AMOUNT]: columnAmount(item),
        [COLUMN_TABLE_INDEX_MENU.BILLDate]: columnBillDate(item),
        [COLUMN_TABLE_INDEX_MENU.TOTALMONEY]: columnTotalmoney(item),
        [COLUMN_TABLE_INDEX_MENU.DATAENTRYDATE]: columnDataentrydate(item),
        [COLUMN_TABLE_INDEX_MENU.DATAENTRYPERSON]: columnDataentryperson(item),
        [COLUMN_TABLE_INDEX_MENU.STATUS]: columnStatus(item),
        key: item.id,
      };
    });
    return [...listData];
  }

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
  }
  //thêm nhiều mặt hàng

  function ChangeNameItems(val, index) {
    let _listItems = [...listItems];
    _listItems[index].name = val;
    setListItems(_listItems);
  }

  function ChangeUnitItems(val, index) {
    let _listItems = [...listItems];
    _listItems[index].unit = val;
    setListItems(_listItems);
  }

  function ChangeAmountItems(val, index) {
    let _listItems = [...listItems];
    _listItems[index].amount = val;
    setListItems(_listItems);
  }

  function ChangeUnitpriceItems(val, index) {
    let _listItems = [...listItems];
    _listItems[index].unitprice = val;
    setListItems(_listItems);
  }

  function deleteItems(index) {
    let _listItems = [...listItems];
    _listItems.splice(index, 1);
    setListItems(_listItems);
  }

  function addIteams() {
    let _listItems = [...listItems];
    _listItems.push({ name: "", unit: "", amount: "", unitprice: "" });
    setListItems(_listItems);
  }
  const Card = (props) => {
    const {
      listItems,
      ChangeNameItems,
      ChangeUnitItems,
      ChangeAmountItems,
      ChangeUnitpriceItems,
      deleteItems,
    } = props;
    return (
      <>
        {listItems?.map((item, index) => {
          return (
            <div className="spending-manager__popup-items">
              <div className="spending-manager__popup-items-name">
                <Input
                  label={"Tên mặt hàng"}
                  defaultValue={item.name}
                  onBlurInput={(val) => {
                    ChangeNameItems(val, index);
                  }}
                />
              </div>
              <div className="spending-manager__popup-items-unit">
                <Input
                  label={"Đơn vị tính"}
                  defaultValue={item.unit}
                  onBlurInput={(val) => {
                    ChangeUnitItems(val, index);
                  }}
                />
              </div>
              <div className="spending-manager__popup-items-amount">
                <Input
                  label={"Số lượng"}
                  defaultValue={item.amount}
                  onBlurInput={(val) => {
                    ChangeAmountItems(val, index);
                  }}
                />
              </div>
              <div className="spending-manager__popup-items-unitPrice">
                <Input
                  label={"Đơn giá"}
                  defaultValue={item.unitprice}
                  onBlurInput={(val) => {
                    ChangeUnitpriceItems(val, index);
                  }}
                />
              </div>
              {index > 0 && (
                <div className="spending-manager__popup-items-delete">
                  <Tooltip title={"Xóa món"}>
                    <DeleteOutlined
                      onClick={() => deleteItems(index)}
                      style={{ color: "red" }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  function renderTotalMoney(data) {
    let total = 0
    data?.map((item) => {
      total += item?.amount * item?.unitprice
    })
    return total;
  }


  const onSubmitSave = () => {
    const userName = JSON.parse(localStorage.getItem("roleType"))
    const date = new Date();
    const body = {
      name: itemBill,
      ngayHoaDon: date.setHours(0,0,0,0).toISOString(itemBillDate),
      // ngayHoaDon: `${date.getDate(itemBillDate)}-${date.getMonth(itemBillDate)}-${date.getFullYear(itemBillDate)}`,
      matHang: JSON.stringify(listItems),
      tongSoTien: parseInt(commonFunction.numberWithCommas(renderTotalMoney((listItems))), 10),
      createdByUserName: userName.userName,
      createdOnDate: date
    };
    setIsShowPopupAddnew(false);
    dispatch(postSpending(body))
    setListItems([
      { name: "", unit: "", amount: "", unitprice: "" },
    ])
    setItemBill()
    commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm chi tiêu thành công")
  };

  const { dataSpending } = useSelector((state) => state.spendingsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpending({textSearch}));
  }, [dispatch, textSearch]);

  return (
    <AdminPage title={"Quản lý chi tiêu"} index={MENU_TAB_ADMIN.SPENDING}>
      <div className="spending-manager">
        <div className="spending-manager__filter">
          <div className="spending-manager__filter-search">
            <div className="spending-manager__filter-search-name">
              <Input label={"Tên hóa đơn"} placeholder={"Tên hóa đơn"} onChange = {event => setTextSearch(event)} />
            </div>
            <div className="spending-manager__filter-search-date">
              <DatePicker placeholder="dd/MM/yyyy" label={"Ngày hóa đơn"} 
              // onChange = {val => {
              //   const date = new Date();
              //   console.log(date.setHours(0,0,0,0));
              //   setTextSearch(date.toISOString(val))
              // }} 
              />
            </div>
          </div>
          <div className="spending-manager__filter-create-new">
            {quyen1 === "0-1-0" ?  <Button2
              name={"Thêm mới chi tiêu"}
              leftIcon={<PlusOutlined />}
              onClick={() => handleClickAddnew()}
            /> : null}
          </div>
        </div>
        <div className="spending-manager__content">
          <TableBase
            // onChangePagination={(page, pageSize)=>{}}
            columns={columns}
            total={90}
            data={convertDataTable(dataSpending)}
            loading={false}
            hasMoreOption
            option={OPTION_MORE_TABLE}
            setObjectSort={(field, order) => {
              setSortType({
                field: field,
                order: order,
              });
            }}
            // onClickRow={(record, rowIndex, event) => {
            //   window.open(`/admin/spending/detail/${record.key}`, "_self");
            // }}
            onContextMenu={(record, rowIndex, event) => { }}
          />
        </div>
        <Popup
          title={"Thêm mới Chi tiêu"}
          show={isShowPopupAddnew}
          onClickClose={() => setIsShowPopupAddnew(false)}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => setIsShowPopupAddnew(false)}
            />,
            <Button2
              name={"Lưu"}
              onClick={() => onSubmitSave()}
              background="#fa983a"
            />,
          ]}
          width={1000}
          //className={"menu-popup-create"}
          body={
            <div className="spending-manager__popup">
              <div className="spending-manager__popup-bill">
                <Input
                  label={"Tên hóa đơn"}
                  value={itemBill}
                  onChange={(val) => {
                    setItemBill(val);
                  }}
                  autoFocus
                />
              </div>
              <div className="spending-manager__popup-bill">
                <DatePicker
                  defaultValue={itemBillDate}
                  onChange={(val) => {
                    setItemBillDate(val);
                  }}
                  placeholder="dd/MM/yyyy"
                  label={"Ngày hóa đơn"}
                />
              </div>
              <div className="spending-manager__popup-buttonAdd">
                <Button2
                  name={"Thêm mặt hàng"}
                  background={"#ff9f43"}
                  onClick={() => addIteams()}
                />
              </div>
              <Card
                listItems={listItems}
                ChangeNameItems={(val, item) => ChangeNameItems(val, item)}
                ChangeUnitItems={(val, item) => ChangeUnitItems(val, item)}
                ChangeAmountItems={(val, item) => ChangeAmountItems(val, item)}
                ChangeUnitpriceItems={(val, item) =>
                  ChangeUnitpriceItems(val, item)
                }
                deleteItems={(index) => deleteItems(index)}
              />
              <div className="menu-manager__popup-content_privateDish_status">
                Ảnh
              </div>
              <div>
                <ImageUpload
                  maxImage={1}
                  images={itemImage}
                  setImages={(val) => {
                    setItemImage(val);
                  }}
                />
              </div>
              <Input
                label={"Ghi chú"}
                defaultValue={itemNote}
                onChange={(val) => {
                  setItemNote(val);
                }}
                autoFocus
              />
            </div>
          }
        />
      </div>
    </AdminPage>
  );
}
export default Spending;
