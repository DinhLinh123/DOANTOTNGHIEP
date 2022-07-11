import React, { Component, useState } from 'react';
import PropTypes from 'prop-types'
import "./adminPage.scss"
import { MENU_TAB_ADMIN } from '../../../base/common/commonConstant';
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
    LogoutOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';

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
                <div className='admin-page-container__nav-list-item'>
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
                <div className='admin-page-container__nav-list-item'>
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
                <div className='admin-page-container__nav-list-item'>
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
                <div className='admin-page-container__nav-list-item'>
                    <div className='admin-page-container__nav-list-item-icon'> {typeMenu === TYPE_MENU.SMALL ?
                        <Tooltip title="Kho" placement="right">
                            <ShopOutlined />
                        </Tooltip>
                        :
                        <ShopOutlined />}
                    </div>
                    {
                        typeMenu === TYPE_MENU.BIG &&
                        <div className='admin-page-container__nav-list-item-text'>Kho</div>
                    }
                </div>
                <div className='admin-page-container__nav-list-item'>
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
                <div className='admin-page-container__nav-list-item'>
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
                <div className='admin-page-container__nav-list-item'>
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

                </div>
            </div>
        </div>
    )
}

export default AdminPage