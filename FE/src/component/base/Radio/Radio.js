import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './radio.scss'
import { Radio, Space } from 'antd';

RadioCheck.propTypes = {
    onChange: PropTypes.func,
    listOption: PropTypes.array,
    title: PropTypes.string,
    valueDefault: PropTypes.number,
    isVertical: PropTypes.bool
}

RadioCheck.defaultValue = {
    listOption: [{
        label: '',
        Value: 0
    }],
    isVertical: false
}

function RadioCheck(props) {
    const { onChange, valueDefault, listOption, title, isVertical } = props;

    return (
        <div className={`container-radio`}>
            {title?.length > 0 &&
                <div className="container-radio__title">{title}</div>}
            <Radio.Group onChange={(val) => { onChange(val.target.value) }} value={valueDefault}>
                <Space direction={isVertical ? "vertical" : "horizontal"}>
                    {
                        listOption?.map((item) => {
                            return (
                                <Radio value={item?.value}>{item?.label}</Radio>
                            )
                        })
                    }
                </Space>
            </Radio.Group>
        </div>
    );
}

export default RadioCheck;
