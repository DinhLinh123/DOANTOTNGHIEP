import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './checkBox.scss'
import { Checkbox } from 'antd';

CheckBox.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    checked: PropTypes.bool
}

CheckBox.defaultValue = {
    required: true,
    checked: false
}

function CheckBox(props) {
    const { defaultValue,onChange, value, type, label, checked } = props;

    return (
        <div className={`container-check-box`}>
            
          <Checkbox checked={checked} onChange={(val)=>{ onChange(val.target.checked)}}/>
          <div className='container-check-box__label'>
                {label}
            </div>
        </div>
    );
}

export default CheckBox;