import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./booking.scss";
import { DatePicker, ConfigProvider, Checkbox, } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import banner1 from '../../../../../image/banner1.jpg';


import 'antd/dist/antd.css';
import moment from "moment";
Booking.propTypes = {

};

Booking.defaultProps = {

};
//giới thiệu
function Booking(props) {

    const [time, setTime] = useState(moment(new Date()))
    let minDate = new Date()

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
                        SET TABLE
                    </div>
                </div>
                <div className="booking-container__book-right">

                </div>
            </div>
            <ConfigProvider locale={viVN} >
                <DatePicker onChange={(val) => { setTime(val) }} defaultValue={time} format={"DD-MM-yyyy"} />
            </ConfigProvider>
            {/* 
            <DateTimePicker disableClock={true} onChange={setTime} value={time} format={"dd-MM-yyyy"} minDate={minDate}/> */}

            <Checkbox />

        </div>
    )
}

export default Booking