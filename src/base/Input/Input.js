import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './input.css'

Input.propTypes={
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func
}

Input.defaultValue={
    required: true
}

function Input(props) {
    const {placeholder, defaultValue, required, onChange, value} = props;

    // useEffect(() => {
    //     console.log(value)
    // }, [value]);

    return (
        <div className={`container-input`}>
            <input placeholder={placeholder} defaultValue={defaultValue} value={value} required={required} onChange={onChange}/>
            <div className='container-inpu__mess'>

            </div>
        </div>
    );
}

export default Input;