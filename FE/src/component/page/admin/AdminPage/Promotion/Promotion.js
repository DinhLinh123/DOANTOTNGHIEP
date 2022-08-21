import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  ONE_DAY,
  SORT_TYPE,
  TYPE_MESSAGE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./promotion.scss";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import TimePicker from "../../../../base/TimePicker/TimePicker";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import { useDispatch } from "react-redux";
import baseApi from "../../../../../api/baseApi";
import { API_MENU, API_PROMOTION } from "../../../../base/common/endpoint";
import commonFunction from "../../../../base/common/commonFunction";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import RadioCheck from "../../../../base/Radio/Radio";
import Dropdown from "../../../../base/Dropdown/Dropdown";

function Promotion(props) {
  const [sortType, setSortType] = useState();
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState({
    show: false,
    title: "",
    key: -1,
  });
  const [promotionName, setPromotionName] = useState("");
  const [promotionDescribe, setPromotionDescribe] = useState("");
  const [promotionType, setPromotionType] = useState(0);
  const [promotionStatus, setPromotionStatus] = useState(0);
  const [promotionNote, setPromotionNote] = useState("");
  const [promotionUnit, setPromotionUnit] = useState(0);
  const [dataTotal, setDataTotal] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const [moneyPromotion, setMoneyPromotion] = useState(0);
  const [idFood, setIdFood] = useState('');
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const COLUMN_TABLE_INDEX_MENU = {
    NAME: "name",
    DESCRIBE: "describe",
    IMAGE: "image",
    TYPE: "type",
    UNIT: "unit",
    MONEY: "money",
    NOTE: "note",
    STATUS: "status",
  };

  const columns = [
    {
      title: "Tên ưu đãi",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
      width: "200px",
    },
    {
      title: "Mô tả ưu đãi",
      dataIndex: COLUMN_TABLE_INDEX_MENU.DESCRIBE,
      width: "300px",
    },
    {
      title: "Ảnh",
      dataIndex: COLUMN_TABLE_INDEX_MENU.IMAGE,
      width: "250px",
    },
    {
      title: "Loại ưu đãi",
      dataIndex: COLUMN_TABLE_INDEX_MENU.TYPE,
      width: "200px",
    },
    {
      title: "Đơn vị tính",
      dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
      sorter: true,
      width: "100px",
    },
    {
      title: "Giá ưu đãi",
      dataIndex: COLUMN_TABLE_INDEX_MENU.MONEY,
      width: "150px",
    },
    {
      title: "Ghi chú",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
      width: "200px",
    },
    {
      title: "Trạng thái",
      dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS,
      sorter: true,
      width: "100px",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Giảm 10% cho tổng hóa đơn lớn hơn 2tr",
      describe: "Giảm 10% cho tổng hóa đơn lớn hơn 2tr. áp dụng từ thứ 2 đến thứ 6 hàng tuần",
      image: "",
      type: "Trừ tiền trên tổng hóa đơn",
      unit: "%",
      money: "10",
      note: "Bàn đi từ 2 người",
      status: "Hiệu lực",
    },
    
  ];
  const dataMenu = [
    {
      value: "1",
      label: "buffet 199k",
    },
    {
      value: "2",
      label: "buffet 299k",
    },
  ];

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
  useEffect(() => {
    callApiGetPromotion();
  }, []);

  useEffect(() => {
    callApiGetPromotion();
  }, [textSearch]);

  function columnName(item) {
    return <div>{item?.name}</div>;
  }
  function columnDescribe(item) {
    return <div>{item?.describe}</div>;
  }
  function columnImage(item) {
    return <div>{item?.image}</div>;
  }
  function columnType(item) {
    return <div>{item?.type}</div>;
  }
  function columnUnit(item) {
    return <div>{item?.unit}</div>;
  }
  function columnMoney(item) {
    return <div>{item?.money}</div>;
  }
  function columnNote(item) {
    return <div>{item?.nute}</div>;
  }
  function columnStatus(item) {
    return <div>{item?.status}</div>;
  }

  function convertDataTable(dataTable) {
    let listData;
    listData = dataTable.map((item, idx) => {
      return {
        [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
        [COLUMN_TABLE_INDEX_MENU.DESCRIBE]: columnDescribe(item),
        [COLUMN_TABLE_INDEX_MENU.IMAGE]: columnImage(item),
        [COLUMN_TABLE_INDEX_MENU.TYPE]: columnType(item),
        [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
        [COLUMN_TABLE_INDEX_MENU.MONEY]: columnMoney(item),
        [COLUMN_TABLE_INDEX_MENU.NOTE]: columnNote(item),
        [COLUMN_TABLE_INDEX_MENU.STATUS]: columnStatus(item),
        key: idx,
      };
    });
    return [...listData];
  }
  const dataType = [
    {
      value: "0",
      label: "Trừ tiền trên tổng hóa đơn",
    },
    {
      value: "1",
      label: "Trừ tiền theo món ăn",
    },
  ];
  const dataStatus = [
    {
      value: "0",
      label: "Hiệu lực",
    },
    {
      value: "1",
      label: "Hết hiệu lực",
    },
  ];

  function handleClickAddnew(type) {
    setIsShowPopupAddnew({ show: true, title: "Thêm mới ưu đãi", key: 0 });
  }

  function callApiGetPromotion() {
    dispatch(changeLoadingApp(true));
    let param = {
      TextSearch: textSearch,
    };
    baseApi.get(
      (res) => {
        //setDataTable(res.data || []);
        setDataTotal(res?.data?.length);
        dispatch(changeLoadingApp(false));
      },
      () => {
        dispatch(changeLoadingApp(false));
      },
      null,
      API_PROMOTION.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param)),
      null,
      {}
    );
  }

  function callApiAddPromotion() {
    dispatch(changeLoadingApp(true));
    let body = {
      name: promotionName,
      anh: images,
      noiDung: "",
      giaTri: 0,
      theLoai: "string",
      createdByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdByUserName: "string",
      createdOnDate: "2022-08-17T13:45:27.692Z",
      lastModifiedByUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lastModifiedByUserName: "string",
    };
    baseApi.post(
      (res) => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupAddnew({ show: false, title: "", key: -1 });
        callApiGetPromotion();
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm món thành công");
      },
      () => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupAddnew({ show: false, title: "", key: -1 });
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm món thất bại");
      },
      null,
      API_PROMOTION.CREATE_NEW,
      null,
      body
    );
  }

  return (
    <AdminPage title={"Quản lý ưu đãi"} index={MENU_TAB_ADMIN.PROMOTION}>
      <div className="promotion-manager">
        <div className="promotion-manager__filter">
          <div className="promotion-manager__filter-name">
            <InputField
              placeholder={"Tên ưu đãi"}
              width={"100%"}
              label={"Tên ưu đãi"}
              onChange={(val) => {
                setTimeout(() => {
                  setTextSearch(val);
                }, 200);
              }}
            />
          </div>
          <div className="promotion-manager__filter-phone">
          <Dropdown
              listOption={dataType}
              placeholder={"Loại ưu đãi"}
              title={"Loại ưu đãi"}
            />
          </div>
          <div className="promotion-manager__filter-date">
          <Dropdown
              listOption={dataStatus}
              placeholder={"Trạng thái"}
              title={"Trạng thái"}
            />
          </div>
          <div className="promotion-manager__filter-create-new">
            <Button2
              name={"Thêm mới ưu đãi"}
              leftIcon={<PlusOutlined />}
              onClick={() => handleClickAddnew()}
            />
          </div>
        </div>

        <div className="promotion-manager__content">
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
          title={isShowPopupAddnew.title}
          show={isShowPopupAddnew.show}
          onClickClose={() =>
            setIsShowPopupAddnew({ show: false, title: "", key: -1 })
          }
          button={[
            <Button2
              name={"Đóng"}
              onClick={() =>
                setIsShowPopupAddnew({ show: false, title: "", key: -1 })
              }
            />,
            <Button2
              name={"Lưu"}
              // onClick={() => callApiAddPromotion()}
              background="#fa983a"
              disabled={promotionName == "" || promotionDescribe == "" || moneyPromotion == "" || images == ""}
            />,
          ]}
          width={600}
          //className={"staff-manager-create"}
          body={
            <div className="promotion-manager__popup">
              <Input
                label={"Tên ưu đãi"}
                defaultValue={promotionName}
                onChange={(val) => {
                  setPromotionName(val);
                }}
                required
              />
              <Input
                label={"Mô tả ưu đãi"}
                defaultValue={promotionDescribe}
                onChange={(val) => {
                  setPromotionDescribe(val);
                }}
                required
              />
              <div className="promotion-manager__popup-image">
                <div className="promotion-manager__popup-image-title">
                  Ảnh <span style={{color: "red"}}>*</span>
                </div>
                <ImageUpload
                  maxImage={1}
                  images={images}
                  setImages={(val) => {
                    setImages(val);
                  }}
                />
              </div>
              <RadioCheck
                listOption={[
                  { label: "Trừ tiền trên tổng hóa đơn", value: 0 },
                  { label: "trừ tiền theo món ăn", value: 1 },
                ]}
                title={"Loại ưu đãi"}
                valueDefault={parseInt(promotionType)}
                onChange={(val) => {
                  setPromotionType(val);
                }}
              />
              {promotionType === 1 && (
                <div className="">
                  <Dropdown
                    listOption={dataMenu}
                    defaultValue={dataMenu[0]}
                    placeholder={"Tên món ăn"}
                    title={"Tên món ăn"}
                    style={{ width: "100%" }}
                    onChange={(val)=>{setIdFood(val)}}
                    required
                  />
                </div>
              )}

              <RadioCheck
                listOption={[
                  { label: "%", value: 0 },
                  { label: "vnđ", value: 1 },
                ]}
                title={"Đơn vị tính"}
                valueDefault={parseInt(promotionUnit)}
                onChange={(val) => {
                  setPromotionUnit(val);
                }}
              />
              <Input
                label={"Gía ưu đãi"}
                defaultValue={moneyPromotion}
                onChange={(val) => {
                  setMoneyPromotion(val);
                }}
                required
              />
              <Input
                label={"Ghi chú"}
                defaultValue={promotionNote}
                onChange={(val) => {
                  setPromotionNote(val);
                }}
              />
              <RadioCheck
                listOption={[
                  { label: "Hiệu lực", value: 0 },
                  { label: "Hết hiệu lực", value: 1 },
                ]}
                title={"Trạng thái"}
                valueDefault={parseInt(promotionStatus)}
                onChange={(val) => {
                  setPromotionStatus(val);
                }}
              />
            </div>
          }
        />
      </div>
    </AdminPage>
  );
}
export default Promotion;
