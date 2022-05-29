import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./home.scss";
import banner from '../../../../../image/banner-home.jpg'

Home.propTypes = {

};

Home.defaultProps = {

};
//trang chủ
function Home(props) {
    return (
        <div className="home-container">
            <div className="home-container__banner">
                <img src={banner}/>
            </div>
        </div>
    )
}

export default Home