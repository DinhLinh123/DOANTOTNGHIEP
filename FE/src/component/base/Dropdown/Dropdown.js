import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./dropdown.scss";
import { Select } from "antd";
const { Option } = Select;

Dropdown.propTypes = {
  listOption: PropTypes.array,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  required: PropTypes.bool,
  defaultValue: PropTypes.object,
};

Dropdown.defaultProps = {
  listOption: [
    {
      label: "Option",
      value: 0,
    },
  ],
  title: "",
  placeholder: "",
  style: {},
  required: false,
};

function Dropdown(props) {
  const { listOption, title, placeholder, onChange, style, defaultValue } =
    props;

  return (
    <div className="dropdown-manager">
      {title?.length > 0 && (
        <div className={`dropdown-manager__title drop-required`}>{title}</div>
      )}
      <Select
        className="dropdown-manager__select"
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onChange={(e) => onChange(e)}
        style={{ ...style }}
        defaultValue={defaultValue}
      >
        {listOption?.map((item) => {
          return <Option value={item.value}>{item.label}</Option>;
        })}
      </Select>
    </div>
  );
}

export default Dropdown;
