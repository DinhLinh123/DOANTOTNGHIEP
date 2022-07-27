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

  const [showPopupWarningChangeTab, setShowPopupWarningChangeTab] = useState({
    show: false,
    newIndex: 0,
  });
  const [buffetName, setBuffetName] = useState("");
  const [listFood, setListFood] = useState([{ food: "" }]);
  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const COLUMN_TABLE_INDEX_MENU = {
    NAME: "name",
    AGE: "age",
    ADDRESS: "address",
  };

  const columns = [
    {
      title: "Name",
      dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
      sorter: true,
      width: "300px",
    },
    {
      title: "Age",
      dataIndex: COLUMN_TABLE_INDEX_MENU.AGE,
      defaultSortOrder: SORT_TYPE.DESC,
      sorter: true,
      width: "300px",
    },
    {
      title: "Address",
      dataIndex: COLUMN_TABLE_INDEX_MENU.ADDRESS,
      width: "300px",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Jim Red",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

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

  const OPTION_MORE_TABLE = [
    {
      title: "Thêm",
      onSelect: () => alert("thêm"),
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
  function columnAge(item) {
    return <div>{item?.age}</div>;
  }
  function columnAddress(item) {
    return <div>{item?.address}</div>;
  }

  function convertDataTable(dataTable) {
    let listData;
    listData = dataTable.map((item, idx) => {
      return {
        [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
        [COLUMN_TABLE_INDEX_MENU.AGE]: columnAge(item),
        [COLUMN_TABLE_INDEX_MENU.ADDRESS]: columnAddress(item),
        key: idx,
      };
    });
    return [...listData];
  }

  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true);
  }

  function onChangeTab(item) {
    debugger
    if (foodName?.length > 0 || foodUnit?.length > 0 || foodPrice?.length > 0 || foodDescribe?.length > 0 || foodNote?.length > 0) {

      setShowPopupWarningChangeTab({ show: true, newIndex: item.index })
    }
    else {
      setFoodName("")
      setFoodUnit("")
      setFoodPrice("")
      setFoodDescribe("")
      setFoodNote("")
      setIndex(item.index)
    }
  }

  function onSuccessChangeTab() {
    setFoodName("")
    setFoodUnit("")
    setFoodPrice("")
    setFoodDescribe("")
    setFoodNote("")
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
                  autoFocus
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

  const handleChange= ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
                      style={{
                        width: `calc(100% / ${listMenu?.length})`,
                        borderLeft: key != 0 ? "1px solid #fff" : "",
                      }}
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
                        defaultValue={buffetName}
                        onChange={(val) => {
                          setBuffetName(val);
                        }}
                        autoFocus
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
                    <div>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        // onPreview={handlePreview}
                        onChange={handleChange}
                        multiple={false}
                      >
                        {fileList.length  < 1  && uploadButton}
                      </Upload>
                    </div>
                  </div>
                )}

                {index == 2 && (
                  <div>
                    <Input
                      label={"Tên món"}
                      defaultValue={buffetName}
                      onChange={(val) => {
                        setBuffetName(val);
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
                    <img alt="example" style={{ width: '100%' }} />
                    <Input
                      label={"Ghi chú"}
                      defaultValue={foodNote}
                      onChange={(val) => { setFoodNote(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Trạng thái</div>
                    <Radio.Group onChange={(val) => { setFoodStatus(val.target.value) }} value={foodStatus}>
                      <Radio value={1}>Còn</Radio>
                      <Radio value={2}>Hết</Radio>
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
                    <img alt="example" style={{ width: '100%' }} />
                    <Input
                      label={"Ghi chú"}
                      defaultValue={foodNote}
                      onChange={(val) => { setFoodNote(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Trạng thái</div>
                    <Radio.Group onChange={(val) => { setFoodStatus(val.target.value) }} value={foodStatus}>
                      <Radio value={1}>Còn</Radio>
                      <Radio value={2}>Hết</Radio>
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
                    <img alt="example" style={{ width: '100%' }} />
                    <Input
                      label={"Ghi chú"}
                      defaultValue={foodNote}
                      onChange={(val) => { setFoodNote(val) }}
                      autoFocus
                    />
                    <div className="menu-manager__popup-content_privateDish_status">Trạng thái</div>
                    <Radio.Group onChange={(val) => { setFoodStatus(val.target.value) }} value={foodStatus}>
                      <Radio value={1}>Còn</Radio>
                      <Radio value={2}>Hết</Radio>
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
      </div>
    </AdminPage>
  );
}
export default Menu;
