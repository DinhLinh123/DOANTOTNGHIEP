import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./home.scss";
import banner from '../../../../../image/banner-home.jpg';
import banner1 from '../../../../../image/banner1.jpg';
import banner2 from '../../../../../image/banner2.jpg';
import banner3 from '../../../../../image/banner3.jpg';

import home1 from '../../../../../image/home1.png';
import home2 from '../../../../../image/home2.png';
import home3 from '../../../../../image/home3.jpg';
import home4 from '../../../../../image/home4.jpg';
import home5 from '../../../../../image/home5.jpg';
import home6 from '../../../../../image/home6.jpg';
import home7 from '../../../../../image/home7.jpg';
import home8 from '../../../../../image/home8.jpg';
import home9 from '../../../../../image/home9.jpg';
import Button from '../../../../base/Button/Button'
import { MENU_TAB_CLIENT } from "../../../../base/common/commonConstant";
import ImageGallery from 'react-image-gallery';
import { Carousel } from 'antd';

Home.propTypes = {
    setMenuTab: PropTypes.func
};

Home.defaultProps = {

};
//trang chủ
function Home(props) {
    const { setMenuTab } = props
    useEffect(() => {
    }, [])

    const imgData = [
        {
            original: banner
        },
        {
            original: banner1
        },
        {
            original: banner2
        }
        , {
            original: banner3
        }
    ]

    const images = [
        {
            original: banner,
            thumbnail: banner,
        },
        {
            original: banner1,
            thumbnail: banner1,
        },
        {
            original: banner2,
            thumbnail: banner2,
        },
    ];

    const [current, setCurrent] = useState(0)

    const length = imgData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const backSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    function renderImgSlide(img) {

        return (
            <section className="slide-img">
                <Button name="<" className={"back-slide"} onClick={() => { backSlide() }} />
                <Button name=">" className={"next-slide"} onClick={() => { nextSlide() }} />
                {img?.map((item, index) => {
                    return <div className={index === current ? 'slide active' : 'slide'} key={index}>
                        {index === current && (<img src={item?.img} className="image" />)}

                    </div>
                })}
            </section>

        )
    }

    return (
        <div className="home-container">
            <div className="home-container__banner">
                <Carousel autoplay>
                    {imgData?.map((item)=>{
                        return(
                            <div>
                                <img src={item?.original}/>
                            </div>
                        )
                    })}
                </Carousel>

            </div>

            <div className="home-container__cpn1">
                <div className="home-container__cpn1-left">
                    <div className="home-container__cpn1-left-title">
                        House of Hongdae BBQ
                    </div>
                    <div className="home-container__cpn1-left-content">
                        House of Hongdae BBQ (Quán thịt nướng Hàn Quốc) sẽ đưa bạn đến Seoul, nơi những con phố bình dị, những quán ăn dân dã đã trở nên quen thuộc và gắn bó với người dân xứ Hàn. Nếu đã một lần thưởng thức thịt nướng tại House of Hongdae BBQ, bạn sẽ không thể quên được hương vị “ngất ngây” của những món sườn non bò Mỹ, nạc vai bò Mỹ, dẻ sườn tươi…. khi hòa quyện vào với các loại gia vị đặc trưng của xứ sở Kimchi đã trở nên hấp dẫn đến thế nào.
                    </div>
                    <div className="home-container__cpn1-left-content">
                        House of Hongdae BBQ (Quán thịt nướng Hàn Quốc) sẽ đưa bạn đến Seoul, nơi những con phố bình dị, những quán ăn dân dã đã trở nên quen thuộc và gắn bó với người dân xứ Hàn. Nếu đã một lần thưởng thức thịt nướng tại House of Hongdae BBQ, bạn sẽ không thể quên được hương vị “ngất ngây” của những món sườn non bò Mỹ, nạc vai bò Mỹ, dẻ sườn tươi…. khi hòa quyện vào với các loại gia vị đặc trưng của xứ sở Kimchi đã trở nên hấp dẫn đến thế nào.
                    </div>
                </div>
                <div className="home-container__cpn1-right">
                    <div className="home-container__cpn1-right-img">
                        <img src={home1} />
                    </div>
                    <div className="home-container__cpn1-right-img">
                        <img src={home2} />
                    </div>
                </div>
            </div>

            <div className="home-container__cpn2">
                <div className="home-container__cpn2-left">
                    <div className="home-container__cpn2-left-img">
                        <img src={home3} />
                    </div>
                    <div className="home-container__cpn2-left-img">
                        <img src={home4} />
                    </div>
                    <div className="home-container__cpn2-left-img">
                        <img src={home5} />
                    </div>
                    <div className="home-container__cpn2-left-img">
                        <img src={home6} />
                    </div>

                </div>
                <div className="home-container__cpn2-right">
                    <div className="home-container__cpn2-right-title">
                        Menu
                    </div>
                    <div className="home-container__cpn2-right-content">
                        House of Hongdae BBQ (Quán thịt nướng Hàn Quốc) sẽ đưa bạn đến Seoul, nơi những con phố bình dị, những quán ăn dân dã đã trở nên quen thuộc và gắn bó với người dân xứ Hàn. Nếu đã một lần thưởng thức thịt nướng tại House of Hongdae BBQ, bạn sẽ không thể quên được hương vị “ngất ngây” của những món sườn non bò Mỹ, nạc vai bò Mỹ, dẻ sườn tươi…. khi hòa quyện vào với các loại gia vị đặc trưng của xứ sở Kimchi đã trở nên hấp dẫn đến thế nào.
                    </div>
                    <div className="home-container__cpn2-right-content">
                        House of Hongdae BBQ (Quán thịt nướng Hàn Quốc) sẽ đưa bạn đến Seoul, nơi những con phố bình dị, những quán ăn dân dã đã trở nên quen thuộc và gắn bó với người dân xứ Hàn. Nếu đã một lần thưởng thức thịt nướng tại House of Hongdae BBQ, bạn sẽ không thể quên được hương vị “ngất ngây” của những món sườn non bò Mỹ, nạc vai bò Mỹ, dẻ sườn tươi…. khi hòa quyện vào với các loại gia vị đặc trưng của xứ sở Kimchi đã trở nên hấp dẫn đến thế nào.
                    </div>
                </div>
            </div>

            <div className="home-container__cpn3">
                <div className="home-container__cpn3-left">
                    <div className="home-container__cpn3-left-title">
                        Restaurant
                    </div>
                    <div className="home-container__cpn3-left-content">
                        Khi nói đến Hàn Quốc, ẩm thực là nét văn hóa đặc trưng không thể bỏ qua và thịt nướng Hàn Quốc luôn được “truyền tai” về độ tươi ngon, đậm đà qua những trang cẩm nang du lịch hay những bộ phim Hàn gây bão.
                    </div>
                    <div className="home-container__cpn3-left-content">
                        Hệ thống House of Hongdae BBQ hiện có 17 nhà hàng trong đó 7 nhà hàng chuyên về Buffet tự chọn (Buffet) và 10 nhà hàng chuyên về gọi món (Alacarte).
                    </div>
                    <div className="home-container__cpn3-left-content">
                        Hãy lựa chọn địa điểm gần bạn nhất và liên hệ đặt bàn ngay nhé!
                    </div>
                </div>
                <div className="home-container__cpn3-right">
                    <div className="home-container__cpn3-right-img">
                        <img src={home7} />
                    </div>
                    <div className="home-container__cpn3-right-img">
                        <img src={home8} />
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Home