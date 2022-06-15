import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './input.scss'
import { DatePicker, ConfigProvider, Checkbox, } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

Input.propTypes={
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    label: PropTypes.string,
}

Input.defaultValue={
    required: true
}

function Input(props) {
    const {placeholder, defaultValue, required, onChange, value, type, label} = props;

    return (
        <div className={`container-input`}>
            <div className='container-input__label'>
                {label}
            </div>
            <ConfigProvider locale={viVN} >
                        <DatePicker placeholder='' onChange={(val) => { onChange(val) }} defaultValue={defaultValue} format={"DD-MM-yyyy"} />
                    </ConfigProvider>
            <input type={type} placeholder={placeholder} defaultValue={defaultValue} value={value} required={required} onChange={(val)=>{onChange(val?.target?.value)}}/>
            <div className='container-input__mess'>

            </div>
        </div>
    );
}

export default Input;