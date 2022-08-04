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
Offer.propTypes = {};

Offer.defaultProps = {};
//giới thiệu
function Offer(props) {
  const [isShowPopupDetail, setIsShowPopupDetail] = useState(false);
  const [offerDetail, setOfferDetail] = useState({});
  const offer1 = {
    img: ud1,
    title: "hahahaha",
    content: "hahahahaa hahahahaha hahahhahah ...",
    contentMore:
      "hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihihihihihihihi hihihihihih hihihihihi hihihihihihi hihihihihih hihihihihi",
  };

  const offer2 = {
    img: ud2,
    title: "hahahaha",
    content: "hahahahaa hahahahaha hahahhahah ...",
    contentMore: "hihihihihihi hihihihihih hihihihihi",
  };
  const offer3 = {
    img: ud3,
    title: "hahahaha",
    content: "hahahahaa hahahahaha hahahhahah ...",
    contentMore: "hihihihihihi hihihihihih hihihihihi",
  };
  const offer4 = {
    img: ud4,
    title: "hahahaha",
    content: "hahahahaa hahahahaha hahahhahah ...",
    contentMore: "hihihihihihi hihihihihih hihihihihi",
  };
  const offer5 = {
    img: ud5,
    title: "hahahaha",
    content: "hahahahaa hahahahaha hahahhahah ...",
    contentMore: "hihihihihihi hihihihihih hihihihihi",
  };
  const offer6 = {
    img: ud6,
    title: "hahahaha",
    content: "hahahahaa hahahahaha hahahhahah ...",
    contentMore: "hihihihihihi hihihihihih hihihihihi",
  };

  function handleClickDetait(type) {
    setOfferDetail(type);
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
          <div className="offer-container__list-row">
            <div
              className="offer-container__list-row-item"
              onClick={() => handleClickDetait(offer1)}
            >
              <div className="offer-container__list-row-item-img">
                <img src={offer1.img} />
              </div>
              <div className="offer-container__list-row-item-title">
                {offer1.title}
              </div>
              <div className="offer-container__list-row-item-more">
                {offer1.content}
              </div>
              <div className="offer-container__list-row-item-detail">
                {`Chi tiết >>>`}
              </div>
            </div>{" "}
            <div
              className="offer-container__list-row-item"
              onClick={() => handleClickDetait(offer2)}
            >
              <div className="offer-container__list-row-item-img">
                <img src={offer2.img} />
              </div>
              <div className="offer-container__list-row-item-title">
                {offer2.title}
              </div>
              <div className="offer-container__list-row-item-more">
                {offer2.content}
              </div>
              <div className="offer-container__list-row-item-detail">
                {`Chi tiết >>>`}
              </div>
            </div>{" "}
            <div
              className="offer-container__list-row-item"
              onClick={() => handleClickDetait(offer3)}
            >
              <div className="offer-container__list-row-item-img">
                <img src={offer3.img} />
              </div>
              <div className="offer-container__list-row-item-title">
                {offer3.title}
              </div>
              <div className="offer-container__list-row-item-more">
                {offer3.content}
              </div>
              <div className="offer-container__list-row-item-detail">
                {`Chi tiết >>>`}
              </div>
            </div>
          </div>
          <div className="offer-container__list-row">
            <div
              className="offer-container__list-row-item"
              onClick={() => handleClickDetait(offer4)}
            >
              <div className="offer-container__list-row-item-img">
                <img src={offer4.img} />
              </div>
              <div className="offer-container__list-row-item-title">
                {offer4.title}
              </div>
              <div className="offer-container__list-row-item-more">
                {offer4.content}
              </div>
              <div className="offer-container__list-row-item-detail">
                {`Chi tiết >>>`}
              </div>
            </div>{" "}
            <div
              className="offer-container__list-row-item"
              onClick={() => handleClickDetait(offer5)}
            >
              <div className="offer-container__list-row-item-img">
                <img src={offer5.img} />
              </div>
              <div className="offer-container__list-row-item-title">
                {offer5.title}
              </div>
              <div className="offer-container__list-row-item-more">
                {offer5.content}
              </div>
              <div className="offer-container__list-row-item-detail">
                {`Chi tiết >>>`}
              </div>
            </div>{" "}
            <div
              className="offer-container__list-row-item"
              onClick={() => handleClickDetait(offer6)}
            >
              <div className="offer-container__list-row-item-img">
                <img src={offer6.img} />
              </div>
              <div className="offer-container__list-row-item-title">
                {offer6.title}
              </div>
              <div className="offer-container__list-row-item-more">
                {offer6.content}
              </div>
              <div className="offer-container__list-row-item-detail">
                {`Chi tiết >>>`}
              </div>
            </div>
          </div>
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
            <div className="popup-detail-body__img">
              <img src={offerDetail.img} />
            </div>
            <div className="popup-detail-body__title">{offerDetail.title}</div>
            <div className="popup-detail-body__more">
              {offerDetail.contentMore}
            </div>
          </div>
        }
      />
    </ClientPage>
  );
}

export default Offer;
