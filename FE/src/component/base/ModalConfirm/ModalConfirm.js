import React, { useEffect, useRef, useState } from "react";
import Button2 from "../Button/Button";
import Popup from "../Popup/Popup";
import PropTypes from 'prop-types';
import './modalConfirm.scss'

ModalConfirm.propTypes={
    title:PropTypes.string,
    contentName: PropTypes.string,
    show: PropTypes.bool,
    setShow: PropTypes.func,
    onClickSuccess: PropTypes.func,
}

ModalConfirm.defaultProps={
    
}

function ModalConfirm(props) {
    const {title, contentName, show, setShow, onClickSuccess} =props
    return(
        <>  
            <Popup
                title={`Xóa ${title}`}
                show={show}
                onClickClose={()=>setShow(false)}
                body={
                        <div style={{marginTop: '24px'}}>
                            Bạn có muốn xóa <strong>{title}</strong> có tên <strong>{contentName}</strong> không?
                        </div>
                }
                button={[
                    <Button2 name={"Hủy"} onClick={()=>setShow(false)}/>,
                    <Button2 className={"button-delete"} name={"Xóa"} onClick={onClickSuccess}/>
                ]}
            />
        </>
    )
}

export default ModalConfirm