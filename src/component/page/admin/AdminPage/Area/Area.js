import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";
import { Draggable } from 'drag-react';
import Button2 from "../../../../base/Button/Button";
import baseApi from "../../../../../api/baseApi"

function Area(props) {


    

    const [list, setList] = useState([
        {
            title: "hahaaa", 
            top: 500,
            left: 600
        },

        {
            title: "hihiiii",
            top: 400,
            left: 300
        },

        {
            title: "hohoooo",
            top: 100,
            left: 800
        },
    ])

    function updatePosition(item, value) {
        let abc = list
        let objIndex = abc.findIndex((obj => obj.title == item.title));

        abc[objIndex].top = value?.top
        abc[objIndex].left = value?.left

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
            <div style={{ backgroundColor: 'red' }}>dsdfsdfsadfasd</div>
            {/* <Draggable
                // axis="x"
                // handle=".handle"
                // defaultPosition={{ x: 0, y: 0 }}
                // position={null}
                // grid={[25, 25]}
                // scale={1}
            >
                <div>
                    <div className="handle">Khỏe</div>
                </div>
                
            </Draggable> */}

            {list.map((item) => {
                return (
                    <Draggable onDragEnd={(val, val2)=>{updatePosition(item, val)}} key={1} style={{top: item.top, left: item.left}} className={item?.title}>
                        <div style={{border: '1px solid #000', borderRadius: '8px', width: '100px'}} className="table-item">{item?.title}</div>
                    </Draggable>
                )
            })}
<Button2 name={"lưu"} onClick={()=>{lur()}}/>

        </AdminPage>

    )

}
export default Area