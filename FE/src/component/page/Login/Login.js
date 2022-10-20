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
import axios from 'axios';
import { URL_API } from '../../../utils/urpapi';


Login.PropType = {}


function Login() {

  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [passWord, setPassWard] = useState('');
  const [passWordConFirm, setPassWardConFirm] = useState('');
  const [disabled, setDisabled] = useState(false);
  const roleType = useSelector(state => state.account.accountInfo)
  const [isDangerMoreInput, setIsDangerMoreInput] = useState(false);
  const [isDangerMoreInputPassConfirm, setIsDangerMoreInputPassConfirm] = useState(false);
  const [isCreateNewAccount, setIsCreateNewAccount] = useState(false);
  const [emailNewAccount, setEmailNewAccount] = useState('')
  const [mesInputPassConfirm, setMesInputPassConfirm] = useState('')
  const [error, setError] = useState("")



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
    localStorage.setItem('roleType', JSON.stringify(obj))

    let account = JSON.parse(localStorage.getItem('roleType'));
    dispatch(changeAccount({
      userName: account.userName,
      userAvatar: account.userAvatar,
      roleType: account.roleType
    }))



    window.open("/admin/report", '_self')
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

  async function onClickSubmit() {
    //  let obj = {
    //     userName: userName,
    //     userAvatar: passWord,
    //     roleType: 'admin'
    //   }
    //   localStorage.setItem( 'roleType', JSON.stringify(obj))

    // let account = JSON.parse(localStorage.getItem('roleType'));
    // dispatch(changeAccount({
    //   userName: account.userName,
    //   userAvatar: account.userAvatar,
    //   roleType: account.roleType
    // }))

    const body = {
      userName: userName,
      password: passWord
    }
    const res = await axios.post(`http://backend1002-001-site1.atempurl.com/Login`, body)
    // console.log(res.data.data);
    if (res.data.data) {
      let obj = {
            userName: res.data.data.fullName,
            userAvatar: '',
            roleType: res.data.data.chucVu
          }
      localStorage.setItem('roleType', JSON.stringify(obj ))
      localStorage.setItem('infoUser', res.data.data.id)
      localStorage.setItem('quyen', res.data.data.quyen)

      let account = JSON.parse(localStorage.getItem('roleType'));
      dispatch(changeAccount({
        userName: account.fullName,
        userAvatar: '',
        roleType: account.chucVu
      }))

      window.open("/admin/report", '_self')
    } else {
      setError("Sai tài khoản hoặc mật khẩu!")
    }

  }

  function onClickRigister() {
    if (passWord != passWordConFirm) {
      setIsDangerMoreInputPassConfirm(true)
      setMesInputPassConfirm("Mật khẩu không trùng khớp. Vui lòng nhập lại")
    }
    else {
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
                  <Input2 type={'text'} placeholder={"Tên đăng nhập"} required defaultValue={userName} onChange={(val) => { setUserName(val) }} />
                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input.Password
                    type={'password'}
                    placeholder={"Mật khẩu"}
                    required
                    efaultValue={passWord}
                    onChange={(val) => { setPassWard(val.target.value); setIsDangerMoreInput(false) }}
                    status={isDangerMoreInput && "error"}
                    onBlur={() => onBlurInputPass()}
                    onPressEnter={() => onClickSubmit()}

                  />
                  {isDangerMoreInput && <div className="data-login-system__container-right-login-input-mes">Trường này không được bỏ trống</div>}
                  {error}
                </div>
                <div className="data-login-system__container-right-login-submit">
                  <Button name={"Đăng nhập"} background={"#1cc0a9"} onClick={() => { onClickSubmit() }} style={{ width: '100%' }} disabled={disabled} />
                </div>

                {/* <div className="data-login-system__container-right-login-more">
                  <Button name={"Đăng ký mới"} onClick={() => { setIsCreateNewAccount(true) }} style={{ width: '150px' }} className={"button-login-more"} />
                </div> */}
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
                  <Input2 type={'text'} placeholder={"Tên đăng nhập"} required defaultValue={userName} onChange={(val) => { setUserName(val) }} />
                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input2
                    defaultValue={emailNewAccount}
                    onChange={(val) => { setEmailNewAccount(val) }}
                    placeholder="Email của bạn..."
                    required
                    pattern={PATTETN.EMAIL}
                    messageNote={"Nhập đúng định dạng email!"}
                  // setDangerNote={(val) => { setDisabledButton(val) }}
                  />
                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input.Password
                    type={'password'}
                    placeholder={"Mật khẩu"}
                    required
                    efaultValue={passWord}
                    onChange={(val) => { setPassWard(val.target.value); setIsDangerMoreInput(false) }}
                    status={isDangerMoreInput && "error"}
                    onBlur={() => onBlurInputPass()}
                  />
                  {isDangerMoreInput && <div className="data-login-system__container-right-login-input-mes">Trường này không được bỏ trống</div>}

                </div>
                <div className="data-login-system__container-right-login-input">
                  <div className="data-login-system__container-right-login-input-icon"><UnlockOutlined style={{ fontSize: '18px' }} /></div>
                  <Input.Password
                    type={'password'}
                    placeholder={"Nhập lại mật khẩu"}
                    required
                    efaultValue={passWordConFirm}
                    onChange={(val) => { setPassWardConFirm(val.target.value); setIsDangerMoreInputPassConfirm(false) }}
                    status={isDangerMoreInputPassConfirm && "error"}
                    onBlur={() => onBlurInputPassConfirm()}
                    onPressEnter={() => onClickRigister()}
                  />
                  {isDangerMoreInputPassConfirm && <div className="data-login-system__container-right-login-input-mes">{mesInputPassConfirm?.length == 0 ? 'Trường này không được bỏ trống' : mesInputPassConfirm}</div>}

                </div>

                <div className="data-login-system__container-right-login-submit">
                  <Button name={"Đăng ký"} background={"#1cc0a9"} onClick={() => { onClickRigister() }} style={{ width: '100%' }} disabled={disabled} />
                </div>

                <div className="data-login-system__container-right-login-more">
                  <Button name={"Đăng nhập"} onClick={() => { setIsCreateNewAccount(false) }} style={{ width: '150px' }} className={"button-login-more"} />
                </div>
              </div>
            </>}

        </div>

      </div>
    </div>
  );
}

export default Login;
