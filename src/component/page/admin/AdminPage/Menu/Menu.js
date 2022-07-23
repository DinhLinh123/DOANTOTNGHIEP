import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  SORT_TYPE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import {
  PlusOutlined
} from '@ant-design/icons';

import "./menu.scss"
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";

function Menu(props) {
  const [sortType, setSortType] = useState();
  const [index, setIndex] = useState(1);
  const [showPopupWarningChangeTab, setShowPopupWarningChangeTab] = useState({show: false, newIndex: 0});
  const [foodName, setFoodName] = useState("");


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
      title: 'Buffet',
      index: 1
    },
    {
      title: 'Món riêng',
      index: 2
    },
    {
      title: 'Đồ uống',
      index: 3
    },
    {
      title: 'Khác',
      index: 4
    }
  ]

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

  const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false)

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

  // useEffect(() => {
  //   console.log(sortType);
  // }, [sortType]);
  function handleClickAddnew(type) {
    setIsShowPopupAddnew(true)
  }

  function onChangeTab(item) {
    debugger
    if (foodName?.length > 0) {
      setShowPopupWarningChangeTab({show: true, newIndex: item.index})
    }
    else{
      setIndex(item.index)
    }
  }

  function onSuccessChangeTab() {
    setFoodName('')
    setShowPopupWarningChangeTab({show: false, newIndex: 0});
    setIndex(showPopupWarningChangeTab.newIndex)
  }

  
  
  useEffect(()=>{console.log(index)},[index])

  return (
    <AdminPage title={"Quản lý menu"} index={MENU_TAB_ADMIN.MENU}>
      <div className="menu-manager">
        <div className="menu-manager__filter">
          <div className="menu-manager__filter-search">
            <InputField placeholder={"Tìm kiếm theo từ khóa"} width={400} />
          </div>
          <div className="menu-manager__filter-create-new">
            <Button2 name={"Thêm mới món ăn"} leftIcon={<PlusOutlined />} onClick={() => handleClickAddnew()} />
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
            <Button2 name={'Đóng'} onClick={() => setIsShowPopupAddnew(false)} />,
            <Button2 name={'Lưu'} onClick={() => setIsShowPopupAddnew(false)} background="#fa983a"/>
          ]}
          width={600}
          className={"menu-popup-create"}
          body={
            <div className="menu-manager__popup">
              <div className="menu-manager__popup-header">
                {
                  listMenu.map((item, key) => {
                    return (
                      <div className="menu-manager__popup-header-menu"
                        style={{ width: `calc(100% / ${listMenu?.length})`, borderLeft: key != 0 ? '1px solid #fff' : '' }}
                        onClick={(val) =>  { onChangeTab(item) }}
                      >
                        {item.title}
                      </div>
                    )
                  })
                }
              </div>
              <div className="menu-manager__popup-content">
                {
                  index == 1 &&
                  <div className="menu-manager_popup_content-name">
                    <Input
                      label={"Tên món ăn"}
                      defaultValue={foodName}
                      onChange={(val) => { setFoodName(val) }}
                      autoFocus
                    />
                  </div>
                }
                {
                  index == 2 && <div>mons tieeng</div>
                }
                {
                  index == 3 && <div>ddo uoongs</div>
                }
                {
                  index == 4 && <div>khcas</div>
                }
              </div>
            </div>
          }
        />
        <Popup
          title={"Cảnh báo"}
          show={showPopupWarningChangeTab.show}
          onClickClose={() => setShowPopupWarningChangeTab({show: false, newIndex: 0})}
          button={[
            <Button2 name={'Đồng ý'} onClick={() =>  onSuccessChangeTab()} />,
            <Button2 name={'không'} onClick={() => 
              setShowPopupWarningChangeTab({show: false, newIndex: index})
            } />
          ]}
          width={500}
          body={
            <div>
              Bạn có chắc chắn muốn chuyển tab và không lưu thông tin vừa nhập không?
            </div>
          }
        />

      </div>
    </AdminPage>
  );
}
export default Menu;
