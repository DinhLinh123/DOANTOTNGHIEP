import { message, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TYPE_MESSAGE } from './commonConstant';


function useOutsideAlerter(ref, onclickClose) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onclickClose()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


function smartText(numberCharacters, string, width) {
  let _string = string;
  let count = string?.length;

  if (numberCharacters <= count) {
    let setString = _string.slice(0, numberCharacters);
    _string = setString + '...'
    let html = <Tooltip title={string} placement="bottom">{_string}</Tooltip>

    return html
  }
  else {

    return _string
  }
}


function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
  return x;
}

const messages = (type, title) => {
  if(type == TYPE_MESSAGE.SUCCESS)
  {
    message.success({
      content: title,
      className: 'message-success',
    })
  }
  if(type == TYPE_MESSAGE.ERROR)
  {
    message.error({
      content: title,
      className: 'message-error',
    })
  }
};

export default { useOutsideAlerter, smartText, numberWithCommas, messages }