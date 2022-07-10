import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./contact.scss";
import Input from '../../../../base/Input/Input'
import home9 from '../../../../../image/home9.jpg';
Contact.propTypes = {

};

Contact.defaultProps = {

};
//giới thiệu
function Contact(props) {
    return (
        <div className="contact-container">
            <div className="contact-container__banner"
                style={{ backgroundImage: `url(${home9})` }}
            >
            </div>
            <div className="contact-container__book">
                <div className="contact-container__book-left">
                    <div className="contact-container__book-left-label">
                        Information
                    </div>
                    <div className="contact-container__book-left-content">
                        <div className="contact-container__book-left-content-time">
                            <div className="contact-container__book-left-content-time-lable">
                                Thời gian mở cửa
                            </div>
                            <div className="contact-container__book-left-content-time-content">
                                <span>Sáng:</span> 9h đến 14h.
                            </div>
                            <div className="contact-container__book-left-content-time-content">
                                <span>Chiều:</span> 16h đến 23h.
                            </div>
                        </div>
                        <div className="feedback-container__book-left-content-address">
                            <span>Địa chỉ:</span> Số 29 ngõ 18 Lương Ngọc Quyến, Hà Đông, Hà Nội.
                        </div>
                    </div>
                </div>
                <div className="contact-container__book-right">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.156923697446!2d105.79129451531415!3d21.06639379186748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aad09ffe4cdf%3A0xf2b1da5663c3657e!2zMjMgUC4gTmd1eeG7hW4gWHXDom4gS2hvw6F0LCBYdcOibiDEkOG7iW5oLCBUw6J5IEjhu5MsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1657360359802!5m2!1svi!2s" width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>


        </div>
    )
}

export default Contact