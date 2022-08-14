import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./dropdown.scss";
import { Select } from "antd";
const { Option } = Select;


Dropdown.propTypes = {
    listOption: PropTypes.array,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    setStaffPosition: PropTypes.string
}

Dropdown.defaultProps = {
    listOption: [{
        label: "Option",
        value: 0
    }],
    title: "",
    placeholder: '',
    setStaffPosition: "Nhân viên"
}

function Dropdown(props) {

    const {listOption, title, placeholder, setStaffPosition}= props

    return (
        <div className="dropdown-manager">
            {title?.length >0 && <div className="dropdown-manager__title">{title}</div>}
            <Select
                className="dropdown-manager__select"
                showSearch
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onChange = {e => setStaffPosition(e)}
            >
                {listOption?.map((item)=>{
                    return(<Option value={item.value}>{item.label}</Option>)
                })}
            </Select>
        </div>
    )

}

export default Dropdown