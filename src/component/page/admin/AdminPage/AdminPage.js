import React, { Component, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./adminPage.scss";
import {
  BACKGROUND_MENU_ADMIN,
  COLOR,
  COLOR_ADMIN,
  COLOR_MENU_ADMIN,
  MENU_TAB_ADMIN,
  TYPE_MENU,
} from "../../../base/common/commonConstant";
import logoRes from "../../../../image/banner1.jpg";
import {
  UnorderedListOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  UserOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import Menu from "./Menu/Menu";
import Area from "./Area/Area";
import Bar from "./Bar/Bar";
import Book from "./Book/Book";
import Kitchen from "./Kitchen/kitchen";
import Spending from "./Spending/Spending";
import Staff from "./Staff/Staff";
import Turnover from "./Turnover/Turnover";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuType } from "../../../../reudux/action/menuAction";
import commonFunction from "../../../base/common/commonFunction";
import { changeAccountType } from "../../../../reudux/action/accountTypeAction";

AdminPage.propTypes = {
  title: PropTypes.string,
  index: PropTypes.string,
};

AdminPage.defaultProps = {};

function AdminPage(props) {
  const { children, title, index } = props;
  const [displayLogout, setDisplayLogout] = useState(false);
  const roleType = useSelector((state) => state.account.accountType)
  const typeMenu = useSelector((state) => state?.menu?.menuType);

  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const onClickClose = () => {
    setDisplayLogout(false);
  };
  commonFunction.useOutsideAlerter(wrapperRef, onClickClose);


  // useEffect(() => {
  //   let role = localStorage.getItem('roleType')
  //   if(role != '')
  //   {
  //     let account = JSON.parse(role);
  //     dispatch(changeAccountType({
  //       userName: account.userName,
  //       userAvatar: account.userAvatar,
  //       roleType: account.roleType
  //     }))
  //   }else{
  //     window.open("/login", '_self')
  //   }
   
  // }, [])

  let listMenu = [
    {
      link: MENU_TAB_ADMIN.MENU,
      icon: <UnorderedListOutlined />,
      title: "Menu",
    },
    {
      link: MENU_TAB_ADMIN.SPENDING,
      icon: <ShoppingCartOutlined />,
      title: "Chi tiêu",
    },
    {
      link: MENU_TAB_ADMIN.TURNOVER,
      icon: <DollarCircleOutlined />,
      title: "Doanh thu",
    },
    {
      link: MENU_TAB_ADMIN.BAR,
      icon: <ShopOutlined />,
      title: "Bếp",
    },
    {
      link: MENU_TAB_ADMIN.STAFF,
      icon: <ShoppingOutlined />,
      title: "Nhân viên",
    },
    {
      link: MENU_TAB_ADMIN.BOOK,
      icon: <CalendarOutlined />,
      title: "Đặt bàn",
    },
    {
      link: MENU_TAB_ADMIN.AREA,
      icon: <AppstoreOutlined />,
      title: "Khu vực",
    },
  ];

  function renderMenuPage() {
    let list = listMenu?.map((item) => {
      return (
        <Link to={`/admin/${item?.link}`}>
          {typeMenu !== TYPE_MENU.SMALL ?  <div
              className={`admin-page-container__nav-list-item ${index == item?.link ? "selected-item" : ""
                }`}
            // style={{ color: menuTab == MENU_TAB_ADMIN.MENU ? COLOR_MENU_ADMIN: '#01a3a4',
            // background: menuTab == MENU_TAB_ADMIN.MENU ? BACKGROUND_MENU_ADMIN: '#fff' }}
            >
              <div className="admin-page-container__nav-list-item-icon">
                { item?.icon}
              </div>
              {typeMenu === TYPE_MENU.BIG && (
                <div className="admin-page-container__nav-list-item-text">
                  {item?.title}
                </div>
              )}
            </div>: <Tooltip title={item?.title} placement="right">
            <div
              className={`admin-page-container__nav-list-item ${index == item?.link ? "selected-item" : ""
                }`}
            // style={{ color: menuTab == MENU_TAB_ADMIN.MENU ? COLOR_MENU_ADMIN: '#01a3a4',
            // background: menuTab == MENU_TAB_ADMIN.MENU ? BACKGROUND_MENU_ADMIN: '#fff' }}
            >
              <div className="admin-page-container__nav-list-item-icon">
                { item?.icon}
              </div>
            </div>
          </Tooltip>}
          
        </Link>
      );
    });
    return list;
  }

  function onclickLogout() {
    localStorage.setItem('roleType', '')
  }

  
  useEffect(()=>{console.log(typeMenu)},[typeMenu])

  return (
    <div className="admin-page-container">
      <div
        className={`admin-page-container__nav ${typeMenu === TYPE_MENU.BIG
            ? "admin-page-container__big-nav"
            : "admin-page-container__small-nav"
          }`}
      // style={{
      //     width: typeMenu === TYPE_MENU.BIG ? '350px' : '80px'
      // }}
      >
        <div className="admin-page-container__nav-logo">
          {typeMenu === TYPE_MENU.BIG && (
            <div className="admin-page-container__nav-logo-text">
              House of Hongdae BBQ
            </div>
          )}
          <div
            className="admin-page-container__nav-logo-icon"
            onClick={() => {
              typeMenu === TYPE_MENU.BIG
                ? dispatch(changeMenuType(TYPE_MENU.SMALL))
                : dispatch(changeMenuType(TYPE_MENU.BIG));
            }}
          >
            {typeMenu === TYPE_MENU.BIG ? (
              <Tooltip title="Thu nhỏ" placement="bottom">
                <FullscreenExitOutlined />
              </Tooltip>
            ) : (
              <Tooltip title="Mở rộng" placement="bottom">
                <FullscreenOutlined />
              </Tooltip>
            )}
          </div>
        </div>
        <div className="admin-page-container__nav-list">{renderMenuPage()}</div>
      </div>
      <div
        className={`admin-page-container__page ${typeMenu === TYPE_MENU.BIG
            ? "admin-page-container__big-page"
            : "admin-page-container__small-page"
          }`}
      >
        <div className="admin-page-container__page-header">
          <div className="admin-page-container__page-header-title-page">
            {title}
          </div>
          <div className="admin-page-container__page-header-account">
            <div
              className="admin-page-container__page-header-account-button"
              onClick={() => {
                !displayLogout
                  ? setDisplayLogout(true)
                  : setDisplayLogout(false);
              }}
            >
              <img src={logoRes} onMouseLeave />
              <div className="admin-page-container__page-header-account-button-name">{roleType.userName}</div>
              {!displayLogout ? (
                <CaretDownOutlined style={{ transition: "2s" }} />
              ) : (
                <CaretUpOutlined style={{ transition: "2s" }} />
              )}
            </div>
            {displayLogout && (
              <div className="admin-page-container__page-header-account-logout" ref={wrapperRef}>
                <div className="admin-page-container__page-header-account-logout-item" onClick={() => { onclickLogout() }}>
                  <Link to={`/login`}>
                    <div className="admin-page-container__page-header-account-logout-item-text" >
                      Đăng xuất
                    </div>
                    <div className="admin-page-container__page-header-account-logout-item-icon">
                      <LogoutOutlined />
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="admin-page-container__page-content">{children}</div>
      </div>
    </div>
  );
}

export default AdminPage;
