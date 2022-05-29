import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./clientPage.scss";
import logoRes from '../../../../image/logo.png'
import Home from "./Home/Home";
import Booking from "./Booking/Booking";
import Contact from "./Contact/Contact";
import Feedback from "./Feedback/Feedback";
import Offer from "./Offer/Offer";
import {COLOR} from "../../../base/common/commonConstant"

ClientPage.propTypes = {

};

ClientPage.defaultProps = {

};

//trang người xem
function ClientPage(props) {

    const MENU_TAB = {
        HOME_PAGE: "HOME_PAGE",
        INTRODUCE: "INTRODUCE",
        BOOKING: "BOOKING",
        OFFER: "OFFER",
        FEEDBACK: "FEEDBACK",
        CONTACT: "CONTACT"
    }

    const [menuTab, setMenuTab] = useState(MENU_TAB.HOME_PAGE)
    return (
        <div className="client-page-container">
            <div className="client-page-container__menu">
                <div className="client-page-container__menu-logo">
                    <img src={logoRes} onClick={() => { setMenuTab(MENU_TAB.HOME_PAGE) }}/>
                </div>
                <div className="client-page-container__menu-nav">
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB.HOME_PAGE) }}
                        style={{ color: menuTab == MENU_TAB.HOME_PAGE ? COLOR : '#fff' }}
                        >
                        Trang chủ
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB.BOOKING) }}
                        style={{ color: menuTab == MENU_TAB.BOOKING ? COLOR : '#fff' }}
                        >
                        Đặt bàn
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB.OFFER) }}
                        style={{ color: menuTab == MENU_TAB.OFFER ? COLOR : '#fff' }}
                        >
                        Ưu đãi
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB.FEEDBACK) }}
                        style={{ color: menuTab == MENU_TAB.FEEDBACK ? COLOR : '#fff' }}
                        >
                        Góp ý
                    </div>
                    <div className="client-page-container__menu-nav-item"
                        onClick={() => { setMenuTab(MENU_TAB.CONTACT) }}
                        style={{ color: menuTab == MENU_TAB.CONTACT ? COLOR : '#fff' }}
                        >
                        Thông tin liên hệ
                    </div>
                </div>

            </div>
            <div className="client-page-container__menu-content">
                {
                    menuTab == MENU_TAB.HOME_PAGE ?
                        <Home /> :
                            menuTab == MENU_TAB.BOOKING ? 
                                <Booking /> :
                                menuTab == MENU_TAB.OFFER ?
                                    <Offer /> :
                                    menuTab == MENU_TAB.FEEDBACK ?
                                        <Feedback /> :
                                            <Contact />
                }
            </div>
        </div>
    );
}
export default ClientPage;
