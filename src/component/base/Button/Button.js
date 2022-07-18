import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./button.scss";
import { Button } from "antd";

Button2.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  isLoading: PropTypes.bool,
  leftIcon: PropTypes.any,
};

Button2.defaultProps = {
  className: "",
  name: "Button",
  background: "",
  onClick: () => {},
  color: "#fff",
  disabled: false,
  isLoading: false,
};

function Button2(props) {
  const {
    className,
    name,
    background,
    onClick,
    color,
    disabled,
    style,
    isLoading,
    leftIcon,
  } = props;
  return (
    <div className="button-common">
      <Button
        className={
          !className ? "button-common-item" : `${className} button-common-item`
        }
        style={{
          backgroundColor: disabled ? "#ecf0f1" : background,
          color: disabled
            ? "#95a5a6"
            : background === "" ||
              background === "#efefef" ||
              background === "#95a5a6"
            ? "#000000"
            : color,
          padding: "0 10px",
          ...style,
        }}
        onClick={onClick}
        disabled={disabled}
        loading={isLoading}
      >
        <div className="button-common-item__content">
          {leftIcon && (
            <div className="button-common-item__content-icon">{leftIcon}</div>
          )}
          {name}
        </div>
      </Button>
    </div>
  );
}
export default Button2;
