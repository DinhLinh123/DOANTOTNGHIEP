import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import home9 from "../../../../../image/home9.jpg";
import ud1 from "../../../../../image/ud1.jpg";
import ud2 from "../../../../../image/ud2.jpg";
import ud3 from "../../../../../image/ud3.jpg";
import ud4 from "../../../../../image/ud4.jpg";
import ud5 from "../../../../../image/ud5.jpg";
import ud6 from "../../../../../image/ud6.png";

import "./offer.scss";
import Button2 from "../../../../base/Button/Button";
import Popup from "../../../../base/Popup/Popup";
import { MENU_TAB_CLIENT } from "../../../../base/common/commonConstant";
import ClientPage from "../ClientPage";
import { API_OFFER } from "../../../../base/common/endpoint";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import baseApi from "../../../../../api/baseApi";
Offer.propTypes = {};

Offer.defaultProps = {};
//giới thiệu
function Offer(props) {
  const [isShowPopupDetail, setIsShowPopupDetail] = useState(false);
  const [offerDetail, setOfferDetail] = useState({});
  const [listOffer, setListOffer] = useState([]);

  const dispatch = useDispatch();


  useEffect(() => {
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
  }, [])

  function handleClickDetait(item) {
    setOfferDetail(item);
    setIsShowPopupDetail(true);
  }
  return (
    <ClientPage index={MENU_TAB_CLIENT.OFFER}>
      <div className="offer-container">
        <div
          className="offer-container__banner"
          style={{ backgroundImage: `url(${home9})` }}
        ></div>
        <div className="offer-container__list">
          {listOffer?.map((item) => {
            return (
              <div
                className="offer-container__list-item"
                onClick={() => handleClickDetait(item)}
              >
                <div className="offer-container__list-item-img"
                  style={{ backgroundImage: `url("${item.anh}")` }}>
                </div>
                <div className="offer-container__list-item-title">
                  {item.name}
                </div>
                <div className="offer-container__list-item-more">
                  {item.noiDung}
                </div>
                <div className="offer-container__list-item-detail">
                  {`Chi tiết >>>`}
                </div>
              </div>)
          })}

        </div>
      </div>
      <Popup
        title={"Thông tin ưu đãi"}
        show={isShowPopupDetail}
        onClickClose={() => setIsShowPopupDetail(false)}
        button={[
          <Button2 name={"Đóng"} onClick={() => setIsShowPopupDetail(false)} />,
        ]}
        width={800}
        body={
          <div className="popup-detail-body">
            <div className="popup-detail-body__img"
              style={{ backgroundImage: `url("${offerDetail.anh}")` }}
            >
            </div>
            <div className="popup-detail-body__title">{offerDetail.name}</div>
            <div className="popup-detail-body__more">
              {offerDetail.noiDung}
            </div>
          </div>
        }
      />
    </ClientPage>
  );
}

export default Offer;
