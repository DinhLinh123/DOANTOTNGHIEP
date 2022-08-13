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

function Menu(props) {
  const [sortType, setSortType] = useState();
  const [index, setIndex] = useState({ value: 0, item: '' })
  // thêm mới món riêng
  const [foodName, setFoodName] = useState("");
  const [foodUnit, setFoodUnit] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescribe, setFoodDescribe] = useState("");
  const [foodImage, setFoodImage] = useState("dfsd");
  const [foodStatus, setFoodStatus] = useState(1);
  const [foodNote, setFoodNote] = useState("");
  const [foodDetail, setFoodDetail] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [nameTypeFood, setNameTypeFood] = useState('');
  const [isManyTypeFood, setIsManyTypeFood] = useState(0);
  const [isShowPopupAddNewTypeFood, setIsShowPopupAddNewTypeFood] = useState(false);

  const [showPopupWarningChangeTab, setShowPopupWarningChangeTab] = useState({
    show: false,
    newIndex: 0,
  });
  const [listFood, setListFood] = useState([{ food: "" }]);
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
  const [isShowPopupComfirmDelete, setIsShowPopupComfirmDelete] = useState({show: false, item: ''});
  const [isShowPopupDetail, setIsShowPopupDetail] = useState({ show: false, isMany: -1 });
  const [listMenu, setListMenu] = useState([]);


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
      onSelect: () => {
        alert("Sửa");
      },
    },
    {
      title: "Xóa",
      onSelect: (val) => {
        setIsShowPopupComfirmDelete({show: true, item: val.detail})
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
      API_TYPE_FOOD.GET_BY_ID+ id,
      null,
      {}
    )
  }

  useEffect(() => {
    callGetAddFood()
  }, [])

  function columnName(item) {
    return <div>{item?.name}</div>;
  }
  function columnUnit(item) {
    return <div>{item?.donViTinh}</div>;
  }
  function columnCategory(item) {
    return <div>{item.theLoaiDoAn}</div>
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

  useEffect(() => { if (isShowPopupAddnew) { callGetTypeFood() } }, [isShowPopupAddnew])

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

  function callAddTypeFood() {
    let body = {
      "name": nameTypeFood,
      "isMany": isManyTypeFood == 1,
      "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdByUserName": "string",
      "createdOnDate": "2022-08-11T04:57:29.357Z",
      "lastModifiedByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "lastModifiedByUserName": "string"
    }
    baseApi.post(
      (res) => {
        setListMenu(res)
        callGetTypeFood()
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm thể loại món ăn thành công")
      },
      () => {
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm thể loại món ăn thất bại")

      },
      null,
      API_TYPE_FOOD.GET_ALL,
      null,
      body
    )
  }

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
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

  useEffect(() => { console.log(isShowPopupDetail) }, [isShowPopupDetail])

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

  function handleEditMenu() {

    setIndex({ value: isShowPopupDetail.index, item: '' })
    setIsShowPopupAddnew(true)
    setFoodName(foodDetail.name)
    setFoodUnit(foodDetail.unit)
    setFoodPrice(foodDetail.price)
    setListFood(JSON.parse(foodDetail.listFoods || ''))
    setFoodDescribe(foodDetail.describe)
    setFoodNote(foodDetail.name)
    setImages([])
    setFoodStatus(foodDetail.statuss)
    // setIsShowPopupDetail({ show: false, index: -1 })
  }

  function callAddNewFood() {
    dispatch(changeLoadingApp(true))
    let body = {
      "name": foodName,
      "theLoaiDoAn": index.item,
      "linkAnh": foodImage,
      "donGia": foodPrice,
      "maTheLoai": index.item.id,
      "loai": "string",
      "ghiChu": foodNote,
      "danhSachMonAn": JSON.stringify(listFood),
      "donViTinh": foodUnit,
      "trangThai": foodStatus != 0,
      "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdByUserName": "string",
      "createdOnDate": "2022-08-04T14:31:40.035Z"
    }
    baseApi.post(
      (res) => {
        dispatch(changeLoadingApp(false))
        setIsShowPopupAddnew(false)
        callGetAddFood()
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm món thành công")
      },
      () => {
        dispatch(changeLoadingApp(false))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm món thất bại")
      },
      null,
      API_MENU.CREATE_NEW,
      null,
      body
    )
  }

  function callGetAddFood() {
    dispatch(changeLoadingApp(true))

    baseApi.get(
      (res) => {
        setDataTable(res.data || [])
        dispatch(changeLoadingApp(false))
      },
      () => {
        dispatch(changeLoadingApp(false))
      },
      null,
      API_MENU.GET_ALL,
      null,
      {}
    )
  }

  function callDeleteMenu() {
    dispatch(changeLoadingApp(true))
    baseApi.delete(
      (res) => {
        dispatch(changeLoadingApp(false))
        setIsShowPopupComfirmDelete({show: false, item: ''})
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa món thành công")
        callGetAddFood()
      },
      () => {
        dispatch(changeLoadingApp(false))
        setIsShowPopupComfirmDelete({show: false, item: ''})
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa món thất bại")
      },
      null,
      API_MENU.GET_BY_ID+ isShowPopupComfirmDelete.item.id,
      null,
      {}
    )
  }

  return (
    <AdminPage title={"Quản lý menu"} index={MENU_TAB_ADMIN.MENU}>
      <div className="menu-manager">
        <div className="menu-manager__filter">
          <div className="menu-manager__filter-search">
            <InputField placeholder={"Tìm kiếm theo từ khóa"} width={400} />
          </div>
          <div className="menu-manager__filter-create-new">
            <Button2
              name={"Thêm mới món ăn"}
              leftIcon={<PlusOutlined />}
              onClick={() => handleClickAddnew()}
            />
          </div>
        </div>
        <div className="menu-manager__content">
          <TableBase
            // onChangePagination={(page, pageSize)=>{}}
            columns={columns}
            total={90}
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
          title={"Thêm mới menu"}
          show={isShowPopupAddnew}
          onClickClose={() => setIsShowPopupAddnew(false)}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => {
                setFoodName("")
                setIsShowPopupAddnew(false)
              }}
            />,
            <Button2
              name={"Lưu"}
              onClick={() => callAddNewFood()}
              background="#fa983a"
            />,
          ]}
          width={600}
          className={"menu-popup-create"}
          body={
            <div className="menu-manager__popup">
              <div className="menu-manager__popup-header">
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
                <div onClick={() => setIsShowPopupAddNewTypeFood(true)}>
                  <PlusOutlined />
                </div>
              </div>
              <div className="menu-manager__popup-content">
                {index.item?.isMany && (
                  <div className="menu-manager__popup-content-buffet">
                    <div className="menu-manager__popup-content-buffet-name">
                      <Input
                        label={"Tên gói buffet"}
                        defaultValue={foodName}
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
                      defaultValue={foodUnit}
                      onChange={(val) => { setFoodUnit(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Giá tiền"}
                      defaultValue={foodPrice}
                      onChange={(val) => { setFoodPrice(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Mô tả"}
                      defaultValue={foodDescribe}
                      onChange={(val) => { setFoodDescribe(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Ghi chú"}
                      defaultValue={foodNote}
                      onChange={(val) => { setFoodNote(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Trạng thái</div>
                    <Radio.Group onChange={(val) => { setFoodStatus(val.target.value) }} value={foodStatus}>
                      <Radio value={1}>Còn</Radio>
                      <Radio value={0}>Hết</Radio>
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
                    />
                    <Input
                      label={"Đơn vị tính"}
                      defaultValue={foodUnit}
                      onChange={(val) => { setFoodUnit(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Giá tiền"}
                      defaultValue={foodPrice}
                      onChange={(val) => { setFoodPrice(val) }}
                      autoFocus
                    />
                    <Input
                      label={"Mô tả"}
                      defaultValue={foodDescribe}
                      onChange={(val) => { setFoodDescribe(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Ảnh</div>
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
                      <Radio value={1}>Còn</Radio>
                      <Radio value={0}>Hết</Radio>
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
                handleEditMenu()
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
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.theLoaiDoAn}</span>
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
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.theLoaiDoAn}</span>
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
        <Popup
          title={"Thêm mới thể loại đồ ăn"}
          show={isShowPopupAddNewTypeFood}
          onClickClose={() => setIsShowPopupAddNewTypeFood(false)}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => {
                setFoodName("")
                setIsShowPopupAddNewTypeFood(false)
              }}
            />,
            <Button2
              name={"Lưu"}
              onClick={() => callAddTypeFood()}
              background="#fa983a"
              disabled={nameTypeFood?.length <= 0}
            />,
          ]}
          width={600}
          className={"menu-popup-create-type-food"}
          body={
            <div className="menu-manager__popup">
              <div className="menu-manager__popup-content">

                <div className="menu-manager__popup-content-buffet">
                  <div className="menu-manager__popup-content-buffet-name">
                    <Input
                      label={"Tên thể loại đồ ăn"}
                      defaultValue={nameTypeFood}
                      onChange={(val) => {
                        setNameTypeFood(val);
                      }}
                      placeholder={"Tên thể loại đồ ăn..."}
                      required
                    />
                  </div>
                  <div className="menu-manager__popup-content-buffet-many">
                    <RadioCheck
                      title={"Kiểu"}
                      valueDefault={isManyTypeFood}
                      listOption={[
                        {
                          label: 'Một món',
                          value: 0
                        }, {
                          label: 'Nhiều món',
                          value: 1
                        }
                      ]}
                      onChange={(val) => { setIsManyTypeFood(val) }}
                    />
                  </div>

                </div>
              </div>
            </div>
          }
        />
        <ModalConfirm
                title={"món ăn"}
                setShow={(val)=>setIsShowPopupComfirmDelete({show: val, item: ''})}
                show={isShowPopupComfirmDelete.show}
                onClickSuccess={()=>callDeleteMenu()}
                contentName={isShowPopupComfirmDelete.item.name}
            />
      </div>
    </AdminPage>
  );
}
export default Menu;
