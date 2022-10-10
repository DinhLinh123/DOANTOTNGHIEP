import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  ONE_DAY,
  PART_SWAGGER,
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
import { API_MENU, API_PROMOTION, UPLOAD_FILE } from "../../../../base/common/endpoint";
import commonFunction from "../../../../base/common/commonFunction";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import RadioCheck from "../../../../base/Radio/Radio";
import Dropdown from "../../../../base/Dropdown/Dropdown";
import ModalConfirm from "../../../../base/ModalConfirm/ModalConfirm";

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
  const [promotionDetail, setPromotionDetail] = useState({});
  const [dataTotal, setDataTotal] = useState(0);
  const [dataTable, setDataTable] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [moneyPromotion, setMoneyPromotion] = useState(0);
  const [idFood, setIdFood] = useState('');
  const [images, setImages] = useState([]);
  const [isShowPopupComfirmDelete, setIsShowPopupComfirmDelete] = useState({ show: false, item: '' });
  const [listMenu, setListMenu] = useState([]);

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

  const OPTION_MORE_TABLE = [
    {
      title: "Sửa",
      onSelect: (item) => {
        handleEdit(item?.item)
      },
    },
    {
      title: "Xóa",
      onSelect: (item) => {
        setIsShowPopupComfirmDelete({ show: true, item: item?.item })
      },
    },
  ];

  function handleEdit(item) {
    setIdFood(item?.idDoAn);
    setPromotionName(item?.name);
    setPromotionDescribe(item?.noiDung);
    setPromotionType(item?.loaiUuDai);
    setPromotionStatus(item?.trangThai);
    setPromotionNote(item?.noiDung);
    setPromotionUnit(item?.donViTinh);
    setMoneyPromotion(item?.giaTri)
    setPromotionDetail(item)
    setIsShowPopupAddnew({
      show: true,
      title: "Sửa ưu đãi",
      key: 1,
      id: item?.id
    })
    setImages(item?.anh)
  }


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
    return <div>{item?.noiDung}</div>;
  }
  function columnImage(item) {
    return <div style={{width: '100px', height:'100px', display: 'flex','align-items': 'center'}}><img src={item?.anh} style={{width: '100%', maxHeight: '100%'}}/></div>;
  }
  function columnType(item) {
    switch (item?.loaiUuDai) {
      case 0:
        return <div>Trừ tiền trên tổng hóa đơn</div>;
      case 1:
        return <div>Trừ tiền theo món ăn</div>;
      default:
        break;
    }

  }
  function columnUnit(item) {
    switch (item?.donViTinh) {
      case 0:
        return <div>%</div>;
      case 1:
        return <div>VND</div>;
      default:
        break;
    }
  }
  function columnMoney(item) {
    return <div>{item?.giaTri}</div>;
  }
  function columnNote(item) {
    return <div>{item?.nute}</div>;
  }
  function columnStatus(item) {
    switch (item?.trangThai) {
      case 0:
        return <div>Còn hiệu lực</div>;
      case 1:
        return <div>Hết hiệu lực</div>;
      default:
        break;
    }
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
        item: item
      };
    });
    return [...listData];
  }

  function handleClickAddnew() {
    setIsShowPopupAddnew({ show: true, title: "Thêm mới ưu đãi", key: 0 });
  }

  function callApiGetPromotion() {
    dispatch(changeLoadingApp(true));
    let param = {
      TextSearch: textSearch,
    };
    baseApi.get(
      (res) => {
        setDataTable(res.data || []);
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
      "name": promotionName,
      "anh": images,
      "noiDung": promotionDescribe,
      "giaTri": moneyPromotion,
      "loaiUuDai": promotionType,
      "donViTinh": promotionUnit,
      "trangThai": promotionStatus,
      "idDoAn": idFood == '' ? "00000000-0000-0000-0000-000000000000" : idFood,
      "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdByUserName": "string",
      "createdOnDate": "2022-08-21T09:28:19.003Z"
    };
    baseApi.post(
      (res) => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupAddnew({ show: false, title: "", key: -1 });
        callApiGetPromotion();
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm ưu đãi thành công");
      },
      () => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupAddnew({ show: false, title: "", key: -1 });
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm ưu đãi thất bại");
      },
      null,
      API_PROMOTION.CREATE_NEW,
      null,
      body
    );
  }

  function callApiUpdatePromotion() {
    dispatch(changeLoadingApp(true));
    let body = promotionDetail
    body.name = promotionName;
    body.anh = images;
    body.noiDung = promotionDescribe;
    body.giaTri = moneyPromotion;
    body.loaiUuDai = promotionType;
    body.donViTinh = promotionUnit;
    body.trangThai = promotionStatus;
    body.idDoAn = idFood == '' ? "00000000-0000-0000-0000-000000000000" : idFood;
    baseApi.put(
      (res) => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupAddnew({ show: false, title: "", key: -1 });
        callApiGetPromotion();
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa ưu đãi thành công");
      },
      () => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupAddnew({ show: false, title: "", key: -1 });
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa ưu đãi thất bại");
      },
      null,
      API_PROMOTION.UPDATE_BY_ID + isShowPopupAddnew.id,
      null,
      body
    );
  }

  function callDeletePromotion() {
    dispatch(changeLoadingApp(true));
    baseApi.delete(
      (res) => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupComfirmDelete({ show: false, title: "", key: -1 });
        callApiGetPromotion();
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa ưu đãi thành công");
      },
      () => {
        dispatch(changeLoadingApp(false));
        setIsShowPopupComfirmDelete({ show: false, title: "", key: -1 });
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa ưu đãi thất bại");
      },
      null,
      API_PROMOTION.DELETE_BY_ID + isShowPopupComfirmDelete?.item.id,
      null,
      {}
    );
  }

  useEffect(() => {
    if (isShowPopupAddnew.show) {
      baseApi.get(
        (res) => {
          let data = res.data?.map((item) => {
            return ({
              value: item.id,
              label: item.name,
            })
          }
          )
          setListMenu(data)
        },
        () => {
        },
        null,
        API_MENU.GET_ALL,
        null,
        {}
      )
    }
  }, [isShowPopupAddnew]);

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
            total={dataTotal}
            data={convertDataTable(dataTable)}
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
              onClick={() => {
                if (isShowPopupAddnew.key === 0) {
                  callApiAddPromotion()
                } else {
                  callApiUpdatePromotion()
                }
              }}
              background="#fa983a"
              disabled={promotionName == ""
                || promotionDescribe == ""
                || moneyPromotion == ""
                // || images == ""
              }
            />,
          ]}
          width={600}
          body={
            <div className="promotion-manager__popup">
              <Input
                label={"Tên ưu đãi"}
                value={promotionName}
                onChange={(val) => {
                  setPromotionName(val);
                }}
                required
              />
              <Input
                label={"Mô tả ưu đãi"}
                value={promotionDescribe}
                onChange={(val) => {
                  setPromotionDescribe(val);
                }}
                required
              />
              <div className="promotion-manager__popup-image">
                <div className="promotion-manager__popup-image-title">
                  Ảnh <span style={{ color: "red" }}>*</span>
                </div>
                <ImageUpload
                  maxImage={1}
                  images={images}
                  setImages={(val) => {
                    debugger
                    let img = val[0].file
                    let formData = new FormData();
                    formData.append('files', img)
                    baseApi.post(
                      (res) => {
                        setImages(PART_SWAGGER+res.data[0]);
                      },
                      () => { debugger},
                      null,
                      UPLOAD_FILE,
                      {},
                      formData
                    )
                  }}
                />
              </div>
              <RadioCheck
                listOption={[
                  { label: "Trừ tiền trên tổng hóa đơn", value: 0 },
                  { label: "Trừ tiền theo món ăn", value: 1 },
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
                    listOption={listMenu}
                    defaultValue={listMenu[0]}
                    placeholder={"Tên món ăn"}
                    title={"Tên món ăn"}
                    style={{ width: "100%" }}
                    onChange={(val) => { setIdFood(val) }}
                    required
                  />
                </div>
              )}

              <RadioCheck
                listOption={[
                  { label: "%", value: 0 },
                  { label: "VND", value: 1 },
                ]}
                title={"Đơn vị tính"}
                valueDefault={parseInt(promotionUnit)}
                onChange={(val) => {
                  setPromotionUnit(val);
                }}
              />
              <Input
                label={"Giá ưu đãi"}
                value={moneyPromotion}
                onChange={(val) => {
                  setMoneyPromotion(val);
                }}
                required
              />
              <Input
                label={"Ghi chú"}
                value={promotionNote}
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
        <ModalConfirm
          title={"ưu đãi"}
          setShow={(val) => setIsShowPopupComfirmDelete({ show: val, item: '' })}
          show={isShowPopupComfirmDelete.show}
          onClickSuccess={() => callDeletePromotion()}
          contentName={isShowPopupComfirmDelete?.item?.name}
        />
      </div>
    </AdminPage>
  );
}
export default Promotion;
