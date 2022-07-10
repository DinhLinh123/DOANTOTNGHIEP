import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from 'prop-types'
import './popup.scss'
import Button2 from "../Button/Button";

Popup.propTypes = {
    show: PropTypes.bool,
    button: PropTypes.array,
    body: PropTypes.array,
    onClickClose: PropTypes.func,
    mess: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    title: PropTypes.string
}

Popup.defaultProps = {
    show: false,
    button: [],
    body: [],
    onClickClose: () => { },
    mess: '',
    width: '500px',
    height: '',
    title: 'Thông báo'
}

function Popup(props) {
    const { show, button, onClickClose, mess, width, height, body ,title} = props;
    const [showPopupMess, setShowPopupMess] = useState(false);

    let list = button ? button?.map((item, index) => {
        return (
            <div key={index} className="item-button">
                {item}
            </div>
        )
    }) : '';

    let listBody = body ? body?.map((item, index) => {
        return (
            <div key={index} className="item-body">
                {item}
            </div>
        )
    }) : '';

    return (
        show ? <div className="full-screen-popup">
            <div className="full-screen-popup-opacity"></div>
            <div className="popup-mess" style={{ width: width}}>
                <div className="popup-mess-header">
                    <span className="label-mess-header">{title}</span>
                    <Button2 className="close-mess-popup" onClick={onClickClose} name={'x'}/>
                </div>
                {mess != '' ? <div className="popup-content-mess">
                    {mess}
                </div> : ''}
                {body != '' ? <div className="popup-content-body" style={{height: height }}>
                    {listBody}
                </div> : ''}
                <div className="popup-button">
                    {list}
                    {/* <button className="close-popup" onClick={() => setShowPopupMess(false)}>Hủy</button>
                    <button className="close-popup" onClick={() => Delete()}>Xóa</button> */}
                </div>
            </div>
        </div> : ''
    )
}
export default Popup


