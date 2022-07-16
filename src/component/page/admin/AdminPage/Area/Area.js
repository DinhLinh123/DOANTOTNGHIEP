import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";
import { Draggable } from 'drag-react';
import Button2 from "../../../../base/Button/Button";
import baseApi from "../../../../../api/baseApi"
import $ from 'jquery';
import "./area.scss"

function Area(props) {




    const [list, setList] = useState([
        {
            title: "hahaaa",
            top: 0,
            left: 0
        },

        {
            title: "hihiiii",
            top: 0,
            left: 0
        },

        {
            title: "hohoooo",
            top: 0,
            left: 0
        },
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
        console.log(list)
    }


    return (
        <AdminPage
            title={"Quản lý khu vực"}
            index={MENU_TAB_ADMIN.AREA}
        >
            <div className="area-manager">
                {list.map((item) => {
                    return (
                        <Draggable onDragEnd={(val, val2) => { updatePosition(item, val) }} key={1} style={{ top: `${item.top}%`, left: `${item.left}%` }} className={item?.title}>
                            <div style={{ border: '1px solid #000', borderRadius: '8px', width: '100px' }} className="table-item">{item?.title}</div>
                        </Draggable>
                    )
                })}



                <Button2 name={"lưu"} onClick={() => { lur() }} />
            </div>

        </AdminPage>

    )

}
export default Area