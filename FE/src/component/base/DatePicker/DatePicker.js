import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './datePicker.scss'
import { DatePicker, ConfigProvider, TimePicker, } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import moment from "moment";

DatePic.propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    max: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date)
}

DatePic.defaultValue = {
    required: true
}

function DatePic(props) {
    const { placeholder, defaultValue, min, max, onChange, value, type, label, className } = props;


    return (
        <div className={`container-date-picker ${className}`}>
            <div className='container-date-picker__label'>
                {label}
            </div>
            <ConfigProvider locale={viVN} >
                <DatePicker placeholder={placeholder} disabledDate={(date) => {
                    date = new Date(new Date(date.toISOString()).setHours(0, 0, 0, 0));
                    if (min && max) return date < min || date > max
                    if (min) return date < min
                    if (max) return date > max
                    return false
                }} value={value} dropdownAlign onChange={(val) => { onChange(new Date(new Date(val.toISOString()).setHours(0, 0, 0, 0))) }} defaultValue={defaultValue ? moment(new Date(defaultValue)) : undefined} format={"DD-MM-yyyy"} />
            </ConfigProvider>
            <div className='container-date-picker__mess'>

            </div>
        </div>
    );
}

export default DatePic;