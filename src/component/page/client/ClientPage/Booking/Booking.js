import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./booking.scss";
import { DatePicker, ConfigProvider, Checkbox, } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import banner1 from '../../../../../image/banner1.jpg';
import Input from '../../../../base/Input/Input'

import 'antd/dist/antd.css';
import moment from "moment";
Booking.propTypes = {

};

Booking.defaultProps = {

};
//giới thiệu
function Booking(props) {
    let minDate =moment(new Date())

    //state
    const [time, setTime] = useState(moment(new Date()));
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerNamePhone, setCustomerPhone] = useState('');



    console.log(time)
    return (
        <div className="booking-container">
            <div className="booking-container__banner"
                style={{ backgroundImage: `url(${banner1})` }}
            >
            </div>
            <div className="booking-container__book">
                <div className="booking-container__book-left">
                    <div className="booking-container__book-left-label">
                        SET TABLE
                    </div>
                    <div className="booking-container__book-left-content">
                        Quý khách vui lòng đặt bàn trước để có trải nghiệm thưởng thức ẩm thực tốt nhất tại Sun Homes BBQ.
                    </div>
                    <div className="booking-container__book-left-person">
                        <Input defaultValue={adults} onChange={(val)=>{setAdults(val)}} type={"number"} label={"Số người lớn"} required/>
                    </div>
                     <div className="booking-container__book-left-person">
                        <Input defaultValue={children} onChange={(val)=>{setChildren(val)}} type={"number"} label={"Số trẻ em"} required/>
                    </div>
                </div>
                <div className="booking-container__book-right">
                    <Input defaultValue={customerName} onChange={(val)=>{setCustomerName(val)}}  label={"Họ và tên"} placeholder="Tên của bạn..." required/>
                    <Input defaultValue={customerNamePhone} onChange={(val)=>{setCustomerPhone(val)}}  label={"Số điện thoại"} required placeholder="Số điện thoại của bạn..."/>
                    
           

            <Checkbox />
                </div>
            </div>
           

        </div>
    )
}

export default Booking