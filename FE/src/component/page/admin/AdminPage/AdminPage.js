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
  LikeOutlined,
  AppstoreOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  ReconciliationOutlined,
  CoffeeOutlined,
  GroupOutlined,
  TeamOutlined,
  BarChartOutlined,
  HddOutlined
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
import {
  changeMenuType,
  changeMenuTypeSubBar,
  changeMenuTypeSubCayegory,
  changeMenuTypeSubKitchen,
} from "../../../../reudux/action/menuAction";
import commonFunction from "../../../base/common/commonFunction";
import { changeAccount } from "../../../../reudux/action/accountAction";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { URL_API } from "../../../../utils/urpapi";

AdminPage.propTypes = {
  title: PropTypes.string,
  index: PropTypes.string,
};

AdminPage.defaultProps = {};

function AdminPage(props) {
  const { children, title, index } = props;
  const [displayLogout, setDisplayLogout] = useState(false);
  const [displayMoreKitchen, setDisplayMoreKitchen] = useState(false);
  const [displayMoreBar, setDisplayMoreBar] = useState(false);
  const roleType = useSelector((state) => state.account.accountInfo);
  const typeMenu = useSelector((state) => state?.menu?.menuType);
  const typeSubMenuKitchen = useSelector(
    (state) => state?.menu?.menuTypeSubKitchen
  );
  const typeSubMenuBar = useSelector((state) => state?.menu?.menuTypeSubBar);
  const typeSubMenuCategoty = useSelector(
    (state) => state?.menu?.menuTypeSubCategory
  );
  let location = useLocation();

  useEffect(() => {
    if (
      location?.pathname.includes(MENU_TAB_ADMIN.KITCHEN) ||
      location?.pathname.includes(MENU_TAB_ADMIN.KITCHEN_DAY)
    ) {
      dispatch(changeMenuTypeSubKitchen(true));
      dispatch(changeMenuTypeSubBar(false));
      dispatch(changeMenuTypeSubCayegory(false));
    } else {
      if (
        location?.pathname.includes(MENU_TAB_ADMIN.BAR) ||
        location?.pathname.includes(MENU_TAB_ADMIN.BAR_INSERT)
      ) {
        dispatch(changeMenuTypeSubBar(true));
        dispatch(changeMenuTypeSubKitchen(false));
        dispatch(changeMenuTypeSubCayegory(false));
      } else {
        if (
          location?.pathname.includes(MENU_TAB_ADMIN.CATEGOGY_MENU) ||
          location?.pathname.includes(MENU_TAB_ADMIN.CATEGOGY_DRINKS) ||
          location?.pathname.includes(MENU_TAB_ADMIN.CATEGOGY_POSITION)
        ) {
          dispatch(changeMenuTypeSubCayegory(true));
          dispatch(changeMenuTypeSubKitchen(false));
          dispatch(changeMenuTypeSubBar(false));
        } else {
          dispatch(changeMenuTypeSubKitchen(false));
          dispatch(changeMenuTypeSubBar(false));
          dispatch(changeMenuTypeSubCayegory(false));
        }
      }
    }
  }, [location]);

  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  const onClickClose = () => {
    setDisplayLogout(false);
  };
  commonFunction.useOutsideAlerter(wrapperRef, onClickClose);

  useEffect(() => {
    let role = localStorage.getItem("roleType");
    if (role != "" && role != null) {
      let account = JSON.parse(role);
      dispatch(
        changeAccount({
          userName: account.userName,
          userAvata: account.userAvatar,
          roleType: account.roleType,
        })
      );
    } else {
      window.open("/login", "_self");
    }
  }, []);

  useEffect(() => {
   async function getUser (){

    const res = await axios.get(`${URL_API}/User`)
    const infoUser = localStorage.getItem("infoUser")
    const findUser = res?.data?.data?.find(item => item.id === infoUser)
    localStorage.setItem("quyen", findUser?.quyen)
   }
   getUser()
  },[])

  let listMenu = [
    {
      link: MENU_TAB_ADMIN.REPORT,
      icon: <BarChartOutlined />,
      title: "Báo cáo",
    },
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
    // {
    //   link: MENU_TAB_ADMIN.TURNOVER,
    //   icon: <DollarCircleOutlined />,
    //   title: "Doanh thu",
    // },
    {
      link: MENU_TAB_ADMIN.KITCHEN,
      icon: <ShopOutlined />,
      title: "Bếp",
    },
    {
      link: MENU_TAB_ADMIN.BAR,
      icon: <CoffeeOutlined />,
      title: "Bar",
    },
    {
      link: MENU_TAB_ADMIN.STAFF,
      icon: <TeamOutlined />,
      title: "Nhân viên",
    },
    {
      link: MENU_TAB_ADMIN.BOOK,
      icon: <CalendarOutlined />,
      title: "Đặt bàn",
    },
    {
      link: MENU_TAB_ADMIN.FEEDBACK,
      icon: <LikeOutlined />,
      title: "Feedback"
      ,
    },
    {
      link: MENU_TAB_ADMIN.AREA,
      icon: <AppstoreOutlined />,
      title: "Khu vực",
    },
    {
      link: MENU_TAB_ADMIN.CATEGOGY_MENU,
      icon: <GroupOutlined />,
      title: "Danh mục",
    },
    {
      link: MENU_TAB_ADMIN.PAY,
      icon: <CheckCircleOutlined />,
      title: "Thanh toán",
    },
    {
      link: MENU_TAB_ADMIN.PROMOTION,
      icon: <ShoppingOutlined />,
      title: "Ưu đãi",
    },
    {
      link: MENU_TAB_ADMIN.ODER,
      icon: <HddOutlined />,
      title: "Oder",
    },
  ];

  function renderMenuPage() {
    let list = listMenu?.map((item) => {
      return (
        // <Link to={`/admin/${item?.link}`}>
        <>
          {typeMenu !== TYPE_MENU.SMALL ? (
            <>
              {item?.link === MENU_TAB_ADMIN.KITCHEN ||
              item?.link === MENU_TAB_ADMIN.BAR ||
              item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU ? (
                <div
                  className={`admin-page-container__nav-list-item ${
                    index == item?.link ||
                    (index == MENU_TAB_ADMIN.KITCHEN_DAY &&
                      item?.link === MENU_TAB_ADMIN.KITCHEN) ||
                    (index == MENU_TAB_ADMIN.CATEGOGY_DRINKS &&
                      item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU) ||
                    (index == MENU_TAB_ADMIN.CATEGOGY_MENU &&
                      item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU) ||
                    (index == MENU_TAB_ADMIN.CATEGOGY_POSITION &&
                      item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU)
                      ? "selected-item"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      item?.link != MENU_TAB_ADMIN.KITCHEN &&
                      item?.link != MENU_TAB_ADMIN.BAR &&
                      item?.link != MENU_TAB_ADMIN.CATEGOGY_MENU
                    ) {
                      window.open(`/admin/${item?.link}`, "_self");
                    } else {
                      if (item?.link === MENU_TAB_ADMIN.KITCHEN) {
                        dispatch(changeMenuTypeSubKitchen(true));
                      }
                      if (item?.link === MENU_TAB_ADMIN.BAR) {
                        dispatch(changeMenuTypeSubBar(true));
                      }
                      if (item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU) {
                        dispatch(changeMenuTypeSubCayegory(true));
                      }
                    }
                  }}
                >
                  <div className="admin-page-container__nav-list-item-icon">
                    {item?.icon}
                  </div>
                  {typeMenu === TYPE_MENU.BIG && (
                    <div className="admin-page-container__nav-list-item-text">
                      {item?.title}
                    </div>
                  )}
                </div>
              ) : (
                <Link to={`/admin/${item?.link}`}>
                  <div
                    className={`admin-page-container__nav-list-item ${
                      index == item?.link ||
                      (index == MENU_TAB_ADMIN.KITCHEN_DAY &&
                        item?.link === MENU_TAB_ADMIN.KITCHEN) ||
                      (index == MENU_TAB_ADMIN.BAR_INSERT &&
                        item?.link === MENU_TAB_ADMIN.BAR) ||
                      (index === MENU_TAB_ADMIN.CATEGOGY_DRINKS &&
                        item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU)
                        ? "selected-item"
                        : ""
                    }`}
                  >
                    <div className="admin-page-container__nav-list-item-icon">
                      {item?.icon}
                    </div>
                    {typeMenu === TYPE_MENU.BIG && (
                      <div className="admin-page-container__nav-list-item-text">
                        {item?.title}
                      </div>
                    )}
                  </div>
                </Link>
              )}

              {typeSubMenuKitchen && item?.link === MENU_TAB_ADMIN.KITCHEN && (
                <>
                  <Link to={`/admin/kitchens`}>
                    <div
                      className={`admin-page-container__nav-list-sub-kitchen ${
                        index == MENU_TAB_ADMIN.KITCHEN
                          ? "selected-list-sub-kitchen"
                          : ""
                      }`}

                      // onClick={() => { window.open(`/admin/kitchens`, "_self") }}
                    >
                      <div className="admin-page-container__nav-list-sub-kitchen-icon">
                        <ReconciliationOutlined />
                      </div>
                      {typeMenu === TYPE_MENU.BIG && (
                        <div className="admin-page-container__nav-list-sub-kitchen-text">
                          Quản lý hóa đơn bếp
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link to={`/admin/kitchens-days`}>
                    <div
                      className={`admin-page-container__nav-list-sub-kitchen ${
                        index == MENU_TAB_ADMIN.KITCHEN_DAY
                          ? "selected-list-sub-kitchen"
                          : ""
                      }`}

                      // onClick={() => { window.open(`/admin/kitchensDays`, "_self") }}
                    >
                      <div className="admin-page-container__nav-list-sub-kitchen-icon">
                        <PlusOutlined />
                      </div>
                      {typeMenu === TYPE_MENU.BIG && (
                        <div className="admin-page-container__nav-list-sub-kitchen-text">
                          Yêu cầu nguyên liệu
                        </div>
                      )}
                    </div>
                  </Link>
                </>
              )}
              {typeSubMenuBar && item?.link === MENU_TAB_ADMIN.BAR && (
                <>
                  <Link to={`/admin/bars`}>
                    <div
                      className={`admin-page-container__nav-list-sub-bar ${
                        index == MENU_TAB_ADMIN.BAR
                          ? "selected-list-sub-bar"
                          : ""
                      }`}

                      // onClick={() => { window.open(`/admin/bars`, "_self") }}
                    >
                      <div className="admin-page-container__nav-list-sub-bar-icon">
                        <ReconciliationOutlined />
                      </div>
                      {typeMenu === TYPE_MENU.BIG && (
                        <div className="admin-page-container__nav-list-sub-bar-text">
                          Quản lý mặt hàng
                        </div>
                      )}
                    </div>
                  </Link>
                  <Link to={`/admin/bar-insert`}>
                    <div
                      className={`admin-page-container__nav-list-sub-bar ${
                        index == MENU_TAB_ADMIN.BAR_INSERT
                          ? "selected-list-sub-bar"
                          : ""
                      }`}

                      // onClick={() => { window.open(`/admin/barsDays`, "_self") }}
                    >
                      <div className="admin-page-container__nav-list-sub-bar-icon">
                        <PlusOutlined />
                      </div>
                      {typeMenu === TYPE_MENU.BIG && (
                        <div className="admin-page-container__nav-list-sub-bar-text">
                          Quản lý nhập liệu
                        </div>
                      )}
                    </div>
                  </Link>
                </>
              )}

              {typeSubMenuCategoty &&
                item?.link === MENU_TAB_ADMIN.CATEGOGY_MENU && (
                  <>
                    <Link to={`/admin/category_menu`}>
                      <div
                        className={`admin-page-container__nav-list-sub-category ${
                          index == MENU_TAB_ADMIN.CATEGOGY_MENU
                            ? "selected-list-sub-category"
                            : ""
                        }`}

                        // onClick={() => { window.open(`/admin/categorys`, "_self") }}
                      >
                        <div className="admin-page-container__nav-list-sub-category-icon">
                          <ReconciliationOutlined />
                        </div>
                        {typeMenu === TYPE_MENU.BIG && (
                          <div className="admin-page-container__nav-list-sub-category-text">
                            Danh mục menu
                          </div>
                        )}
                      </div>
                    </Link>
                    <Link to={`/admin/category_drink`}>
                      <div
                        className={`admin-page-container__nav-list-sub-category ${
                          index == MENU_TAB_ADMIN.CATEGOGY_DRINKS
                            ? "selected-list-sub-category"
                            : ""
                        }`}

                        // onClick={() => { window.open(`/admin/categorysDays`, "_self") }}
                      >
                        <div className="admin-page-container__nav-list-sub-category-icon">
                          <PlusOutlined />
                        </div>
                        {typeMenu === TYPE_MENU.BIG && (
                          <div className="admin-page-container__nav-list-sub-category-text">
                            Danh mục quầy bar
                          </div>
                        )}
                      </div>
                    </Link>
                    <Link to={`/admin/category_position`}>
                      <div
                        className={`admin-page-container__nav-list-sub-category ${
                          index == MENU_TAB_ADMIN.CATEGOGY_POSITION
                            ? "selected-list-sub-category"
                            : ""
                        }`}

                        // onClick={() => { window.open(`/admin/categorysDays`, "_self") }}
                      >
                        <div className="admin-page-container__nav-list-sub-category-icon">
                          <PlusOutlined />
                        </div>
                        {typeMenu === TYPE_MENU.BIG && (
                          <div className="admin-page-container__nav-list-sub-category-text">
                            Danh mục chức vụ
                          </div>
                        )}
                      </div>
                    </Link>
                  </>
                )}
            </>
          ) : (
            <Link to={`/admin/${item?.link}`}>
              <Tooltip title={item?.title} placement="right">
                <div
                  className={`admin-page-container__nav-list-item ${
                    index == item?.link ? "selected-item" : ""
                  }`}
                >
                  <div className="admin-page-container__nav-list-item-icon">
                    {item?.icon}
                  </div>
                </div>
              </Tooltip>
            </Link>
          )}
        </>
        // </Link>
      );
    });
    return list;
  }

  function onclickLogout() {
    localStorage.setItem("roleType", "");
  }

  return (
    <div className="admin-page-container">
      <div
        className={`admin-page-container__nav ${
          typeMenu === TYPE_MENU.BIG
            ? "admin-page-container__big-nav"
            : "admin-page-container__small-nav"
        }`}
        // style={{
        //     width: typeMenu === TYPE_MENU.BIG ? '350px' : '80px'
        // }}
      >
        <div className="admin-page-container__nav-logo">
          {typeMenu === TYPE_MENU.BIG && (
            <div className="admin-page-container__nav-logo-text">HoH BBQ</div>
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
        className={`admin-page-container__page ${
          typeMenu === TYPE_MENU.BIG
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
              <div className="admin-page-container__page-header-account-button-name">
                {roleType.userName}
              </div>
              {!displayLogout ? (
                <CaretDownOutlined style={{ transition: "2s" }} />
              ) : (
                <CaretUpOutlined style={{ transition: "2s" }} />
              )}
            </div>
            {displayLogout && (
              <div
                className="admin-page-container__page-header-account-logout"
                ref={wrapperRef}
              >
                <div
                  className="admin-page-container__page-header-account-logout-item"
                  onClick={() => {
                    onclickLogout();
                  }}
                >
                  <Link to={`/login`}>
                    <div className="admin-page-container__page-header-account-logout-item-text">
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
