import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./feedback.scss";
import Input from '../../../../base/Input/Input'
import home9 from '../../../../../image/home9.jpg';
import Button2 from "../../../../base/Button/Button";
import { PATTETN } from "../../../../base/common/commonConstant";
Feedback.propTypes = {

};

Feedback.defaultProps = {

};
//giới thiệu
function Feedback(props) {
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [customercontent, setCustomerContent] = useState('')
    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
      console.log(disabledButton)
    }, [disabledButton])
    
    return (
        <div className="feedback-container">
            <div className="feedback-container__banner"
                style={{ backgroundImage: `url(${home9})` }}
            >
            </div>
            <div className="feedback-container__book">
                <div className="feedback-container__book-left">
                    <div className="feedback-container__book-left-label">
                        Feedback
                    </div>
                    <div className="feedback-container__book-left-content">
                        Chúng tôi luôn trân trọng mọi ý kiến của quý khách, ý kiến từ quý khách sẽ giúp chúng tôi nâng cao về chất lượng phục vụ chính quý khách cũng góp phần vào sự thành công và phát triển thương hiệu House of Hongdae BBQ của chúng tôi:
                    </div>
                    <div className="feedback-container__book-left-content">
                        Webdesign rất hoan nghênh độc giả gửi thông tin và góp ý cho chúng tôi!
                    </div>
                    <div className="feedback-container__book-left-info">
                        <div className="feedback-container__book-left-info-address"> <span>Email:</span> webdesign@gmail.com</div>
                        <div className="feedback-container__book-left-info-address"><span>SĐT:</span> 0909.009.009</div>
                        <div className="feedback-container__book-left-info-address"><span>Website:</span> www.webdesign.com</div>
                    </div>
                </div>
                <div className="feedback-container__book-right">
                    <Input defaultValue={customerName} onChange={(val) => { setCustomerName(val) }} label={"Họ và tên"} placeholder="Tên của bạn..." autoFocus />
                    <Input
                        defaultValue={customerEmail}
                        onChange={(val) => { setCustomerEmail(val) }}
                        label={"Email"}
                        placeholder="Email của bạn..."
                        required
                        pattern={PATTETN.EMAIL}
                        messageNote={"Nhập đúng định dạng email!"} 
                        setDangerNote={val=>{setDisabledButton(val)}}
                    />
                    <Input defaultValue={customerPhone} onChange={(val) => { setCustomerPhone(val) }} label={"Số điện thoại"} required placeholder="Số điện thoại của bạn..." />
                    <Input isTextAria={true} defaultValue={customercontent} onChange={(val) => { setCustomerContent(val) }} label={"Nội dung"} placeholder="Lời nhắn..." />
                    <div className="feedback-container__book-right-button">
                        <Button2 name="Gửi góp ý" background="#F3E385" color="#000" disabled={disabledButton} onClick={()=>alert("khỏe")} />
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Feedback