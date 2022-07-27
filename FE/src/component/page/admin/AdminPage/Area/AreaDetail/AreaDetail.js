import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
import { MENU_TAB_ADMIN } from "../../../../../base/common/commonConstant";
import AdminPage from "../../AdminPage";
import { Draggable } from "drag-react";
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

    function updatePosition(item, value) {
        // debugger
        let height = $(window).height();
        let width = $(window).width();
        let abc = list
        let objIndex = abc.findIndex((obj => obj.title == item.title));

        abc[objIndex].top = parseFloat(((value?.top/height)*100).toFixed(2))
        abc[objIndex].left = parseFloat(((value?.left/width)*100).toFixed(2)) 

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
            title={"Quản lý khu vực"}
            index={MENU_TAB_ADMIN.AREA}
        >
            <div className="area-detail">
                {list.map((item) => {
                    return (
                        <Draggable onDragEnd={(val, val2) => { updatePosition(item, val) }} key={1} style={{ top: `${item.top}%`, left: `${item.left}%` }} className={item?.title}>
                            <div style={{ border: '1px solid #000', borderRadius: '8px', width: '100px' }} className="table-item" onClick={()=> alert(item?.title)}>{item?.title}</div>
                        </Draggable>
                    )
                })}



                <Button2 name={"lưu"} onClick={() => { lur() }} />
            </div>

        </AdminPage>

    )

}
export default AreaDetail;
