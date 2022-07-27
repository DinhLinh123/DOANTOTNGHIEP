import React, { useEffect, useRef, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  SORT_TYPE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import "./menu.scss";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";

import { Tooltip, Upload, Radio } from "antd";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";

function Menu(props) {
  const [sortType, setSortType] = useState();
  const [index, setIndex] = useState(1)
  // thêm mới món riêng
  const [foodName, setFoodName] = useState("");
  const [foodUnit, setFoodUnit] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodDescribe, setFoodDescribe] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodStatus, setFoodStatus] = useState(1);
  const [foodNote, setFoodNote] = useState("");
  const [foodDetail, setFoodDetail] = useState({});

  const [showPopupWarningChangeTab, setShowPopupWarningChangeTab] = useState({
    show: false,
    newIndex: 0,
  });
  const [listFood, setListFood] = useState([{ food: "" }]);
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
  const [isShowPopupDetail, setIsShowPopupDetail] = useState({ show: false, index: -1 });

  const [images, setImages] = useState([]);

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
      title: "Ảnh",
      dataIndex: COLUMN_TABLE_INDEX_MENU.IMAGE,
      width: "300px",
    },
    {
      title: "Mô tả",
      dataIndex: COLUMN_TABLE_INDEX_MENU.DESCRIBE,
      width: "300px",
    },
    {
      title: "Trạng thái",
      dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS,
      width: "200px",
    },
  ];

  const data = [
    {
      id: "1",
      name: "John Brown",
      unit: 32,
      price: 100000,
      describe: "New York No. 1 Lake Park",
      categorys: 2,
      statuss: 1,
    },
    {
      id: "2",
      name: "Jim Green",
      unit: 42,
      price: 100000,
      describe: "London No. 1 Lake Park",
      categorys: 3,
      statuss: 0
    },
    {
      id: "3",
      name: "Joe Black",
      unit: 32,
      price: 100000,
      describe: "Sidney No. 1 Lake Park",
      categorys: 1,
      statuss: 1,
      listFoods: '[{"food":"ddd"},{"food":"df"},{"food":"2gdfghdfghdfghdfghdfghdfghdgfh"},{"food":"2gdfghdfghdfghdfghdfghdfghdgfh"},{"food":"2gdfghdfghdfghdfghdfghdfghdgfh"}]'
    },
    {
      id: "4",
      name: "Jim Red",
      unit: 32,
      price: 100000,
      describe: "London No. 2 Lake Park",
      categorys: 4,
      statuss: 1
    }, {
      id: "5",
      name: "Jim Green",
      unit: 42,
      price: 100000,
      describe: "London No. 1 Lake Park",
      categorys: 2,
      statuss: 0
    },
    {
      id: "6",
      name: "Joe Black",
      unit: 32,
      price: 100000,
      describe: "Sidney No. 1 Lake Park",
      categorys: 4,
      statuss: 1
    },
    {
      id: "7",
      name: "Jim Red",
      unit: 32,
      price: 100000,
      describe: "London No. 2 Lake Park",
      categorys: 1,
      statuss: 0
    }, {
      id: "8",
      name: "Jim Green",
      unit: 42,
      price: 100000,
      describe: "London No. 1 Lake Park",
      categorys: 3,
      statuss: 0
    },
  ];

  const OPTION_MORE_TABLE = [
    {
      title: "Chi tiết",
      onSelect: (val) => { setFoodDetail(val.detail); setIsShowPopupDetail({ show: true, index: val.categorys }) },
    },
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

  function columnName(item) {
    return <div>{item?.name}</div>;
  }
  function columnUnit(item) {
    return <div>{item?.unit}</div>;
  }
  function columnCategory(item) {
    switch (item.categorys) {
      case 1:
        return <div>Buffet</div>;
      case 2:
        return <div>Món riêng</div>;
      case 3:
        return <div>Đồ uống</div>;
      case 4:
        return <div>Khác</div>;
    }
  }
  function columnDescribe(item) {
    return <div>{item?.describe}</div>;
  }

  function columnStatus(item) {

    switch (item.statuss) {
      case 0:
        return <div>Hết hàng</div>;
      case 1:
        return <div>Còn hàng</div>;
    }
  }

  function convertDataTable(dataTable) {
    let listData;
    listData = dataTable.map((item, idx) => {
      return {
        ...item,
        detail: item,
        [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
        [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
        [COLUMN_TABLE_INDEX_MENU.CATEGORY]: columnCategory(item),
        [COLUMN_TABLE_INDEX_MENU.DESCRIBE]: columnDescribe(item),
        [COLUMN_TABLE_INDEX_MENU.STATUS]: columnStatus(item),
        key: idx,
        ...item
      };
    });
    return [...listData];
  }

  let listMenu = [
    {
      title: "Buffet",
      index: 1,
    },
    {
      title: "Món riêng",
      index: 2,
    },
    {
      title: "Đồ uống",
      index: 3,
    },
    {
      title: "Khác",
      index: 4,
    },
  ];

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
  }

  function onChangeTab(item) {
    if (foodName?.length > 0 || foodUnit?.length > 0 || foodPrice?.length > 0 || foodDescribe?.length > 0 || foodNote?.length > 0 || images?.length > 0) {

      setShowPopupWarningChangeTab({ show: true, newIndex: item.index })
    }
    else {
      setFoodName("")
      setFoodUnit("")
      setFoodPrice("")
      setFoodDescribe("")
      setFoodNote("")
      setImages([])
      setIndex(item.index)
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
    setIndex(showPopupWarningChangeTab.newIndex)
  }



  useEffect(() => { console.log(index) }, [index])

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

  useEffect(() => { console.log(listFood) }, [listFood])

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
                  onChange={(val) => ChangeNameFood(val, index)}
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
    if(list?.length > 0){
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
    setIndex(isShowPopupDetail.index)
    setIsShowPopupAddnew(true)
    setFoodName(foodDetail.name)
    setFoodUnit(foodDetail.unit)
    setFoodPrice(foodDetail.price)
    setListFood(JSON.parse(foodDetail.listFoods || ''))
    setFoodDescribe(foodDetail.describe)
    setFoodNote(foodDetail.name)
    setImages([])
    setFoodStatus(foodDetail.statuss)
    setIsShowPopupDetail({ show: false, index: -1 })
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
          title={"Thêm mới menu"}
          show={isShowPopupAddnew}
          onClickClose={() => setIsShowPopupAddnew(false)}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => setIsShowPopupAddnew(false)}
            />,
            <Button2
              name={"Lưu"}
              onClick={() => setIsShowPopupAddnew(false)}
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
                      style={item.index === index ? {
                        color: "#00b894",
                        borderBottom: '2px solid #00b894'
                      } :
                        {}}
                      onClick={(val) => {
                        onChangeTab(item);
                      }}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
              <div className="menu-manager__popup-content">
                {index == 1 && (
                  <div className="menu-manager__popup-content-buffet">
                    <div className="menu-manager__popup-content-buffet-name">
                      <Input
                        label={"Tên gói buffet"}
                        defaultValue={foodName}
                        onChange={(val) => {
                          val.stoppropagation()
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

                {index == 2 && (
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
                {
                  index == 3 && <div>
                    <Input
                      label={"Tên đồ uống"}
                      defaultValue={foodName}
                      onChange={(val) => { setFoodName(val) }}
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
                }
                {
                  index == 4 && <div>
                    <Input
                      label={"Tên"}
                      defaultValue={foodName}
                      onChange={(val) => { setFoodName(val) }}
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
                }
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
          onClickClose={() => setIsShowPopupDetail({ show: false, index: -1 })}
          button={[
            <Button2
              name={"Đóng"}
              onClick={() => setIsShowPopupDetail({ show: false, index: -1 })}
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
                {isShowPopupDetail.index == 1 && (
                  <div className="menu-manager__popup-detail-content-buffet">
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Tên món: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.name}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-list">
                      <span className="menu-manager__popup-detail-content-buffet-list-label">Danh sách món: </span>
                      <span className="menu-manager__popup-detail-content-buffet-list-value">{renderListFood(foodDetail.listFoods)}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Đơn vị tính: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.unit}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Thể loại: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{columnCategory(foodDetail)}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Giá tiền: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.price}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Ảnh: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.images}</span>
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

                {(isShowPopupDetail.index == 2 || isShowPopupDetail.index == 3 || isShowPopupDetail.index == 4) && (
                  <div className="menu-manager__popup-detail-content-buffet">
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Tên món: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.name}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Đơn vị tính: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.unit}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Thể loại: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{columnCategory(foodDetail)}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Giá tiền: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.price}</span>
                    </div>
                    <div className="menu-manager__popup-detail-content-buffet-item">
                      <span className="menu-manager__popup-detail-content-buffet-item-label">Ảnh: </span>
                      <span className="menu-manager__popup-detail-content-buffet-item-value">{foodDetail.images}</span>
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
      </div>
    </AdminPage>
  );
}
export default Menu;
