import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./tableOrder.scss";
import { Link } from "react-router-dom";
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

import banner1 from "../../../../../image/banner1.jpg"

TableOrder.propTypes = {};

TableOrder.defaultProps = {};

function TableOrder(props) {
  let listMenu = [
    {
      id: "1",
      areaName: "Tầng 1",
      title: "Menu",
    },
    {
        id: "2",
        areaName: "Tầng 2",
        title: "Menu",
      },
      {
        id: "3",
        areaName: "Tầng 3",
        title: "Menu",
      },
      {
        id: "4",
        areaName: "Tầng 4",
        title: "Menu",
      },
      {
        id: "5",
        areaName: "Tầng 5",
        title: "Menu",
      },
      {
        id: "6",
        areaName: "Tầng 6",
        title: "Menu",
      },
      {
        id: "7",
        areaName: "Tầng 7",
        title: "Menu",
      },
    
  ];

  function renderMenuPage() {
    let list = listMenu?.map((item) => {
      return <Link to={`/admin/${item?.link}`}></Link>;
    });
    return list;
  }

  function onclickLogout() {
    localStorage.setItem("roleType", "");
  }

  return (
    <div className="admin-page-container">
      <div
        className={`admin-page-container__nav`}
        // style={{
        //     width: typeMenu === TYPE_MENU.BIG ? '350px' : '80px'
        // }}
      >
        <div className="admin-page-container__nav-logo">
          <div className="admin-page-container__nav-logo-text">
            House of Hongdae BBQ
          </div>
          <div className="admin-page-container__nav-logo-icon">
            <FullscreenExitOutlined />
            <FullscreenOutlined />
          </div>
        </div>
        <div className="admin-page-container__nav-list">{renderMenuPage()}</div>
      </div>
      <div className={`admin-page-container__page`}>
        <div className="admin-page-container__page-header">
          <div className="admin-page-container__page-header-title-page">
            dsfdfs
          </div>
          <div className="admin-page-container__page-header-account">
            <div className="admin-page-container__page-header-account-button">
              <img src={banner1} onMouseLeave />
            </div>
          </div>
        </div>
        <div className="admin-page-container__page-content">fsfsdfsd</div>
      </div>
    </div>
  );
}

export default TableOrder;
