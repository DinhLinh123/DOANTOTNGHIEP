import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import {
  MENU_TAB_ADMIN,
  SORT_TYPE,
  TYPE_MESSAGE,
} from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined, TagsOutlined, EditOutlined } from "@ant-design/icons";
import "./pay.scss";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import { Tooltip } from "antd";
import { changeAccount } from "../../../../../reudux/action/accountAction";
import commonFunction from "../../../../base/common/commonFunction";
import { API_AREA, API_MENU, API_OFFER, API_ORDER, API_TABLE, API_TYPE_FOOD } from "../../../../base/common/endpoint";
import baseApi from "../../../../../api/baseApi";
import ud1 from "../../../../../image/ud1.jpg";
import ud2 from "../../../../../image/ud2.jpg";
import ud3 from "../../../../../image/ud3.jpg";
import ud4 from "../../../../../image/ud4.jpg";
import ud5 from "../../../../../image/ud5.jpg";
import ud6 from "../../../../../image/ud6.png";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import RadioCheck from "../../../../base/Radio/Radio";

function Spending(props) {
  const dispatch = useDispatch();
  const [listTable, setListTable] = useState([]);
  const [listMenu, setListMenu] = useState([])
  const [listType, setListType] = useState([])
  const [orderSelected, setoOrderSelected] = useState([]);
  const [table, setTable] = useState();
  const [order, setOrder] = useState();
  const [displayLine2ChooseOrder, setDisplayLine2ChooseOrder] = useState({
    show: false,
    index: "",
  });
  const [showPopupOffer, setShowPopupOffer] = useState(false);
  const [showPopupOfferDetail, setShowPopupOfferDetail] = useState(false);
  const [showPopupPayMethod, setShowPopupPayMethod] = useState(false);
  const [offerDetail, setOfferDetail] = useState({});
  const [offerChoose, setOfferChoose] = useState({});
  const [tableID, setTableID] = useState('');
  const [moneyCustomer, setMoneyCustomer] = useState();
  const [payMethod, setPayMethod] = useState(0);
  const [listArea, setListArea] = useState([]);
  const [listOffer, setListOffer] = useState([]);
  const [showPopupEditFood, setShowPopupEditFood] = useState({ show: false, key: -1, item: '', action: -1 });
  const [showPopupWarningChoose, setShowPopupWarningChoose] = useState(false);
  const [index, setIndex] = useState(1)
  const [moneyVoucher, setMoneyVoucher] = useState(0)
  const [moneyMust, setMoneyMust] = useState(0)
  const [moneyTotal, setMoneyTotal] = useState(0)

  //lấy danh sách các ưu đãi
  useEffect(() => {
    if (showPopupOffer) {
      let param = {
        "trangThai": 0
      }
      dispatch(changeLoadingApp(true))
      baseApi.get(
        (res) => {
          setListOffer(res?.data);
          dispatch(changeLoadingApp(false))
        },
        () => { dispatch(changeLoadingApp(false)) },
        null,
        API_OFFER.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param))
      );
    }
  }, [showPopupOffer])


  //lấy chi tiết bàn
  useEffect(() => {
    if (tableID) {
      dispatch(changeLoadingApp(true))
      baseApi.get(
        (res) => {
          setTable(res?.data);
          baseApi.get(
            (res) => {
              setOrder(res?.data);
              setoOrderSelected(res?.data?.doAns)
              setOfferChoose({})
              setMoneyVoucher(0)
              dispatch(changeLoadingApp(false))
            },
            () => { setoOrderSelected([])},
            null,
            API_ORDER.GET_BY_ID_TABLE + tableID
          )
          dispatch(changeLoadingApp(false))
        },
        () => { dispatch(changeLoadingApp(false)) },
        null,
        API_TABLE.GET_BY_ID + tableID
      );
    }
  }, [tableID]);

  function callApiGetAreaAndTable() {
    dispatch(changeLoadingApp(true))
    baseApi.get(
      (res) => {
        dispatch(changeLoadingApp(false))
        setListArea(res);
      },
      () => { dispatch(changeLoadingApp(false)) },
      null,
      API_AREA.GET_ALL
    );

    //lấy danh sách bàn
    baseApi.get(
      (res) => {
        dispatch(changeLoadingApp(false))
        setListTable(res?.data);
      },
      () => { dispatch(changeLoadingApp(false)) },
      null,
      API_TABLE.GET_ALL
    );

    callGetTypeFood()
  }

  //lấy danh sách khu vực
  useEffect(() => {
    callApiGetAreaAndTable()
  }, []);

  function handleClickDelete(item) {
    setDisplayLine2ChooseOrder({ show: false, index: "" });
    let _list = [...orderSelected];
    let newList = _list.filter((l) => l.id !== item.id);

    setoOrderSelected(newList);
  }
  function handleClickUpCount(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id);
    _list[a].soLuong += 1;
    setoOrderSelected(_list);
  }

  function handleClickDownCount(item) {
    let _list = [...orderSelected];
    let a = _list?.findIndex((l) => l.id === item.id);
    _list[a].soLuong -= 1;
    setoOrderSelected(_list);
  }

  useEffect(() => {
    renderTotalCount()
  }, [orderSelected])

  function renderTotalCount() {
    let total = 0;
    orderSelected?.map((item) => {
      total += parseInt(item?.donGia) * parseInt(item?.soLuong);
    });
    setMoneyTotal(total)
    handleChooseVoucher(offerChoose, total)
  }

  function renderMoneyReturn(moneyCustomer) {
    if (moneyCustomer) {
      let _moneyMust = JSON.stringify(offerChoose) == '{}' ? moneyTotal : moneyMust
      let _return = parseInt(moneyCustomer) - _moneyMust;
      return _return
    }
    return 0
  }

  //thực hiện thanh toán
  function callApiPay() {
    dispatch(changeLoadingApp(true))
    let body = order
    body.doAns = orderSelected
    body.tongTien = moneyTotal
    body.thucThu = moneyMust
    body.soTienGiam = moneyVoucher
    body.idBan = tableID
    body.trangThai= 1
    baseApi.put(
      (res) => {
        // let _table = table;
        // _table.trangThai = 0;
        // baseApi.put(
        //   () => { },
        //   () => { },
        //   null,
        //   API_TABLE.UPDATE_BY_ID + table?.id,
        //   null,
        //   _table
        // )
        callApiGetAreaAndTable()
        setShowPopupPayMethod(false)
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thanh toán thành công")
        dispatch(changeLoadingApp(false))
      },
      () => {
        dispatch(changeLoadingApp(false))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thanh toán thất bại")
      },
      null,
      API_ORDER.UPDATE_BY_ID + order?.id,
      null,
      body
    );
  }

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

  function callGetAllFood() {
    dispatch(changeLoadingApp(true))
    let param = {
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

  useEffect(() => {
    if (showPopupEditFood.show) {
      callGetAllFood()
    }
  }, [showPopupEditFood, index])

  function handldChangeFood(val) {
    if (showPopupEditFood.action === 0) {
      let _list = [...orderSelected];
      let a = _list?.findIndex((l) => l.id === val.id)
      if (a == -1) {
        val.soLuong = 1
        _list.push(val)
      }
      else {
        setShowPopupWarningChoose(true)
      }
      setoOrderSelected(_list)
      setShowPopupEditFood({ show: false, key: -1, item: '', action: -1 })
    }
    else {
      let _list = [...orderSelected]
      let _listID = _list.map((item) => { return item.id })
      let _index = _listID.indexOf(val.id)
      if (_index == -1) {

        val.soLuong = showPopupEditFood.item?.soLuong
        _list.splice(showPopupEditFood.key, 1, val)
        setoOrderSelected(_list)
        setShowPopupEditFood({ show: false })
      }
      else {
        setShowPopupWarningChoose(true)
      }
    }
  }

  function handleChooseVoucher(val, total) {

    if (val?.loaiUuDai === 0) {
      if (val?.donViTinh === 0) {
        let moneyVoucher = total * (val?.giaTri / 100)
        setMoneyVoucher(moneyVoucher)
        let money = total - moneyVoucher;
        setMoneyMust(money)
      }
      if (val?.donViTinh === 1) {
        setMoneyVoucher(val?.giaTri)
        setMoneyMust(total - val?.giaTri)
      }
    } else {
      let moneyInFood = 0;
      if(val?.idDoAn !="" || val?.idDoAn != "00000000-0000-0000-0000-000000000000")
      {
        orderSelected?.map((item) => {
          if (item.id === val?.idDoAn) {
            moneyInFood = item.donGia * item.soLuong
          }
        })
      }

      if (val?.donViTinh === 0) {
        let moneyVoucher = moneyInFood * (val?.giaTri / 100)
        setMoneyVoucher(moneyVoucher)
        let money = total - moneyVoucher;
        setMoneyMust(money)
      }
      if (val?.donViTinh === 1) {
        setMoneyVoucher(val?.giaTri)
        setMoneyMust(total - val?.giaTri)
      }
    }
  }



  return (
    <AdminPage title={"Thanh toán hóa đơn"} index={MENU_TAB_ADMIN.PAY}>
      <div className="pay-manager">
        <div className="pay-manager__area">
          {listArea?.map((item) => {
            return (
              <>
                <div className="pay-manager__area-name">{item?.name}</div>
                <div className="pay-manager__area-table">
                  {listTable?.map((_item) => {
                    if (_item?.idKhuVuc === item?.id) {
                      return (
                        <div
                          className="pay-manager__area-table-name"
                          style={{
                            backgroundColor:
                              _item.trangThai == 0
                                ? "#dcdde1"
                                : _item.trangThai == 1
                                  ? "#c23616"
                                  : "#fbc531",
                            color:
                              _item.trangThai == 0
                                ? "#000"
                                : _item.trangThai == 1
                                  ? "#fff"
                                  : "#fff",
                          }}
                          onClick={() => { setTableID(_item?.id) }}
                        >
                          {_item?.name}
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            );
          })}
        </div>
        <div className="pay-manager__bill">
          <div className="pay-manager__bill-dish">
            <div className="pay-manager__bill-dish-top">
              <div className="pay-manager__bill-dish-top-title">
                Món đã chọn{`(${orderSelected?.length || 0})`}
              </div>
              <div className="pay-manager__bill-dish-top-add">
                <Button2 name={"thêm món ăn"} background={'#0abde3'} onClick={() => { setShowPopupEditFood({ show: true, key: -1, item: '', action: 0 }) }} />
              </div>
              <div className="pay-manager__bill-dish-top-table">
                Bàn: {table?.name}
              </div>
            </div>
            <div className="pay-manager__bill-dish-content">
              <div className="pay-manager__bill-dish-content-header">
                <div className="pay-manager__bill-dish-content-header-name">
                  Tên món ăn
                </div>
                <div className="pay-manager__bill-dish-content-header-count">
                  Số lượng
                </div>
                <div className="pay-manager__bill-dish-content-header-money">
                  Đơn giá
                </div>
              </div>
              {orderSelected?.length > 0 ? (
                orderSelected?.map((item, key) => {
                  return (
                    <div className="pay-manager__bill-dish-content-choose">
                      <div
                        className="pay-manager__bill-dish-content-choose-line1"
                        onMouseEnter={() =>
                          setDisplayLine2ChooseOrder({
                            show: true,
                            index: item.id,
                          })
                        }
                        onMouseLeave={() =>
                          setDisplayLine2ChooseOrder({ show: false, index: "" })
                        }
                        onClick={() =>
                          setDisplayLine2ChooseOrder({
                            show: true,
                            index: item.id,
                          })
                        }
                        style={{
                          backgroundColor:
                            displayLine2ChooseOrder.show &&
                            displayLine2ChooseOrder.index == item.id &&
                            "#dff9fb",
                        }}
                      >
                        <div className="food-name">
                          {commonFunction.smartText(35, item.name)}
                        </div>
                        <div className="line1-food-count">{item.soLuong}</div>
                        <div className="food-money">
                          {commonFunction.numberWithCommas(item.donGia)}(đ)
                        </div>
                      </div>
                      {displayLine2ChooseOrder.show &&
                        displayLine2ChooseOrder.index == item.id && (
                          <div
                            className="pay-manager__bill-dish-content-choose-line2"
                            onMouseEnter={() =>
                              setDisplayLine2ChooseOrder({
                                show: true,
                                index: item.id,
                              })
                            }
                            onMouseLeave={() =>
                              setDisplayLine2ChooseOrder({
                                show: false,
                                index: "",
                              })
                            }
                            style={{
                              backgroundColor:
                                displayLine2ChooseOrder.show &&
                                displayLine2ChooseOrder.index == item.id &&
                                "#dff9fb",
                            }}
                          >
                            <div className="food-edit">
                              <Tooltip
                                title={"Sửa món ăn"}
                                placement="bottom"
                              >
                                <Button2
                                  onClick={() => {
                                    setShowPopupEditFood({ show: true, key: key, item: item, action: 1 })
                                  }}
                                  leftIcon={<EditOutlined />}
                                />
                              </Tooltip>{" "}
                            </div>
                            <div className="food-count">

                              <div className="food-count-button">
                                <Tooltip
                                  title={"Giảm số lượng"}
                                  placement="bottom"
                                >
                                  <Button2
                                    name={"-"}
                                    onClick={() => handleClickDownCount(item)}
                                    disabled={item?.soLuong <= 1}
                                  />
                                </Tooltip>{" "}
                              </div>
                              <div className="food-count-number">
                                {item.soLuong}
                              </div>
                              <div className="food-count-button">
                                <Tooltip
                                  title={"Tăng số lượng"}
                                  placement="bottom"
                                >
                                  <Button2
                                    name={"+"}
                                    onClick={() => handleClickUpCount(item)}
                                  />
                                </Tooltip>
                              </div>
                            </div>
                            <div className="food-close">
                              <Tooltip title={"Xóa món"} placement="bottom">
                                <Button2
                                  name={"x"}
                                  onClick={() => {
                                    handleClickDelete(item);
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })
              ) : (
                <div className="pay-manager__bill-dish-content-no-data">
                  {/* <img src={noDataimg} height={150} width={150} /> */}
                </div>
              )}
            </div>
            <div className="pay-manager__bill-dish-footer">
              <div className="pay-manager__bill-dish-footer-total">
                <div className="pay-manager__bill-dish-footer-total-title">
                  Tổng tiền
                </div>
                <div className="pay-manager__bill-dish-footer-total-money">
                  {commonFunction.numberWithCommas(moneyTotal)}(đ)
                </div>
              </div>
              <div className="pay-manager__bill-dish-footer-offer">
                <div className="pay-manager__bill-dish-footer-offer-title">
                  <div className="pay-manager__bill-dish-footer-offer-title-icon">
                    <TagsOutlined />
                  </div>
                  Mã giảm giá
                </div>
                <div
                  className="pay-manager__bill-dish-footer-offer-choose"
                  onClick={() => setShowPopupOffer(true)}
                >
                  {JSON.stringify(offerChoose) !== '{}' ? offerChoose.name : "Chọn voucher"}
                </div>
              </div>
              <div className="pay-manager__bill-dish-footer-money-offer">
                <div className="pay-manager__bill-dish-footer-money-offer-title">
                  Tiền giảm từ voucher
                </div>
                <div className="pay-manager__bill-dish-footer-money-offer-choose">
                  {commonFunction.numberWithCommas(moneyVoucher)}(đ)
                </div>
              </div>
              <div className="pay-manager__bill-dish-footer-money">
                <div className="pay-manager__bill-dish-footer-money-title">
                  Tiền phải trả
                </div>
                <div className="pay-manager__bill-dish-footer-money-choose">
                  {commonFunction.numberWithCommas(JSON.stringify(offerChoose) == '{}' ? moneyTotal : moneyMust)}(đ)
                </div>
              </div>
              <div className="pay-manager__bill-dish-footer-confirm">
                <div className="pay-manager__bill-dish-footer-confirm-pay">
                  <Button2 name={"Thanh toán"} disabled={moneyMust === 0 && moneyTotal === 0} background={'#0984e3'} onClick={() => setShowPopupPayMethod(true)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup
        title={"Danh sách voucher"}
        show={showPopupOffer}
        onClickClose={() => {
          setShowPopupOffer(false);
        }}
        button={[
          <Button2
            name={"Đóng"}
            onClick={() => {
              setShowPopupOffer(false);
            }}
          />,
        ]}
        width={1000}
        body={
          <div className="pay-offer-container__list">
            {listOffer?.map((item) => {
              return (
                <div className="pay-offer-container__list-item">
                  <div className="pay-offer-container__list-item-img"
                    onClick={() => {
                      setShowPopupOffer(false)
                      setOfferChoose(item)
                      handleChooseVoucher(item, moneyTotal)
                    }}
                  >
                    <img src={item?.anh} />
                  </div>
                  <div className="pay-offer-container__list-item-title"
                    onClick={() => {
                      setShowPopupOffer(false)
                      setOfferChoose(item)
                      handleChooseVoucher(item, moneyTotal)
                    }}
                  >
                    {item?.name}
                  </div>
                  <div className="pay-offer-container__list-item-more"
                    onClick={() => {
                      setShowPopupOffer(false)
                      setOfferChoose(item)
                      handleChooseVoucher(item, moneyTotal)
                    }}
                  >
                    {commonFunction.smartText(35, item?.noiDung)}
                  </div>
                  <div
                    className="pay-offer-container__list-item-detail"
                    onClick={() => {
                      setOfferDetail(item);
                      setShowPopupOfferDetail(true);
                    }}
                  >
                    {`Chi tiết >>>`}
                  </div>
                </div>
              );
            })}
          </div>
        }
      />

      <Popup
        title={"Thông tin ưu đãi"}
        show={showPopupOfferDetail}
        onClickClose={() => setShowPopupOfferDetail(false)}
        button={[
          <Button2
            name={"Đóng"}
            onClick={() => setShowPopupOfferDetail(false)}
          />,
        ]}
        width={600}
        body={
          <div className="popup-detail-body">
            <div className="popup-detail-body__img">
              <img src={offerDetail?.anh} />
            </div>
            <div className="popup-detail-body__title">{offerDetail.name}</div>
            <div className="popup-detail-body__more">{offerDetail.noiDung}</div>
          </div>
        }
      />

      <Popup
        title={"Phương thức thanh toán"}
        show={showPopupPayMethod}
        onClickClose={() => setShowPopupPayMethod(false)}
        button={[
          <Button2
            name={"Đóng"}
            onClick={() => setShowPopupPayMethod(false)}
          />,
          <Button2
            name={"Thanh toán"}
            onClick={() => callApiPay()}
            background={'#0984e3'}
          />,
        ]}
        width={600}
        body={
          <div className="popup-pay">
            <div className="popup-pay__request">
              <div className="popup-pay__request-label">
                Tiền phải thanh toán
              </div>
              <div className="popup-pay__request-label">
                {commonFunction.numberWithCommas(JSON.stringify(offerChoose) == '{}' ? moneyTotal : moneyMust)}(đ)
              </div>
            </div>
            <div className="popup-pay__method">
              <RadioCheck
                title={"Chọn phương thức thanh toán"}
                listOption={[{ label: "Tiền mặt", value: 0 }, { label: "Chuyển khoản/Quẹt thẻ", value: 1 }]}
                onChange={(val) => { setPayMethod(val) }}
                valueDefault={payMethod}
              />
            </div>
            {
              payMethod === 0 &&
              <>
                <div className="popup-pay__customer">
                  <div className="popup-pay__customer-input">
                    <InputField
                      label={"Tiền khách đưa"}
                      type={'number'}
                      value={moneyCustomer}
                      onChange={(val) => setMoneyCustomer(val)}
                    />
                  </div><div className="popup-pay__customer-radio">
                    <RadioCheck
                      listOption={[{ label: "200.000", value: 200000 }, { label: "500.000", value: 500000 }, { label: "1.000.000", value: 1000000 }, { label: "1.500.000", value: 1500000 }, { label: "2.000.000", value: 2000000 }]}
                      onChange={(val) => { setMoneyCustomer(val) }}
                      valueDefault={moneyCustomer}
                    />
                  </div>
                </div>
                <div className="popup-pay__return">
                  <div className="popup-pay__return-label">
                    Tiền trả lại khách
                  </div>
                  <div className="popup-pay__return-label">
                    {commonFunction.numberWithCommas(renderMoneyReturn(moneyCustomer))}(đ)
                  </div>
                </div>
              </>
            }


          </div>
        }
      />
      <Popup
        title={"Sửa món ăn"}
        show={showPopupEditFood.show}
        onClickClose={() => setShowPopupEditFood({ show: false, key: -1, item: '' })}
        button={[
          <Button2
            name={"Đóng"}
            onClick={() => setShowPopupEditFood({ show: false, key: -1, item: '' })}
          />,
        ]}
        width={800}
        body={
          <div className="popup-edit-food">
            <div className="popup-edit-food__list">
              {listMenu && listMenu?.length > 0 ? listMenu?.map((item) => {
                return (<div className="popup-edit-food__list-item" onClick={(e) => { e.stopPropagation(); handldChangeFood(item) }}>
                  <div className="popup-edit-food__list-item-img">
                    <img src={item.linkAnh} alt="" />
                  </div>
                  <div className="popup-edit-food__list-item-title">
                    {commonFunction.smartText(40, item?.name)}
                  </div>
                  <div className="popup-edit-food__list-item-money">
                    {commonFunction.numberWithCommas(parseInt(item?.donGia))}đ
                  </div>
                </div>)
              }) : null}

            </div>
            <div className="popup-edit-food__choose">
              {
                listType?.map((item, key) => {
                  return (
                    <div className={`popup-edit-food__choose__children ${index == item.id ? 'order-selected' : ''}`}
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
        }
      />

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
    </AdminPage>
  );
}
export default Spending;
