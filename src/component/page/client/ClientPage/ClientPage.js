import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./clientPage.scss";
import logoRes from '../../../../image/logo.png'
import Home from "./Home/Home";
import Booking from "./Booking/Booking";
import Contact from "./Contact/Contact";
import Feedback from "./Feedback/Feedback";
import Offer from "./Offer/Offer";
import {COLOR, MENU_TAB_CLIENT} from "../../../base/common/commonConstant"

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
                    <img src={logoRes} onClick={() => { setMenuTab(MENU_TAB_CLIENT.HOME_PAGE) }}/>
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
            <div className="client-page-container__menu-content">
                {
                    menuTab == MENU_TAB_CLIENT.HOME_PAGE ?
                        <Home  setMenuTab={(val)=>setMenuTab(val)}/> :
                            menuTab == MENU_TAB_CLIENT.BOOKING ? 
                                <Booking /> :
                                menuTab == MENU_TAB_CLIENT.OFFER ?
                                    <Offer /> :
                                    menuTab == MENU_TAB_CLIENT.FEEDBACK ?
                                        <Feedback /> :
                                            <Contact />
                }
            </div>
        </div>
    );
}
export default ClientPage;
