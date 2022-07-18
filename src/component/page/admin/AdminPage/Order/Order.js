import React, { useEffect, useRef, useState } from "react";
import "./order.scss";
import ud1 from "../../../../../image/ud1.jpg";
import ud2 from "../../../../../image/ud2.jpg";
import ud3 from "../../../../../image/ud3.jpg";
import ud4 from "../../../../../image/ud4.jpg";
import ud5 from "../../../../../image/ud5.jpg";
import ud6 from "../../../../../image/ud6.png";
import logo1 from "../../../../../image/logo1.png";
import InputField from "../../../../base/Input/Input";
import { SearchOutlined, PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import commonFunction from "../../../../base/common/commonFunction";
import Button2 from "../../../../base/Button/Button";
import { Tooltip } from "antd";
import noDataimg from "../../../../../image/no-data2.png"
function Order(props) {

  const [index, setIndex] = useState(1)
  const [orderSelected, setoOrderSelected] = useState([])
  const [displayLine2ChooseOrder, setDisplayLine2ChooseOrder] = useState({
    show: false,
    index: ""
  })
  const renderChoose = useRef([])

  let logo = [
    {
      img: logo1,
    }
  ]
  // data fake món
  let dataFake = [

    {
      img: ud2,
      title: "Rau muống xào tỏi Rau muống xào tỏi 2",
      money: 10000000,
      id: 1
    },
    {
      img: ud1,
      title: "Rau muống xào tỏi Rau muống xào tỏi Rau muống xào tỏi Rau muống xào tỏi 3",
      money: 99000,
      id: 2
    },

    {
      img: ud3,
      title: "Buffet 199k 4",
      money: 199000,
      id: 3
    },
    {
      img: ud4,
      title: "Rau muống xào tỏi 5",
      money: 100000,
      id: 4
    },
    {
      img: ud5,
      title: "Rau muống xào tỏi 6",
      money: 100000,
      id: 5
    },
    {
      img: ud6,
      title: "Rau muống xào tỏi 7",
      money: 100000,
      id: 6
    }
    ,
    {
      img: ud6,
      title: "Rau muống xào tỏi 8",
      money: 100000,
      id: 7
    }
    ,
    {
      img: ud6,
      title: "Rau muống xào tỏi 9",
      money: 100000,
      id: 8
    }
    ,
    {
      img: ud6,
      title: "Rau muống xào tỏi 10",
      money: 100000,
      id: 9
    },
    {
      img: ud5,
      title: "Rau muống xào tỏi 11",
      money: 100000,
      id: 11
    },
    {
      img: ud6,
      title: "Rau muống xào tỏi Rau muống xào tỏi ",
      money: 100000,
      id: 15
    }
    ,
    {
      img: ud6,
      title: "Rau muống xào tỏi Rau muống xào tỏi Rau muống xào tỏi Rau muống xào tỏi ",
      money: 100000,
      id: 12
    }
    ,
    {
      img: ud6,
      title: "Rau muống xào tỏi 13",
      money: 100000,
      id: 13
    }
    ,
    {
      img: ud6,
      title: "Rau muống xào tỏi 14",
      money: 100000,
      id: 14
    }
  ]

  //Datafake danh mục món
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
    },
  ]


  function handleChooseFood(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id)
    if (a == -1) {
      item.count = 1
      _list.push(item)
    }
    setoOrderSelected(_list)
  }

  function handleClickDelete(item) {
    setDisplayLine2ChooseOrder({ show: false, index: "" })
    let _list = [...orderSelected];
    let newList = _list.filter((l) => l.id !== item.id);

    setoOrderSelected(newList)
  }
  function handleClickUpCount(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id);
    _list[a].count += 1
    setoOrderSelected(_list)
  }

  function handleClickDownCount(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id);
    _list[a].count -= 1
    setoOrderSelected(_list)
  }

  function renderTotalCount() {
    let total = 0;
    orderSelected?.map((item) => {
      total += parseInt(item?.money) * parseInt(item?.count)
    })
    return total
  }


  return (
    <div className="order-page-container">
      <div className="order-page-container__food-list">
        <div className="order-page-container__food-list__top">
          <div className="order-page-container__food-list__top__logo">
            {
              logo.map((item) => {
                return (
                  <img src={item.img} />
                )
              })
            }
          </div>
          <div className="order-page-container__food-list__top__search">
            <div className="order-page-container__food-list__top__search__textbox">
              <InputField placeholder={"Nhập tên món ăn..."} autoFocus />
            </div >
            <div className="order-page-container__food-list__top__search__icon">
              <SearchOutlined style={{ fontSize: '24px', color: '#fff', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className="order-page-container__food-list__list">
          {
            dataFake.map((item) => {
              return (<div className="order-page-container__food-list__list-item" onClick={(e) => { e.stopPropagation(); handleChooseFood(item) }}>
                <div className="order-page-container__food-list__list-item-img">
                  <img src={item.img} />
                </div>
                <div className="order-page-container__food-list__list-item-title">
                  {commonFunction.smartText(40, item.title)}
                </div>
                <div className="order-page-container__food-list__list-item-money">
                  {item.money}đ
                </div>
              </div>)
            })
          }
        </div>
        <div className="order-page-container__food-list__choose">
          {
            listMenu.map((item, key) => {
              return (
                <div className={`order-page-container__food-list__choose__children ${index == item.index ? 'order-selected' : ''}`}
                  style={{ width: `calc(100% / ${listMenu?.length})`, borderLeft: key != 0 ? '1px solid #fff' : '' }}
                  onClick={() => { setIndex(item.index) }}
                >
                  {item.title}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="order-page-container__selected-dish">
        <div className="order-page-container__selected-dish-top">
          <div className="order-page-container__selected-dish-top-title">
            Món đã chọn{`(${orderSelected?.length})`}
          </div>
          <div className="order-page-container__selected-dish-top-table">
            Bàn: 15
          </div>
        </div>
        <div className="order-page-container__selected-dish-content" ref={renderChoose}>
          <div className="order-page-container__selected-dish-content-header">
            <div className="order-page-container__selected-dish-content-header-name">
              Tên món ăn
            </div>
            <div className="order-page-container__selected-dish-content-header-count">
              Số lượng
            </div>
            <div className="order-page-container__selected-dish-content-header-money">
              Đơn giá
            </div>
          </div>
          {orderSelected.length >0  ? orderSelected?.map((item) => {
            return (
              <div className="order-page-container__selected-dish-content-choose">
                <div className="order-page-container__selected-dish-content-choose-line1"
                  onMouseEnter={() => setDisplayLine2ChooseOrder({ show: true, index: item.id })}
                  onMouseLeave={() => setDisplayLine2ChooseOrder({ show: false, index: "" })}
                  onClick={() => setDisplayLine2ChooseOrder({ show: true, index: item.id })}
                >
                  <div className="food-name">{commonFunction.smartText(35, item.title)}</div>
                  <div className="line1-food-count">{item.count}</div>
                  <div className="food-money">
                    {commonFunction.numberWithCommas(item.money)}(đ)
                  </div>
                </div>
                {displayLine2ChooseOrder.show && displayLine2ChooseOrder.index == item.id &&
                  <div className="order-page-container__selected-dish-content-choose-line2"
                    onMouseEnter={() => setDisplayLine2ChooseOrder({ show: true, index: item.id })}
                    onMouseLeave={() => setDisplayLine2ChooseOrder({ show: false, index: "" })}
                  >
                    <div className="food-count">
                      <div className="food-count-button"><Tooltip title={"Giảm số lượng"} placement="bottom"><Button2 name={"-"} onClick={() => handleClickDownCount(item)} disabled={item?.count <= 1} /></Tooltip> </div>
                      <div className="food-count-number">{item.count}</div>
                      <div className="food-count-button"><Tooltip title={"Tăng số lượng"} placement="bottom"><Button2 name={"+"} onClick={() => handleClickUpCount(item)} /></Tooltip></div>
                    </div>
                    <div className="food-close" ><Tooltip title={"Xóa món"} placement="bottom"><Button2 name={"x"} onClick={() => { handleClickDelete(item) }} /></Tooltip></div>
                  </div>
                }
              </div>
            )
          }):<div className="order-page-container__selected-dish-content-no-data">
              <img src={noDataimg} height={150} width={150}/>
            </div>}
        </div>
        <div className="order-page-container__selected-dish-footer">
          <div className="order-page-container__selected-dish-footer-total">
            <div className="order-page-container__selected-dish-footer-total-title">
              Tổng tiền
            </div>
            <div className="order-page-container__selected-dish-footer-total-money">
              {commonFunction.numberWithCommas(renderTotalCount())}(đ)
            </div>
          </div>
          <div className="order-page-container__selected-dish-footer-confirm">
            <Button2 name={"Xác nhận"} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Order;
