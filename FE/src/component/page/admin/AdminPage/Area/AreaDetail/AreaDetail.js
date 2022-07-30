import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
import { MENU_TAB_ADMIN } from "../../../../../base/common/commonConstant";
import AdminPage from "../../AdminPage";
import Draggable from "react-draggable";
import Button2 from "../../../../../base/Button/Button";
import baseApi from "../../../../../../api/baseApi";
import $ from "jquery";
import "./areaDetail.scss";
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../../reudux/action/loadingAction";

function AreaDetail(props) {

    let dispatch = useDispatch();


    const [list, setList] = useState([
        {
            title: "hahaaa",
            top: 68.72,
            left: 87.5,
        },
        { title: "hihiiii", top: 49.57, left: 41.15 },
        { title: "hohoooo", top: 38.12, left: 41.67 },
    ])

    function updatePosition(item, value, value2) {
        debugger
        let height = $(window).height();
        let width = $(window).width();
        let abc = list
        let objIndex = abc.findIndex((obj => obj.title == item.title));

        abc[objIndex].top = parseFloat(((value?.top / height) * 100).toFixed(2))
        abc[objIndex].left = parseFloat(((value?.left / width) * 100).toFixed(2))

        setList(abc)
    }

    function lur() {
        dispatch(changeLoadingApp(true))
        setTimeout(() => {
            dispatch(changeLoadingApp(false))
        }, 500);
    }


    return (
        <AdminPage
            title={"Chi tiết khu vực"}
            index={MENU_TAB_ADMIN.AREA}
        >
            <div className="area-detail">
                <div className="area-detail__header">
                    <div className="area-detail__header-name">
                        <div className="area-detail__header-name-label">
                            Tên khu vực:
                        </div>
                        <div className="area-detail__header-name-value">
                            Tên khu vực:
                        </div>
                    </div>
                    <div className="area-detail__header-add">
                        <Button2 name={"Thêm mới bàn ăn"}/>
                    </div>
                </div>
                <div className="area-detail__content" style={{ height: '600px', width: '1000px', position: 'relative' }}>
                <div className="area-detail__content-drag" style={{ height: '600px', width: '1000px', position: 'absolute', top: '0' }}>
                    {list.map((item) => {
                        return (
                            <Draggable  bounds="parent" onStop={(val, val2) => { updatePosition(item, val, val2) }} key={1} className={item?.title}>
                                <div
                                    style={{ border: '1px solid #000', borderRadius: '8px', width: '100px' }}
                                    className="area-detail__content-drag-item"
                                // onClick={() => alert(item?.title)}
                                >
                                    {item?.title}
                                </div>
                            </Draggable>
                        )
                    })}
                </div>
                </div>
            </div>


        </AdminPage>

    )

}
export default AreaDetail;
