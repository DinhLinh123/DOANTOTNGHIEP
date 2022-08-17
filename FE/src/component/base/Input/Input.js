import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./input.scss";
import { Input } from "antd";
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
  isTextAria: PropTypes.bool,
  pattern: PropTypes.any,
  messageNote: PropTypes.string,
  setDangerNote: PropTypes.func,
  onPressEnter: PropTypes.func,
  showCount: PropTypes.bool,
  width: PropTypes.number,
  key: PropTypes.string,
  onBlurInput: PropTypes.func
};

InputField.defaultValue = {
  required: true,
  autoFocus: false,
  isTextAria: true,
  messageNote: "email",
  showCount: false,
  width: 250,
  key: ''
};

function InputField(props) {
  const {
    placeholder,
    defaultValue,
    required,
    onChange,
    value,
    type,
    label,
    autoFocus,
    isTextAria,
    pattern,
    messageNote,
    setDangerNote,
    showCount,
    width,
    onPressEnter,
    key,
    onBlurInput
  } = props;
  let regex = new RegExp(pattern);
  const inputRef = useRef(null)
  const [isDanger, setIsDanger] = useState(false);
  const [message, setMessage] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus && inputRef.current.focus()
    }
  }, [isFocus])


  function onBlur(event) {
    let value = event.target.value;
    if (onBlurInput) { onBlurInput(value) }

    if (required && (value?.length == 0 || value == undefined)) {
      setIsDanger(true);
      setMessage("Trường này không được bỏ trống");
      if (setDangerNote) { setDangerNote(true) }
    } else {
      if (pattern && !regex.test(value)) {
        setIsDanger(true);
        setMessage(messageNote);
        if (setDangerNote) { setDangerNote(true) }
      } else {
        setIsDanger(false);
        if (setDangerNote) { setDangerNote(false) }
        setMessage("");
      }
    }
  }

  function onChangeInput(event) {
    onChange(event);
    setIsDanger(false);
    setMessage("");
    if (setDangerNote) { setDangerNote(false) }
  }

  return (
    <div className={`container-input`} style={width ? { width: width } : {}}>
      {label && (
        <div className="container-input__label">
          {label}
          {required && <span className="container-input__label-required"></span>}
        </div>
      )}
      {isTextAria ? (
        <TextArea
          style={{
            height: 120,
          }}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          required={required}
          onChange={(val) => {
            onChange(val?.target?.value);
          }}
          autoFocus={autoFocus}
          // status={"error"}
          showCount={showCount}
        />
      ) : (
        <Input
          key={key}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          required={required}
          onChange={(val) => {
            setIsFocus(true)
            onChangeInput(val?.target?.value);
          }}
          ref={inputRef}
          autoFocus={autoFocus}
          status={isDanger && "error"}
          showCount={showCount}
          pattern={regex}
          onBlur={(val) => {
            setIsFocus(false)
            onBlur(val)
          }}
          onPressEnter={onPressEnter}
        />
      )}

      <div className="container-input__mess">{message}</div>
    </div>
  );
}

export default InputField;
