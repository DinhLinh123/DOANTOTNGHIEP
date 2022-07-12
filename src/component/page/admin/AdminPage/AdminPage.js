import React, { Component, useState } from 'react';
import PropTypes from 'prop-types'
import "./adminPage.scss"
import { BACKGROUND_MENU_ADMIN, COLOR, COLOR_ADMIN, COLOR_MENU_ADMIN, MENU_TAB_ADMIN } from '../../../base/common/commonConstant';
import logoRes from '../../../../image/banner1.jpg'
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
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import Menu from './Menu/Menu';
import Area from './Area/Area';
import Bar from './Bar/Bar';
import Book from './Book/Book';
import Kitchen from './Kitchen/kitchen';
import Spending from './Spending/Spending';
import Staff from './Staff/Staff';
import Turnover from './Turnover/Turnover';

AdminPage.propTypes = {

}

AdminPage.defaultProps = {

}

const TYPE_MENU = {
    BIG: 'big',
    SMALL: 'small'
}

function AdminPage(props) {

    const [menuTab, setMenuTab] = useState(MENU_TAB_ADMIN.HOME_PAGE)
    const [typeMenu, setTypeMenu] = useState(TYPE_MENU.BIG)
    const [displayLogout, setDisplayLogout] = useState(false)

    function renderMenuPage() {
        return (
            <>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.MENU) }} 
                    style={{ color: menuTab == MENU_TAB_ADMIN.MENU ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.MENU ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Menu" placement="right">
                            <UnorderedListOutlined />
                        </Tooltip>
                        :
                        <UnorderedListOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Menu</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.SPENDING) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.SPENDING ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.SPENDING ? BACKGROUND_MENU_ADMIN: '#fff' }}
                >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Chi tiêu" placement="right">
                            <ShoppingCartOutlined />
                        </Tooltip>
                        :
                        <ShoppingCartOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Chi tiêu</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.TURNOVER) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.TURNOVER ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.TURNOVER ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Doanh thu" placement="right">
                            <DollarCircleOutlined />
                        </Tooltip>
                        :
                        <DollarCircleOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Doanh thu</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.KITCHEN) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.KITCHEN ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.KITCHEN ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="bep" placement="right">
                            <ShopOutlined />
                        </Tooltip>
                        :
                        <ShopOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Bếp</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.BAR) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.BAR ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.BAR ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="bar" placement="right">
                            <ShoppingOutlined />
                        </Tooltip>
                        :
                        <ShoppingOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'> Quầy Bar</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.STAFF) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.STAFF ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.STAFF ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Nhân viên" placement="right">
                            <UserOutlined />
                        </Tooltip>
                        :
                        <UserOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Nhân viên</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.BOOK) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.BOOK ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.BOOK ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Đặt bàn" placement="right">
                            <CalendarOutlined />
                        </Tooltip>
                        :
                        <CalendarOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Đặt bàn</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item' onClick={() => { setMenuTab(MENU_TAB_ADMIN.AREA) }}
                    style={{ color: menuTab == MENU_TAB_ADMIN.AREA ? COLOR_MENU_ADMIN: '#01a3a4', 
                    background: menuTab == MENU_TAB_ADMIN.AREA ? BACKGROUND_MENU_ADMIN: '#fff' }}
                    >
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Khu vực" placement="right">
                            <AppstoreOutlined />
                        </Tooltip>
                        :
                        <AppstoreOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Khu vực</div>
                    }
                </div>

                
            </>
        )
    }



    return (
        <div className='admin-page-container'>
            <div className={`admin-page-container__nav ${typeMenu === TYPE_MENU.BIG ? 'admin-page-container__big-nav' : 'admin-page-container__small-nav'}`}
            // style={{
            //     width: typeMenu === TYPE_MENU.BIG ? '350px' : '80px'
            // }}
            >
                <div className='admin-page-container__nav-logo'>
                    {typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-logo-text'>
                            House of Hongdae BBQ
                        </div>}
                    <div className='admin-page-container__nav-logo-icon'
                        onClick={() => {
                            typeMenu === TYPE_MENU.BIG ? setTypeMenu(TYPE_MENU.SMALL) : setTypeMenu(TYPE_MENU.BIG)
                        }}
                    >
                        {typeMenu === TYPE_MENU.BIG ?
                            <Tooltip title="Thu nhỏ" placement="bottom">
                                <FullscreenExitOutlined />
                            </Tooltip>
                            :
                            <Tooltip title="Mở rộng" placement="bottom">
                                <FullscreenOutlined />
                            </Tooltip>}
                    </div>
                </div>
                <div className='admin-page-container__nav-list'>
                    {renderMenuPage()}
                </div>
            </div>
            <div className={`admin-page-container__page ${typeMenu === TYPE_MENU.BIG ? 'admin-page-container__big-page' : 'admin-page-container__small-page'}`}
            >
                <div className='admin-page-container__page-header'>
                    <div className='admin-page-container__page-header-title-page'>
                        Quản lý menu
                    </div>
                    <div className='admin-page-container__page-header-account'>
                        <div className='admin-page-container__page-header-account-button'
                            onClick={() => { !displayLogout ? setDisplayLogout(true) : setDisplayLogout(false) }}
                        >
                            <img src={logoRes} onMouseLeave />
                            {!displayLogout ? <CaretDownOutlined /> : <CaretUpOutlined />}
                        </div>
                        {
                            displayLogout && <div className='admin-page-container__page-header-account-logout'>
                                <div className='admin-page-container__page-header-account-logout-item'>
                                    <div className='admin-page-container__page-header-account-logout-item-text'>Đăng xuất</div>
                                    <div className='admin-page-container__page-header-account-logout-item-icon'><LogoutOutlined /></div>
                                    
                                </div>


                            </div>
                        }

                    </div>
                </div>
                <div className='admin-page-container__page-content'>
                {
                    menuTab == MENU_TAB_ADMIN.MENU ?
                        <Menu setMenuTab={(val) => setMenuTab(val)} />:
                        menuTab == MENU_TAB_ADMIN.AREA ?
                            <Area /> :
                            menuTab == MENU_TAB_ADMIN.BAR ?
                                <Bar /> :
                                menuTab == MENU_TAB_ADMIN.SPENDING ?
                                <Spending /> :
                                    menuTab == MENU_TAB_ADMIN.STAFF ?
                                    <Staff /> :
                                        menuTab == MENU_TAB_ADMIN.TURNOVER ?
                                        <Turnover /> :
                                            menuTab == MENU_TAB_ADMIN.BOOK ?
                                            <Book /> :
                                                <Kitchen />
                }
                </div>
            </div>
        </div>
    )
}

export default AdminPage