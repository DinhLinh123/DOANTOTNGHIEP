import React, { useState, useEffect } from 'react';

import PropType from 'prop-types'
import Input from '../../base/Input/Input';
import Popup from '../../base/Popup/Popup';
import Button from '../../base/Button/Button';

Login.PropType = {}


function Login() {

  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    console.log(input)
  }, [input])

  return (<>
    <Popup show={showPopup} title={'hahahah'} body={[<><Button /></>]} button={[
      <Button
        name={"Hủy"}
        className={"button-input-point"}
        // onClick={() => setShowPopupSaveFile(false)}
      />,
      <Button
        name={"OK"}
        background={'#3498db'}
        color
        // onClick={() => CallApiSaveFilePoint()}
      />
    ]} onClickClose={() => setShowPopup(false)} />
    <Input placeholder={'sdjfhasjd'} required={true} defaultValue={''} value={input} onChange={(val) => { debugger; setInput(val) }} />
  </>);
}

export default Login;
