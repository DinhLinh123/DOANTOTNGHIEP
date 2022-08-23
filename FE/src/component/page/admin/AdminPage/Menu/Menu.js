import React, { useEffect, useRef, useState } from "react";
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

import "./menu.scss";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import baseApi from "../../../../../api/baseApi"
import { Tooltip, Upload, Radio } from "antd";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import { API_MENU, API_TYPE_FOOD } from "../../../../base/common/endpoint";
import commonFunction from "../../../../base/common/commonFunction";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import RadioCheck from "../../../../base/Radio/Radio";
import ModalConfirm from "../../../../base/ModalConfirm/ModalConfirm";
import Dropdown from "../../../../base/Dropdown/Dropdown";

function Menu(props) {
  const [sortType, setSortType] = useState();
  const [index, setIndex] = useState({ value: 0, item: '' })
  // thêm mới món riêng
  const [foodName, setFoodName] = useState("");
  const [foodUnit, setFoodUnit] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescribe, setFoodDescribe] = useState("");
  const [foodImage, setFoodImage] = useState("dfsd");
  const [foodStatus, setFoodStatus] = useState(true);
  const [foodNote, setFoodNote] = useState("");
  const [foodDetail, setFoodDetail] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const [nameTypeFood, setNameTypeFood] = useState('');
  const [isManyTypeFood, setIsManyTypeFood] = useState(0);
  const [isShowPopupAddNewTypeFood, setIsShowPopupAddNewTypeFood] = useState(false);

  const [showPopupWarningChangeTab, setShowPopupWarningChangeTab] = useState({
    show: false,
    newIndex: 0,
  });
  const [listFood, setListFood] = useState([{ food: "" }]);
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState({ show: false, title: '', key: -1 });
  const [isShowPopupComfirmDelete, setIsShowPopupComfirmDelete] = useState({ show: false, item: '' });
  const [isShowPopupDetail, setIsShowPopupDetail] = useState({ show: false, isMany: -1 });
  const [isShowPopupWarningCategory, setIsShowPopupWarningCategory] = useState(false);
  const [listMenu, setListMenu] = useState([]);

  const getQuyen = JSON.parse(localStorage.getItem("quyen"))

  const quyen = getQuyen

  const quyen1 = quyen?.find((item) => item === "0-0-0")
  const quyen2 = quyen?.find((item) => item === "0-0-1")
  const quyen3 = quyen?.find((item) => item === "0-0-2")

  


  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const COLUMN_TABLE_INDEX_MENU = {
    NAME: "name",
    UNIT: "unit",
    PRICE: "price",
    IMAGE: "image",
    STATUS: "status",
    CATEGORY: "category",
    DESCRIBE: "describe"
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
      sorter: true,
      width: "200px",
    },
    {
      title: "Đơn vị tính",
      dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
      defaultSortOrder: SORT_TYPE.DESC,
      //sorter: true,
      width: "200px",
    },
    {
      title: "Thể loại",
      dataIndex: COLUMN_TABLE_INDEX_MENU.CATEGORY,
      width: "200px",
    },
    {
      title: "Giá tiền",
      dataIndex: COLUMN_TABLE_INDEX_MENU.PRICE,
      width: "200px",
      sorter: true
    },
    {
      title: "Trạng thái",
      dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS,
      width: "200px",
    },
  ];

  const OPTION_MORE_TABLE = [
    {
      title: "Chi tiết",
      onSelect: (val) => {
        setFoodDetail(val.detail);
        callGetTypeFoodById(val.detail.maTheLoai)
      },
    },
    {
      title: "Sửa",
      onSelect: (val) => {
        if(quyen2 === "0-0-1"){
          setFoodDetail(val.detail)
          handleEditMenu(val.detail)
        }else{
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền sửa menu")

        }
      },
    },
    {
      title: "Xóa",
      onSelect: (val) => {
        if(quyen2 === "0-0-3"){
          setIsShowPopupComfirmDelete({ show: true, item: val.detail })
        }else{
          commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa menu")

        }
      },
    },
  ];

  function callGetTypeFoodById(id) {
    baseApi.get(
      (res) => {
        setIsShowPopupDetail({ show: true, isMany: res.isMany })
      },
      () => {
      },
      null,
      API_TYPE_FOOD.GET_BY_ID + id,
      null,
      {}
    )
  }

  useEffect(() => {
    callGetAddFood()
    callGetTypeFood()
  }, [])

  useEffect(() => {
    callGetAddFood()
  }, [textSearch])

  function columnName(item) {
    return <div>{item?.name}</div>;
  }
  function columnUnit(item) {
    return <div>{item?.donViTinh}</div>;
  }
  function columnCategory(item) {
    return <div>{item?.tenTheLoai}</div>
  }
  function columnDescribe(item) {
    return <div>{item?.describe}</div>;
  }
  function columnPrice(item) {
    return <div>{commonFunction.numberWithCommas(item?.donGia)}</div>;
  }

  function columnStatus(item) {

    switch (item.trangThai) {
      case false:
        return <div>Hết hàng</div>;
      case true:
        return <div>Còn hàng</div>;
    }
  }

  function convertDataTable(dataTable) {
    let listData;
    listData = dataTable.map((item, idx) => {
      return {
        detail: item,
        [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
        [COLUMN_TABLE_INDEX_MENU.PRICE]: columnPrice(item),
        [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
        [COLUMN_TABLE_INDEX_MENU.CATEGORY]: columnCategory(item),
        [COLUMN_TABLE_INDEX_MENU.DESCRIBE]: columnDescribe(item),
        [COLUMN_TABLE_INDEX_MENU.STATUS]: columnStatus(item),
        key: idx,
        item
      };
    });
    return [...listData];
  }

  // useEffect(() => { if (isShowPopupAddnew.show && isShowPopupAddnew.key == 0) { callGetTypeFood() } }, [isShowPopupAddnew])
  useEffect(() => { console.log(index) }, [index])

  function callGetTypeFood() {

    baseApi.get(
      (res) => {
        setListMenu(res)
        setIndex({ value: 0, item: res[0] })
      },
      () => {
      },
      null,
      API_TYPE_FOOD.GET_ALL,
      null,
      {}
    )
  }

  function callGetTypeFoodByID(id) {

    baseApi.get(
      (res) => {
        setIndex({ value: 0, item: res })
      },
      () => {
      },
      null,
      API_TYPE_FOOD.GET_BY_ID + id,
      null,
      {}
    )
  }

  function onChangeTab(item, index) {
    if (foodName?.length > 0 || foodUnit?.length > 0 || foodPrice?.length > 0 || foodDescribe?.length > 0 || foodNote?.length > 0 || images?.length > 0) {

      setShowPopupWarningChangeTab({ show: true, newIndex: index })
    }
    else {
      setFoodName("")
      setFoodUnit("")
      setFoodPrice("")
      setFoodDescribe("")
      setFoodNote("")
      setImages([])
      setIndex({ value: index, item: item })
    }
  }

  function onSuccessChangeTab() {
    setFoodName("")
    setFoodUnit("")
    setFoodPrice("")
    setFoodDescribe("")
    setFoodNote("")
    setImages([])
    setShowPopupWarningChangeTab({ show: false, newIndex: 0 });
    setIndex({ value: showPopupWarningChangeTab.newIndex, item: '' })
  }
  function resetValue() {
    setFoodName("")
    setFoodUnit("")
    setFoodPrice("")
    setFoodDescribe("")
    setFoodNote("")
    setListFood([])
    setImages("")
    setFoodStatus(true)
  }

  function ChangeNameFood(val, index) {
    let _listFood = [...listFood];
    _listFood[index].food = val;
    setListFood(_listFood);
  }

  function deleteNameFood(index) {
    let _listFood = [...listFood];
    _listFood.splice(index, 1);
    setListFood(_listFood);
  }



  function addNameFood() {
    let _listFood = [...listFood];
    _listFood.push({ food: "" });
    setListFood(_listFood);
  }

  const Card = (props) => {
    const { listFood, ChangeNameFood, deleteNameFood } = props;
    return (
      <>
        {listFood?.map((item, index) => {
          return (
            <div className="menu-manager__popup-content-buffet-food-item">
              <div className="menu-manager__popup-content-buffet-food-item-input">
                <Input
                  defaultValue={item.food}
                  onBlurInput={(val) => ChangeNameFood(val, index)}
                  placeholder={"Tên món trong gói buffet..."}
                />
              </div>
              {index > 0 && (
                <div className="menu-manager__popup-content-buffet-food-item-button">
                  <Tooltip title={"Xóa món"}>
                    <DeleteOutlined
                      onClick={() => deleteNameFood(index)}
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

  function renderListFood(list) {
    if (list?.length > 0) {
      let _list = JSON.parse(list)

      return (
        <div className="menu-manager__popup-detail-content-buffet-list-value-food">
          {_list.map((item) => {
            return (
              <div className="menu-manager__popup-detail-content-buffet-ltst-value-food-item">
                {item.food}
              </div>
            )
          })}
        </div>
      )
    }
  }

  function handleEditMenu(item) {
    callGetTypeFoodByID(item?.maTheLoai)
    setIsShowPopupDetail({ show: false })
    setIsShowPopupAddnew({ show: true, title: 'Sửa menu', key: 1 })
    setFoodName(item.name)
    setFoodUnit(item.donViTinh)
    setFoodPrice(item.donGia)
    setListFood(JSON.parse(item.danhSachMonAn))
    setFoodDescribe(item.ghiChu)
    setFoodNote(item.ghiChu)
    setImages([])
    setFoodStatus(item.trangThai)
    // setIsShowPopupDetail({ show: false, index: -1 })
  }

  function callAddNewFood() {
    dispatch(changeLoadingApp(true))
    let body = {
      "name": foodName,
      "theLoaiDoAn": index.item.name,
      "linkAnh": foodImage,
      "donGia": foodPrice,
      "maTheLoai": index.item.id,
      "loai": "string",
      "ghiChu": foodNote,
      "danhSachMonAn": JSON.stringify(listFood),
      "donViTinh": foodUnit,
      "trangThai": foodStatus,
      "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdByUserName": "string",
      "createdOnDate": "2022-08-04T14:31:40.035Z"
    }
    baseApi.post(
      (res) => {
        resetValue()
        dispatch(changeLoadingApp(false))
        setIsShowPopupAddnew({ show: false, title: '', key: -1 })
        callGetAddFood()
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm món thành công")
      },
      () => {
        dispatch(changeLoadingApp(false))
        setIsShowPopupAddnew({ show: false, title: '', key: -1 })
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm món thất bại")
      },
      null,
      API_MENU.CREATE_NEW,
      null,
      body
    )
  }

  function callUpdateFood() {
    dispatch(changeLoadingApp(true))
    let body = foodDetail;
    body.name = foodName
    body.linkAnh = foodImage
    body.donGia = foodPrice
    body.loai = "string"
    body.ghiChu = foodNote
    body.danhSachMonAn = JSON.stringify(listFood)
    body.donViTinh = foodUnit
    body.trangThai = foodStatus
    baseApi.put(
      (res) => {
        resetValue()
        dispatch(changeLoadingApp(false))
        setIsShowPopupAddnew({ show: false, title: '', key: -1 })
        callGetAddFood()
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa món thành công")
      },
      () => {
        dispatch(changeLoadingApp(false))
        setIsShowPopupAddnew({ show: false, title: '', key: -1 })
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa món thất bại")
      },
      null,
      API_MENU.UPDATE_BY_ID + foodDetail.id,
      null,
      body
    )
  }

  function callGetAddFood() {
    dispatch(changeLoadingApp(true))
    let param = {
      "TextSearch": textSearch
    }
    baseApi.get(
      (res) => {
        resetValue()
        setDataTable(res.data || [])
        setDataTotal(res?.data?.length)
        dispatch(changeLoadingApp(false))
      },
      () => {
        dispatch(changeLoadingApp(false))
      },
      null,
      API_MENU.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param)),
      null,
      {}
    )
  }

  function callDeleteMenu() {
    dispatch(changeLoadingApp(true))
    baseApi.delete(
      (res) => {
        resetValue()
        dispatch(changeLoadingApp(false))
        setIsShowPopupComfirmDelete({ show: false, item: '' })
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa món thành công")
        callGetAddFood()
      },
      () => {
        dispatch(changeLoadingApp(false))
        setIsShowPopupComfirmDelete({ show: false, item: '' })
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa món thất bại")
      },
      null,
      API_MENU.GET_BY_ID + isShowPopupComfirmDelete.item.id,
      null,
      {}
    )


  }

  return (
    <AdminPage title={"Quản lý menu"} index={MENU_TAB_ADMIN.MENU}>
      <div className="menu-manager">
        <div className="menu-manager__filter">
          <div className="menu-manager__filter-search">
            <InputField placeholder={"Tên món ăn"} width={400} onChange={(val) => {
              setTimeout(() => {
                setTextSearch(val)
              }, 500);
            }} />
          </div>
          {quyen1 === "0-0-0" ? <div className="menu-manager__filter-create-new">
            <Button2
              name={"Thêm mới món ăn"}
              leftIcon={<PlusOutlined />}
              onClick={() => {
                if (listMenu?.length > 0) {
                  setIsShowPopupAddnew({ show: true, title: 'Thêm mới menu', key: 0 })
                } else {
                  setIsShowPopupWarningCategory(true)
                }
              }}
            />
          </div> : null}
          
        </div>
        <div className="menu-manager__content">
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
          onClickClose={() => {
            resetValue()
            setIsShowPopupAddnew({ show: false, title: '', key: -1 })
          }}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => {
                resetValue()
                setIsShowPopupAddnew({ show: false, title: '', key: -1 })
              }}
            />,
            <Button2
              name={"Lưu"}
              onClick={() => {
                if (isShowPopupAddnew.key === 0) {
                  callAddNewFood()
                }
                if (isShowPopupAddnew.key === 1) {
                  callUpdateFood()
                }
              }}
              background="#fa983a"
            />,
          ]}
          width={600}
          className={"menu-popup-create"}
          body={
            <div className="menu-manager__popup">
              {isShowPopupAddnew.key != 1 && <div className="menu-manager__popup-header">
                {listMenu.map((item, key) => {
                  return (
                    <div
                      className="menu-manager__popup-header-menu"
                      style={key === index.value ? {
                        color: "#00b894",
                        borderBottom: '2px solid #00b894'
                      } :
                        {}}
                      onClick={(val) => {
                        onChangeTab(item, key);
                      }}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>}

              <div className="menu-manager__popup-content">
                {index.item?.isMany && (
                  <div className="menu-manager__popup-content-buffet">
                    <div className="menu-manager__popup-content-buffet-name">
                      <Input
                        label={"Tên gói buffet"}
                        value={foodName}
                        onChange={(val) => {
                          setFoodName(val);
                        }}
                        placeholder={"Tên gói Buffet..."}
                      />
                    </div>
                    <div className="menu-manager__popup-content-buffet-food">
                      <div className="menu-manager__popup-content-buffet-food-add">
                        <Button2
                          name={"Thêm món trong buffet"}
                          background={"#ff9f43"}
                          onClick={() => addNameFood()}
                        />
                      </div>
                      <Card
                        listFood={listFood}
                        ChangeNameFood={(val, item) =>
                          ChangeNameFood(val, item)
                        }
                        deleteNameFood={(index) => deleteNameFood(index)}
                      />
                    </div>
                    <div className="menu-manager__popup-content-buffet-image">
                      <div className="menu-manager__popup-content-buffet-image-title">Ảnh</div>
                      <ImageUpload maxImage={1} images={images} setImages={(val) => { setImages(val) }} />
                    </div>
                    <Input
                      label={"Đơn vị tính"}
                      value={foodUnit}
                      onChange={(val) => { setFoodUnit(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Giá tiền"}
                      value={foodPrice}
                      onChange={(val) => { setFoodPrice(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Mô tả"}
                      value={foodDescribe}
                      onChange={(val) => { setFoodDescribe(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Ghi chú"}
                      value={foodNote}
                      onChange={(val) => { setFoodNote(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Trạng thái</div>
                    <Radio.Group onChange={(val) => { setFoodStatus(val.target.value) }} defaultValue={foodStatus}>
                      <Radio value={true}>Còn</Radio>
                      <Radio value={false}>Hết</Radio>
                    </Radio.Group>
                  </div>
                )}

                {!index.item?.isMany && (
                  <div>
                    <Input
                      label={"Tên món"}
                      defaultValue={foodName}
                      onChange={(val) => {
                        setFoodName(val);
                      }}
                      autoFocus
                      required
                    />
                    <Input
                      label={"Đơn vị tính"}
                      defaultValue={foodUnit}
                      onChange={(val) => { setFoodUnit(val) }}
                      autoFocus
                      required
                    />
                    <Input
                      label={"Giá tiền"}
                      defaultValue={foodPrice}
                      onChange={(val) => { setFoodPrice(val) }}
                      autoFocus
                      required
                    />
                    <Input
                      label={"Mô tả"}
                      defaultValue={foodDescribe}
                      onChange={(val) => { setFoodDescribe(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Ảnh <span style={{color: "red"}}>*</span></div>
                    <div>
                      <ImageUpload maxImage={1} images={images} setImages={(val) => { setImages(val) }} />
                    </div>
                    <Input
                      label={"Ghi chú"}
                      defaultValue={foodNote}
                      onChange={(val) => { setFoodNote(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Trạng thái</div>
                    <Radio.Group onChange={(val) => { setFoodStatus(val.target.value) }} value={foodStatus}>
                      <Radio value={true}>Còn</Radio>
                      <Radio value={false}>Hết</Radio>
                    </Radio.Group>
                  </div>
                )}
              </div>
            </div>
          }
        />
        <Popup
          title={"Cảnh báo"}
          show={showPopupWarningChangeTab.show}
          onClickClose={() =>
            setShowPopupWarningChangeTab({ show: false, newIndex: 0 })
          }
          button={[
            <Button2 name={"Đồng ý"} onClick={() => onSuccessChangeTab()} />,
            <Button2
              name={"không"}
              onClick={() =>
                setShowPopupWarningChangeTab({ show: false, newIndex: index })
              }
            />,
          ]}
          width={500}
          body={
            <div>
              Bạn có chắc chắn muốn chuyển tab và không lưu thông tin vừa nhập
              không?
            </div>
          }
        />
        <Popup
          title={"Chi tiết menu"}
          show={isShowPopupDetail.show}
          onClickClose={() => setIsShowPopupDetail({ show: false, isMany: false })}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => setIsShowPopupDetail({ show: false, isMany: false })}
            />,
            <Button2
              name={"Sửa"}
              onClick={() => {
                handleEditMenu(foodDetail)
              }}
              background="#fa983a"
            />,
          ]}
          width={600}
          className={"menu-popup-detail"}
          body={
            <div className="menu-manager__popup-detail">
              <div className="menu-manager__popup-detail-content">
                {isShowPopupDetail.isMany && (
                  <div className="menu-manager__popup-detail-content-buffet">
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Tên món: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.name}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-list">
                      <span className="menu-manager__popup-detail-content-buffet-list-label">Danh sách món: </span>
                      <span className="menu-manager__popup-detail-content-buffet-list-value">{renderListFood(foodDetail.danhSachMonAn)}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Đơn vị tính: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.donViTinh}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Thể loại: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.tenTheLoai}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Giá tiền: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{commonFunction.numberWithCommas(parseInt(foodDetail.donGia))}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Ảnh: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.linkAnh}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Mô tả: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.describe}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Trạng thái: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{columnStatus(foodDetail)}</span>
                    </div>
                  </div>
                )}

                {!isShowPopupDetail?.isMany && (
                  <div className="menu-manager__popup-detail-content-buffet">
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Tên món: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.name}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Đơn vị tính: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.donViTinh}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Thể loại: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.tenTheLoai}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Giá tiền: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{commonFunction.numberWithCommas(parseInt(foodDetail.donGia))}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Ảnh: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.linkAnh}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Mô tả: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.describe}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Trạng thái: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{columnStatus(foodDetail)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        />
        <ModalConfirm
          title={"món ăn"}
          setShow={(val) => setIsShowPopupComfirmDelete({ show: val, item: '' })}
          show={isShowPopupComfirmDelete.show}
          onClickSuccess={() => callDeleteMenu()}
          contentName={isShowPopupComfirmDelete.item.name}
        />

        <Popup
          title={"Cảnh báo"}
          show={isShowPopupWarningCategory}
          onClickClose={() => setIsShowPopupWarningCategory(false)}
          button={[
            <Button2
              name={"Hủy"}
              onClick={() => setIsShowPopupWarningCategory(false)}
            />,
            <Button2
              name={"Thêm mới danh mục món ăn"}
              onClick={() => {
                window.open(`/admin/category_menu`, "_self");
              }}
              background="#fa983a"
            />,
          ]}
          width={600}
          className={"menu-popup-detail"}
          body={
            <div style={{ marginTop: '24px', fontSize: '16px', }}>Bạn cần thêm mới danh mục menu trước</div>
          }
        />
      </div>
    </AdminPage>
  );
}
export default Menu;
