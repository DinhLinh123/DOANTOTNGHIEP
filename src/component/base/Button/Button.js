import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./button.css";
Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object
};

Button.defaultProps = {
  className: "",
  name: "Button",
  background: "",
  onClick: () => {},
  color: "#fff",
  disabled: false,
};

function Button(props) {
  const { className, name, background, onClick, color, disabled, style } = props;
  return (
    <div className="button-common">
      <button
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
          padding:'0 10px',
            ...style

        }
        }
        onClick={onClick}
        disabled={disabled}
      >
        {name}
      </button>
    </div>
  );
}
export default Button;
