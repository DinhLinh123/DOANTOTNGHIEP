import React, { useState, useEffect } from 'react';

import PropType from 'prop-types'
import './login.scss'
import Input2 from '../../base/Input/Input';
import Button from '../../base/Button/Button';
import { useDispatch, useSelector } from "react-redux";
import { changeAccount } from '../../../reudux/action/accountAction';
import {
  UserOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import posterLogin1 from "../../../image/posterLogin1.png";
import { Input, message } from 'antd';
import { PATTETN } from '../../base/common/commonConstant';


Login.PropType = {}


function Login() {

  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWard] = useState('');
  const [passWordConFirm, setPassWardConFirm] = useState('');
  const [disabled, setDisabled] = useState(false);
  const roleType = useSelector(state=>state.account.accountInfo)
  const [isDangerMoreInput, setIsDangerMoreInput] = useState(false);
  const [isDangerMoreInputPassConfirm, setIsDangerMoreInputPassConfirm] = useState(false);
  const [isCreateNewAccount, setIsCreateNewAccount] = useState(false);
  const [emailNewAccount, setEmailNewAccount] = useState('')
  const [mesInputPassConfirm, setMesInputPassConfirm] = useState('')



  useEffect(() => {
    if (passWord?.length == 0 || userName?.length == 0) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }

  },
    [passWord, userName])

    function onsubmit() {
      let obj = {
        userName: userName,
        userAvatar: passWord,
        roleType: 'admin'
      }
      localStorage.setItem( 'roleType', JSON.stringify(obj))

      let account = JSON.parse(localStorage.getItem('roleType'));
      dispatch(changeAccount({
        userName: account.userName,
        userAvatar: account.userAvatar,
        roleType: account.roleType
      }))

      window.open("/admin/menus", '_self')
    }

  function onBlurInputPass() {
    if (passWord?.length == 0) {
      setIsDangerMoreInput(true)
    } else {
      setIsDangerMoreInput(false)
    }

  }

  function onBlurInputPassConfirm() {
    if (passWordConFirm?.length == 0) {
      setIsDangerMoreInputPassConfirm(true)
      setMesInputPassConfirm('')
    } else {
      setIsDangerMoreInputPassConfirm(false)
      setMesInputPassConfirm('')
    }

  }

  function onClickSubmit() {
     let obj = {
        userName: userName,
        userAvatar: passWord,
        roleType: 'admin'
      }
      localStorage.setItem( 'roleType', JSON.stringify(obj))

      let account = JSON.parse(localStorage.getItem('roleType'));
      dispatch(changeAccount({
        userName: account.userName,
        userAvatar: account.userAvatar,
        roleType: account.roleType
      }))

      window.open("/admin/menu", '_self')

  }

  function onClickRigister() {
    if(passWord != passWordConFirm)
    {
      setIsDangerMoreInputPassConfirm(true)
      setMesInputPassConfirm("M???t kh???u kh??ng tr??ng kh???p. Vui l??ng nh???p l???i")
    }
    else{
      setMesInputPassConfirm('')
    }

  }

  return (
    <div className="data-login-system">
      <div className="data-login-system__container">
        <div className="data-login-system__container-left">
          <img src={posterLogin1} />
        </div>
        <div className="data-login-system__container-right">
          {!isCreateNewAccount ?
            <>
              <div className="data-login-system__container-right-header">
                <span>Welcome!</span>
              </div>
              <div className="data-login-system__container-right-login">
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UserOutlined style={{ fontSize: '18px' }} /></div>
                  <Input2 type={'text'} placeholder={"T??n ????ng nh???p"} required defaultValue={userName} onChange={(val) => { setUserName(val) }} />
                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input.Password
                    type={'password'}
                    placeholder={"M???t kh???u"}
                    required
                    efaultValue={passWord}
                    onChange={(val) => { setPassWard(val.target.value); setIsDangerMoreInput(false) }}
                    status={isDangerMoreInput && "error"}
                    onBlur={() => onBlurInputPass()}
                    onPressEnter={() => onClickSubmit()}
                  />
                  {isDangerMoreInput && <div className="data-login-system__container-right-login-input-mes">Tr?????ng n??y kh??ng ???????c b??? tr???ng</div>}

                </div>
                <div className="data-login-system__container-right-login-submit">
                  <Button name={"????ng nh???p"} background={"#1cc0a9"} onClick={() => { onClickSubmit() }} style={{ width: '100%' }} disabled={disabled} />
                </div>

                <div className="data-login-system__container-right-login-more">
                  <Button name={"????ng k?? m???i"} onClick={() => { setIsCreateNewAccount(true) }} style={{ width: '150px' }} className={"button-login-more"} />
                </div>
              </div>
            </>
            :
            <>
              <div className="data-login-system__container-right-header">
                <span>Create New Account!</span>
              </div>
              <div className="data-login-system__container-right-login">
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UserOutlined style={{ fontSize: '18px' }} /></div>
                  <Input2 type={'text'} placeholder={"T??n ????ng nh???p"} required defaultValue={userName} onChange={(val) => { setUserName(val) }} />
                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input2
                    defaultValue={emailNewAccount}
                    onChange={(val) => { setEmailNewAccount(val) }}
                    placeholder="Email c???a b???n..."
                    required
                    pattern={PATTETN.EMAIL}
                    messageNote={"Nh???p ????ng ?????nh d???ng email!"}
                  // setDangerNote={(val) => { setDisabledButton(val) }}
                  />
                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input.Password
                    type={'password'}
                    placeholder={"M???t kh???u"}
                    required
                    efaultValue={passWord}
                    onChange={(val) => { setPassWard(val.target.value); setIsDangerMoreInput(false) }}
                    status={isDangerMoreInput && "error"}
                    onBlur={() => onBlurInputPass()}
                  />
                  {isDangerMoreInput && <div className="data-login-system__container-right-login-input-mes">Tr?????ng n??y kh??ng ???????c b??? tr???ng</div>}

                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input.Password
                    type={'password'}
                    placeholder={"Nh???p l???i m???t kh???u"}
                    required
                    efaultValue={passWordConFirm}
                    onChange={(val) => { setPassWardConFirm(val.target.value); setIsDangerMoreInputPassConfirm(false) }}
                    status={isDangerMoreInputPassConfirm && "error"}
                    onBlur={() => onBlurInputPassConfirm()}
                    onPressEnter={() => onClickRigister()}
                  />
                  {isDangerMoreInputPassConfirm && <div className="data-login-system__container-right-login-input-mes">{mesInputPassConfirm?.length == 0 ? 'Tr?????ng n??y kh??ng ???????c b??? tr???ng':mesInputPassConfirm}</div>}

                </div>
                
                <div className="data-login-system__container-right-login-submit">
                  <Button name={"????ng k??"} background={"#1cc0a9"} onClick={() => { onClickRigister() }} style={{ width: '100%' }} disabled={disabled} />
                </div>

                <div className="data-login-system__container-right-login-more">
                  <Button name={"????ng nh???p"} onClick={() => { setIsCreateNewAccount(false) }} style={{ width: '150px' }} className={"button-login-more"} />
                </div>
              </div>
            </>}

        </div>

      </div>
    </div>
  );
}

export default Login;
