import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './input.css'

Input.propTypes={
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string
}

Input.defaultValue={
    required: true
}

function Input(props) {
    const {placeholder, defaultValue, required, onChange, value, type} = props;

    return (
        <div className={`container-input`}>
            <input type={type} placeholder={placeholder} defaultValue={defaultValue} value={value} required={required} onChange={(val)=>{onChange(val?.target?.value)}}/>
            <div className='container-inpu__mess'>

            </div>
        </div>
    );
}

export default Input;