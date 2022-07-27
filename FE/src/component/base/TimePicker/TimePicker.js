import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './timePicker.scss'
import { DatePicker, ConfigProvider, TimePicker, } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from "moment";

Time.propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    label: PropTypes.string,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date)
}

Time.defaultValue = {
    required: true
}

function Time(props) {
    const { placeholder, defaultValue, min, max, onChange, value, type, label } = props;
    let format = 'HH:mm'
    let time = new Date().getHours() + ':' + new Date().getMinutes();
    return (
        <div className={`container-time-picker`}>
            <div className='container-time-picker__label'>
                {label}
            </div>
            <TimePicker onChange={onChange} defaultOpenValue={moment(time.toString(), format)} defaultValue={moment(time.toString(), format)} format={format} />
            <div className='container-time-picker__mess'>

            </div>
        </div>
    );
}

export default Time;