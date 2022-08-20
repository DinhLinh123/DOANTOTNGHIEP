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
      <div className="categorydrinks-manager">
        <div className="categorydrinks-manager__filter">
          <div className="categorydrinks-manager__filter-name">
            <InputField
              placeholder={"Mã nhóm mặt hàng"}
              width={"100%"}
              label={"Mã nhóm mặt hàng"}
              onChange={(val) => {
                setTimeout(() => {
                  setTextSearch(val);
                }, 200);
              }}
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
              defaultValue={moment().unix() * 1000}
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
            <Button2
              name={"Thêm mới ưu đãi"}
              leftIcon={<PlusOutlined />}
              onClick={() => handleClickAddnew()}
            />
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
              onClick={() => callApiAddPromotion()}
              background="#fa983a"
            />,
          ]}
          width={600}
          //className={"staff-manager-create"}
          body={
            <div className="categorydrinks-manager__popup">
              <Input
                label={"Tên ưu đãi"}
                defaultValue={promotionName}
                onChange={(val) => {
                  setPromotionName(val);
                }}
              />
              <Input
                label={"Mô tả ưu đãi"}
                defaultValue={promotionDescribe}
                onChange={(val) => {
                  setPromotionDescribe(val);
                }}
              />
              <div className="menu-manager__popup-content-buffet-image">
                <div className="menu-manager__popup-content-buffet-image-title">
                  Ảnh
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
