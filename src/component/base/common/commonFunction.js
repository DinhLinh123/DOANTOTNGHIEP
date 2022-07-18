import { Tooltip } from 'antd';
import React, { useEffect } from 'react';


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

export default { useOutsideAlerter, smartText, numberWithCommas }