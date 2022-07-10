import React, { Component, useState } from 'react';
import PropTypes from 'prop-types'
import "./adminPage.scss"
import { MENU_TAB_ADMIN } from '../../../base/common/commonConstant';
import logoRes from '../../../../image/logo1.png'

AdminPage.propTypes = {

}

AdminPage.defaultProps = {

}

function AdminPage(props) {

    const [menuTab, setMenuTab] = useState(MENU_TAB_ADMIN.HOME_PAGE)

    function renderMenuPage() {
        return (
            <>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
                <div className='admin-page-container__page-nav-item'>
                    hahhaha
                </div>
            </>
        )
    }

    return (
        <div className='admin-page-container'>

            <div className='admin-page-container__nav'>
                <div className='admin-page-container__nav-logo'>
                    House of Hongdae BBQ
                </div>
                <div className='admin-page-container__nav-list'>
                    {renderMenuPage()}
                </div>
            </div>
            <div className='admin-page-container__page'>
                <div className='admin-page-container__page-header'>

                </div>
                <div className='admin-page-container__page-content'>

                </div>
            </div>
        </div>
    )
}

export default AdminPage