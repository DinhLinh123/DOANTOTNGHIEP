import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './input.scss'
import { Input } from 'antd';
const { TextArea } = Input;

InputField.propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
    label: PropTypes.string,
    autoFocus: PropTypes.bool,
    isTextAria: PropTypes.bool
}

InputField.defaultValue = {
    required: true,
    autoFocus: false,
    isTextAria: true
}

function InputField(props) {
    const { placeholder, defaultValue, required, onChange, value, type, label, autoFocus, isTextAria } = props;


    return (
        <div className={`container-input`}>
            <div className='container-input__label'>
                {label}
            </div>
            {
                isTextAria ?
                    <TextArea
                        style={{
                            height: 120,
                        }}
                        type={type}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        value={value}
                        required={required}
                        onChange={(val) => { onChange(val?.target?.value) }}
                        autoFocus={autoFocus}
                        // status={"error"}
                        showCount
                    />
                    :
                    <Input
                        type={type}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        value={value}
                        required={required}
                        onChange={(val) => { onChange(val?.target?.value) }}
                        autoFocus={autoFocus}
                        // status={"error"}
                        showCount
                    />
            }

            <div className='container-input__mess'>
            </div>
        </div>
    );
}

export default InputField;