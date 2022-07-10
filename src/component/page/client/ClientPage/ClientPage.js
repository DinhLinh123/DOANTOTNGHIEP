import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./clientPage.scss";
import logoRes from '../../../../image/logo1.png'
import bgOder from '../../../../image/bg-order.png'
import Home from "./Home/Home";
import Booking from "./Booking/Booking";
import Contact from "./Contact/Contact";
import Feedback from "./Feedback/Feedback";
import Offer from "./Offer/Offer";
import { COLOR, MENU_TAB_CLIENT } from "../../../base/common/commonConstant"
import {
    InstagramOutlined,
    FacebookFilled
} from '@ant-design/icons';
import Button2 from "../../../base/Button/Button";

ClientPage.propTypes = {

};

ClientPage.defaultProps = {

};

//trang người xem
function ClientPage(props) {



    const [menuTab, setMenuTab] = useState(MENU_TAB_CLIENT.HOME_PAGE)
    return (
        <div className="client-page-container">
            <div className="client-page-container__menu">
                <div className="client-page-container__menu-logo">
                    <img src={logoRes} onClick={() => { setMenuTab(MENU_TAB_CLIENT.HOME_PAGE) }} />
                </div>
                <div className="client-page-container__menu-nav">
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB_CLIENT.HOME_PAGE) }}
                        style={{ color: menuTab == MENU_TAB_CLIENT.HOME_PAGE ? COLOR : '#fff' }}
                    >
                        Trang chủ
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB_CLIENT.BOOKING) }}
                        style={{ color: menuTab == MENU_TAB_CLIENT.BOOKING ? COLOR : '#fff' }}
                    >
                        Đặt bàn
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB_CLIENT.OFFER) }}
                        style={{ color: menuTab == MENU_TAB_CLIENT.OFFER ? COLOR : '#fff' }}
                    >
                        Ưu đãi
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB_CLIENT.FEEDBACK) }}
                        style={{ color: menuTab == MENU_TAB_CLIENT.FEEDBACK ? COLOR : '#fff' }}
                    >
                        Góp ý
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB_CLIENT.CONTACT) }}
                        style={{ color: menuTab == MENU_TAB_CLIENT.CONTACT ? COLOR : '#fff' }}
                    >
                        Thông tin liên hệ
                    </div>
                </div>

            </div>
            <div className="client-page-container__content">
                {
                    menuTab == MENU_TAB_CLIENT.HOME_PAGE ?
                        <Home setMenuTab={(val) => setMenuTab(val)} /> :
                        menuTab == MENU_TAB_CLIENT.BOOKING ?
                            <Booking /> :
                            menuTab == MENU_TAB_CLIENT.OFFER ?
                                <Offer /> :
                                menuTab == MENU_TAB_CLIENT.FEEDBACK ?
                                    <Feedback /> :
                                    <Contact />
                }
            </div>

            <div className="client-page-container__footer"
                style={{ backgroundImage: `url(${bgOder})` }}>
                <div className="client-page-container__footer-info"
                    style={{ width: menuTab !== MENU_TAB_CLIENT.BOOKING ? '33.33%' : '50%' }}
                >
                    <div className="client-page-container__footer-info-company">
                        CÔNG TY CỔ PHẦN LINH TE
                    </div>
                    <div className="client-page-container__footer-info-content">
                        <span>Trụ sở:</span> Số 29 ngõ 18 Xuân Đỉnh, Bắc Từ Liêm, Hà Nội.
                    </div>
                    <div className="client-page-container__footer-info-content">
                        Mã số thuế: 02042512
                    </div>
                    <div className="client-page-container__footer-info-content">
                        Ngày hoạt động: 25/06/2019
                    </div>
                    <div className="client-page-container__footer-info-content">
                        Giấy phép kinh doanh: 02042512
                    </div>
                </div>
                <div className="client-page-container__footer-network"
                    style={{ width: menuTab !== MENU_TAB_CLIENT.BOOKING ? '33.33%' : '50%' }}>
                    <div className="client-page-container__footer-network-icon">
                        <FacebookFilled style={{ fontSize: '30px', color: '#fff', cursor: 'pointer' }} /></div>
                    <div className="client-page-container__footer-network-icon">
                        <InstagramOutlined style={{ fontSize: '30px', color: '#fff', cursor: 'pointer' }} /></div>
                </div>
                {menuTab !== MENU_TAB_CLIENT.BOOKING && <div className="client-page-container__footer-book">
                    <div className="client-page-container__footer-book-title">
                        Quý khách vui lòng đặt bàn trước để có trải nghiệm thưởng thức ẩm thực tốt nhất tại Sun Homes BBQ.
                    </div>
                    <div className="client-page-container__footer-book-button">
                        <Button2 name="ĐẶT BÀN NGAY" background="#F3E385" color="#000" onClick={() => setMenuTab(MENU_TAB_CLIENT.BOOKING)} />
                    </div>
                </div>}

            </div>
        </div>
    );
}
export default ClientPage;
