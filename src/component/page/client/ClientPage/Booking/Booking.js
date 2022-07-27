import React, { useEffect, useState } from "react";
import "./booking.scss";
import home9 from "../../../../../image/home9.jpg";
import banner5 from "../../../../../image/banner5.png";
import Input from "../../../../base/Input/Input";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import "antd/dist/antd.css";
import {
  MENU_TAB_CLIENT,
  ONE_DAY,
  TYPE_MESSAGE,
} from "../../../../base/common/commonConstant";
import CheckBox from "../../../../base/CheckBox/CheckBox";
import TimePicker from "../../../../base/TimePicker/TimePicker";
import Button from "../../../../base/Button/Button";
import ClientPage from "../ClientPage";
import commonFunction from "../../../../base/common/commonFunction";
Booking.propTypes = {};

Booking.defaultProps = {};
//giới thiệu
function Booking(props) {
  //state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerNamePhone, setCustomerPhone] = useState("");
  const [dateBooking, setDateBooking] = useState(moment().unix()
   * 1000);
  const [disabledButton, setDisabledButton] = useState(true);
  

  function onSubmit() {
    if(adults>0){
      alert("khoer")
    }else{
      commonFunction.messages(TYPE_MESSAGE.ERROR,"Số người lớn không được bằng 0. Vui lòng nhập lại!" )
    }
  }

  return (
    <ClientPage index={MENU_TAB_CLIENT.BOOKING}>
      <div className="booking-container">
        <div
          className="booking-container__banner"
          style={{ backgroundImage: `url(${home9})` }}
        ></div>
        <div className="booking-container__book">
          <div className="booking-container__book-left">
            <div className="booking-container__book-left-label">SET TABLE</div>
            <div className="booking-container__book-left-content">
              Quý khách vui lòng đặt bàn trước để có trải nghiệm thưởng thức ẩm
              thực tốt nhất tại House of Hongdae BBQ.
            </div>
            <div className="booking-container__book-left-img">
              <img src={banner5} />
            </div>
          </div>
          <div className="booking-container__book-right">
            <div className="booking-container__book-right-item">
              <Input
                defaultValue={customerName}
                onChange={(val) => {
                  setCustomerName(val);
                }}
                label={"Họ và tên"}
                placeholder="Tên của bạn..."
                required
                autoFocus
                setDangerNote={(val) => {
                  setDisabledButton(val);
                }}
              />
            </div>
            <div className="booking-container__book-right-item">
              <Input
                defaultValue={customerNamePhone}
                onChange={(val) => {
                  setCustomerPhone(val);
                }}
                label={"Số điện thoại"}
                required
                placeholder="Số điện thoại của bạn..."
                setDangerNote={(val) => {
                  setDisabledButton(val);
                }}
              />
            </div>
            <div className="booking-container__book-right-item">
              <Input
                defaultValue={adults}
                onChange={(val) => {
                  setAdults(val);
                }}
                type={"number"}
                label={"Số người lớn"}
                required
                setDangerNote={(val) => {
                  setDisabledButton(val);
                }}
              />
            </div>
            <div className="booking-container__book-right-item">
              <Input
                defaultValue={children}
                onChange={(val) => {
                  setChildren(val);
                }}
                type={"number"}
                label={"Số trẻ em"}
                required
                setDangerNote={(val) => {
                  setDisabledButton(val);
                }}
              />
            </div>
            <div className="booking-container__book-right-date">
              <div className="booking-container__book-right-date-item">
                <DatePicker
                  defaultValue={dateBooking}
                  min={moment().unix() * 1000 - ONE_DAY}
                  onChange={(val) => {
                    setDateBooking(val);
                  }}
                  placeholder="dd/MM/yyyy"
                  label={"Ngày"}
                />
              </div>
              <div className="booking-container__book-right-date-item">
                <TimePicker placeholder="dd/MM/yyyy" label={"Giờ"} />
              </div>
            </div>
            <div className="booking-container__book-right-button">
              <Button  name="Đặt bàn" background="#F3E385" color="#000" disabled={disabledButton} onClick={()=>onSubmit()} />
            </div>
          </div>
        </div>
      </div>
    </ClientPage>
  );
}

export default Booking;
