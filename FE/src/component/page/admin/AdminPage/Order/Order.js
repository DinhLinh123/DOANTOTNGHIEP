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
import { SearchOutlined, PlusOutlined, MinusOutlined, CloseOutlined, LeftOutlined} from "@ant-design/icons";
import commonFunction from "../../../../base/common/commonFunction";
import Button2 from "../../../../base/Button/Button";
import { Tooltip } from "antd";
import noDataimg from "../../../../../image/no-data2.png"
import { useParams } from "react-router-dom";
import baseApi from "../../../../../api/baseApi";
import { API_MENU, API_ORDER, API_TABLE, API_TYPE_FOOD } from "../../../../base/common/endpoint";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import Popup from "../../../../base/Popup/Popup";
import { TYPE_MESSAGE } from "../../../../base/common/commonConstant";

function Order(props) {

  const [index, setIndex] = useState(1)
  const [orderSelected, setoOrderSelected] = useState([])
  const [table, setTable] = useState('')
  const [displayLine2ChooseOrder, setDisplayLine2ChooseOrder] = useState({
    show: false,
    index: ""
  })
  const [listMenu, setListMenu] = useState([])
  const [listType, setListType] = useState([])
  const [textSearch, setTextSearch] = useState("");
  const [ballotOrder, setBallotOrder] = useState({});
  const [showPopupWarningChoose, setShowPopupWarningChoose] = useState(false);
  const renderChoose = useRef([])
  let { tableID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    baseApi.get(
      (res) => {
        setTable(res?.data)
      },
      () => { },
      null,
      API_TABLE.GET_BY_ID + tableID
    )
  }, [tableID])

  useEffect(() => {
    if (table?.trangThai !== 0 && table?.trangThai !== 2) {
      baseApi.get(
        (res) => {
          setoOrderSelected(res?.data?.doAns || [])
          setBallotOrder(res?.data)
        },
        () => { },
        null,
        API_ORDER.GET_BY_ID_TABLE + tableID
      )
    }
  }, [table])

  useEffect(() => {
    callGetAllFood()
  }, [index])

  let logo = [
    {
      img: logo1,
    }
  ]


  function handleChooseFood(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id)
    if (a == -1) {
      item.soLuong = 1
      _list.push(item)
    }
    else {
      setShowPopupWarningChoose(true)
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
    _list[a].soLuong += 1
    setoOrderSelected(_list)
  }

  function handleClickDownCount(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id);
    _list[a].soLuong -= 1
    setoOrderSelected(_list)
  }

  function renderTotalCount() {
    let total = 0;
    orderSelected?.map((item) => {
      total += parseInt(item?.donGia) * parseInt(item?.soLuong)
    })
    return total
  }

  function callGetAllFood() {
    dispatch(changeLoadingApp(true))
    let param = {
      "TextSearch": textSearch,
      "maTheLoai": index
    }
    let endpoint = encodeURIComponent(JSON.stringify(param))
    if (index?.length > 0) {
      baseApi.get(
        (res) => {
          dispatch(changeLoadingApp(false))
          setListMenu(res.data)
        },
        () => {
          dispatch(changeLoadingApp(false))
        },
        null,
        API_MENU.GET_BY_FILTER + endpoint,
        null,
        {}
      )
    }
    dispatch(changeLoadingApp(false))
  }

  useEffect(() => { callGetTypeFood() }, [])
  useEffect(() => { callGetAllFood() }, [textSearch])

  function callGetTypeFood() {
    baseApi.get(
      (res) => {
        setListType(res)
        setIndex(res[0]?.id)
      },
      () => {
      },
      null,
      API_TYPE_FOOD.GET_ALL,
      null,
      {}
    )
  }

  function callOrderFood() {
    let body = {
      "idBan": tableID,
      "tongTien": renderTotalCount(),
      "monAns": orderSelected
    }
    baseApi.post(
      (res) => {
        let _table = table;
        _table.trangThai = 1;
        baseApi.put(
          () => {},
          () => { },
          null,
          API_TABLE.UPDATE_BY_ID + tableID,
          null,
          _table
        )
        window.open(`/admin/tables`, "_self")
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm phiếu oder thành công!")
      },
      () => {
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm phiếu oder thất bại!")
      },
      null,
      API_ORDER.CREATE_NEW,
      null,
      body
    )
  }

  function callUpdateOrderFood() {
    let phieu = ballotOrder;
    let body = {
      "id": phieu.id,
      "idBan": tableID,
      "tongTien": renderTotalCount(),
      "monAns": orderSelected,
      "idThuNgan": phieu.thuNgan == null ? "00000000-0000-0000-0000-000000000000" : phieu.thuNgan,
      "idKhachHang": phieu.khachHang == null ? "00000000-0000-0000-0000-000000000000" : phieu.khachHang,
      "thucThu": 0,
      "vocher": "string",
      "soTienGiam": 0,
      "trangThai": 0,
      "lastModifiedByUserId": phieu.lastModifiedByUserId,
      "lastModifiedByUserName": phieu.lastModifiedByUserName
    }
    baseApi.put(
      (res) => {
        // let _table = table;
        // _table.trangThai = 1;
        window.open(`/admin/tables`, "_self")
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Cập nhật phiếu oder thành công!")
      },
      () => {
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Cập nhật phiếu oder thất bại!")
      },
      null,
      API_ORDER.UPDATE_BY_ID + ballotOrder.id,
      null,
      body
    )
  }

  return (
    <div className="order-page-container">
      <div className="order-page-container__food-list">
        <div className="order-page-container__food-list__top">
          <div className="order-page-container__food-list__top-back"
            onClick={() => { window.open('/admin/tables', '_self') }}
          >
            <LeftOutlined style={{color: '#ffffff'}}/>
          </div>
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
              <InputField placeholder={"Nhập tên món ăn..."} onChange={(val) => {
                setTimeout(() => {
                  setTextSearch(val)
                }, 200);
              }} />
            </div>
          </div>
        </div>
        <div className="order-page-container__food-list__list">
          {listMenu && listMenu?.length > 0 ? listMenu?.map((item) => {
            return (<div className="order-page-container__food-list__list-item" onClick={(e) => { e.stopPropagation(); handleChooseFood(item) }}>
              <div className="order-page-container__food-list__list-item-img">
                <img src={item.linkAnh} alt="" />
              </div>
              <div className="order-page-container__food-list__list-item-title">
                {commonFunction.smartText(40, item?.name)}
              </div>
              <div className="order-page-container__food-list__list-item-money">
                {commonFunction.numberWithCommas(parseInt(item?.donGia))}đ
              </div>
            </div>)
          }) : null}

        </div>
        <div className="order-page-container__food-list__choose">
          {
            listType?.map((item, key) => {
              return (
                <div className={`order-page-container__food-list__choose__children ${index == item.id ? 'order-selected' : ''}`}
                  style={{ width: `calc(100% / ${listType?.length})`, borderLeft: key != 0 ? '1px solid #fff' : '' }}
                  onClick={() => { setIndex(item.id) }}
                >
                  {item.name}
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
            Bàn: {table?.name}
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
          {orderSelected?.length > 0 ? orderSelected?.map((item) => {
            return (
              <div className="order-page-container__selected-dish-content-choose">
                <div className="order-page-container__selected-dish-content-choose-line1"
                  onMouseEnter={() => setDisplayLine2ChooseOrder({ show: true, index: item.id })}
                  onMouseLeave={() => setDisplayLine2ChooseOrder({ show: false, index: "" })}
                  onClick={() => setDisplayLine2ChooseOrder({ show: true, index: item.id })}
                  style={{ backgroundColor: displayLine2ChooseOrder.show && displayLine2ChooseOrder.index == item.id && '#dff9fb' }}
                >
                  <div className="food-name">{commonFunction.smartText(35, item.name)}</div>
                  <div className="line1-food-count">{item.soLuong}</div>
                  <div className="food-money">
                    {commonFunction.numberWithCommas(parseInt(item.donGia))}(đ)
                  </div>
                </div>
                {displayLine2ChooseOrder.show && displayLine2ChooseOrder.index == item.id &&
                  <div className="order-page-container__selected-dish-content-choose-line2"
                    onMouseEnter={() => setDisplayLine2ChooseOrder({ show: true, index: item.id })}
                    onMouseLeave={() => setDisplayLine2ChooseOrder({ show: false, index: "" })}
                    style={{ backgroundColor: displayLine2ChooseOrder.show && displayLine2ChooseOrder.index == item.id && '#dff9fb' }}
                  >
                    <div className="food-count">
                      <div className="food-count-button"><Tooltip title={"Giảm số lượng"} placement="bottom"><Button2 name={"-"} onClick={() => handleClickDownCount(item)} disabled={item?.count <= 1} /></Tooltip> </div>
                      <div className="food-count-number">{item.soLuong}</div>
                      <div className="food-count-button"><Tooltip title={"Tăng số lượng"} placement="bottom"><Button2 name={"+"} onClick={() => handleClickUpCount(item)} /></Tooltip></div>
                    </div>
                    <div className="food-close" ><Tooltip title={"Xóa món"} placement="bottom"><Button2 name={"x"} onClick={() => { handleClickDelete(item) }} /></Tooltip></div>
                  </div>
                }
              </div>
            )
          }) : <div className="order-page-container__selected-dish-content-no-data">
            <img src={noDataimg} height={150} width={150} />
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
            <Button2 name={"Xác nhận"} onClick={() => {
              if (table?.trangThai === 0 || table?.trangThai === 2) {
                callOrderFood()
              } else {
                callUpdateOrderFood()
              }
            }} />
          </div>
        </div>
      </div>
      <Popup
        title={"Cảnh báo"}
        show={showPopupWarningChoose}
        onClickClose={() => setShowPopupWarningChoose(false)}
        button={[
          <Button2
            name={"Hủy"}
            onClick={() => setShowPopupWarningChoose(false)}
          />,
        ]}
        width={600}
        className={"menu-popup-detail"}
        body={
          <div style={{ marginTop: '24px', fontSize: '16px', }}>Món ăn đã có trong danh sách, bạn có thể thay đổi số lượng</div>
        }
      />
    </div>
  );
}
export default Order;
