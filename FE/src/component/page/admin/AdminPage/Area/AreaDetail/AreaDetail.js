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
import Popup from "../../../../../base/Popup/Popup";
import InputField from "../../../../../base/Input/Input";
import RadioCheck from "../../../../../base/Radio/Radio";
import { API_TABLE } from "../../../../../base/common/endpoint";

function AreaDetail(props) {

    let dispatch = useDispatch();
    const [showPopupAddNew, setShowPopupAddNew] = useState(false)
    const [tableType, setTableType] = useState(1)
    const [tableName, setTableName] = useState("")
    const [adults, setAdults] = useState(1)
    const [list, setList] = useState([
        {
            name: "Bàn 1",
            soNguoiToiDa: 0,
            loaiBan: "string",
            kieuDang: 0,
            top: 222,
            left: 222,
        },
        {
            name: "Bàn 2",
            soNguoiToiDa: 0,
            loaiBan: "string",
            kieuDang: 1,
            top: 44,
            left: 55,
        },
    ])


    useEffect(() => {
        baseApi.get(
            (res)=>{
                // setList(res)
            },
            (err)=>{debugger},
            null,
            API_TABLE.GET_ALL,
            {},
            {}
        )
    }, [])

    function updatePosition(item, value, value2) {
        let height = $(window).height();
        let width = $(window).width();
        let abc = list
        let objIndex = abc.findIndex((obj => obj.name == item.name));

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

    function addNewTable() {
        
    }

    useEffect(() => { console.log(tableType) }, [tableType])

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
                    <div className="area-detail__header-button">
                        <div className="area-detail__header-button-save">
                            <Button2 name={"Lưu"} />
                        </div>
                        <div className="area-detail__header-button-add">
                            <Button2 name={"Thêm mới bàn ăn"} onClick={() => { setShowPopupAddNew(true) }} />
                        </div>
                    </div>
                </div>
                <div className="area-detail__content" style={{ height: '600px', width: '1000px', position: 'relative' }}>
                    <div className="area-detail__content-drag" style={{ height: '600px', width: '1000px', position: 'absolute', top: '0' }}>
                        {list.map((item) => {
                            return (
                                <Draggable defaultPosition={{ x: item?.left, y: item?.top }} bounds="parent" onStop={(val, val2) => { updatePosition(item, val, val2) }} key={1} className={item?.title}>
                                    <div
                                        className="area-detail__content-drag-item"
                                        style={{ borderRadius: item?.kieuDang == 0 ? '50%' : '8px' }}
                                    // onClick={() => alert(item?.title)}
                                    >
                                        {item?.name}
                                    </div>
                                </Draggable>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Popup
                title={"Thêm mới bàn ăn"}
                button={[
                    <Button2 name={"Hủy"} onClick={() => { setShowPopupAddNew(false) }} />,
                    <Button2 name={"Thêm mới"} onClick={() => {addNewTable() }} />
                ]}
                className="add-table"
                show={showPopupAddNew}
                onClickClose={() => { setShowPopupAddNew(false) }}
                body={
                    <>
                        <div className="add-table__item">
                            <InputField
                                label={"Tên bàn"}
                                defaultValue={tableName}
                                onChange={(val) => {
                                    setTableName(val);
                                }}
                                required
                            />
                        </div>
                        <div className="add-table__item">
                            <InputField
                                defaultValue={adults}
                                onChange={(val) => {
                                    setAdults(val);
                                }}
                                type={"number"}
                                label={"Số người"}
                                required
                            // setDangerNote={(val) => {
                            //     setDisabledButton(val);
                            // }}
                            />
                        </div>
                        <div className="add-table__item">
                            <RadioCheck
                                listOption={[{ label: "Hình tròn", value: 0 }, { label: "Hình Vuông", value: 1 }]}
                                title={"Kiểu dáng"}
                                valueDefault={tableType}
                                onChange={(val) => { setTableType(val) }}
                            />
                        </div>
                    </>
                }
            />
        </AdminPage>

    )

}
export default AreaDetail;
