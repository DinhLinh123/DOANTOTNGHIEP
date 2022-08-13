import React, { useState, useEffect } from "react";
// import Draggable from "react-draggable";
import { MENU_TAB_ADMIN, TYPE_MESSAGE } from "../../../../../base/common/commonConstant";
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
import { API_AREA, API_TABLE } from "../../../../../base/common/endpoint";
import { useParams } from "react-router-dom";
import commonFunction from "../../../../../base/common/commonFunction";

function AreaDetail(props) {

    let dispatch = useDispatch();
    const [showPopupAddNew, setShowPopupAddNew] = useState(false)
    const [tableType, setTableType] = useState(1)
    const [tableName, setTableName] = useState("")
    const [areaName, setAreaName] = useState("");
    const [adults, setAdults] = useState(1)
    const [list, setList] = useState([])
    const [areaDetail, setAreaDetail] = useState()

    let { areaID } = useParams();

    useEffect(() => {
        baseApi.get(
            (res) => {
                setAreaDetail(res)
                setList(res?.bans || [])
                setAreaName(res?.name)
            },
            () => { },
            null,
            API_AREA.GET_BY_ID + areaID
        )
    }, [areaID])


    useEffect(() => {
        baseApi.get(
            (res) => {
                setList(res)
            },
            (err) => { },
            null,
            API_TABLE.GET_ALL,
            {},
            {}
        )
    }, [])

    function updatePosition(item, value, value2) {
        let abc = list
        let objIndex = abc.findIndex((obj => obj.name == item.name));
        abc[objIndex].top = parseFloat(value2?.x)
        abc[objIndex].left = parseFloat(value2?.y)
        callSaveTable(item.id ,item, abc[objIndex].left, abc[objIndex].top)
        setList(abc)
    }

    function addNewTable() {
        dispatch(changeLoadingApp(true))
        let body =
        {
            "name": tableName,
            "soNguoiToiDa": adults,
            "loaiBan": "string",
            "top": "0",
            "left": "0",
            "kieuDang": tableType.toString(),
            "idKhuVuc": areaID,
            "tenKhuVuc": areaName,
            "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "createdByUserName": "string",
            "createdOnDate": "2022-08-11T14:08:44.118Z"
        }

        baseApi.post(
            (res) => {
                dispatch(changeLoadingApp(false))
                setShowPopupAddNew(false)
                let _listTable = [...list]
                _listTable.push(res.data)
                setList(_listTable)
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm bàn thành công")
            },
            () => {
                dispatch(changeLoadingApp(false))
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm bàn thất bại")
            },
            null,
            API_TABLE.ALL_NEW,
            {},
            body
        )
    }

    function callSaveTable(id, item, top, left) {
        let body = item;
        body.top = top.toString()
        body.left = left.toString()


        baseApi.put(
            (res) => {
            },
            () => {
            },
            null,
            API_TABLE.UPDATE_BY_ID + id,
            {},
            body
        )
    }
    console.log("list", list);
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
                            {areaName}
                        </div>
                    </div>
                    <div className="area-detail__header-button">
                        <div className="area-detail__header-button-save">
                            <Button2
                                name={"Lưu"}
                            // onClick={() => callSaveArea()} 
                            />
                        </div>
                        <div className="area-detail__header-button-add">
                            <Button2 name={"Thêm mới bàn ăn"} onClick={() => { setShowPopupAddNew(true) }} />
                        </div>
                    </div>
                </div>
                <div className="area-detail__content" style={{ height: '600px', width: '1000px', position: 'relative' }}>
                    <div className="area-detail__content-drag" style={{ height: '600px', width: '1000px', position: 'absolute', top: '0' }}>
                        {list && list.length > 0 ? list?.map((item) => {
                            return (
                                <Draggable defaultPosition={{ x: parseInt(item?.left), y: parseInt(item?.top) }} bounds="parent" onStop={(val, val2) => { updatePosition(item, val, val2) }} key={1} className={item?.title}>
                                    <div
                                        className="area-detail__content-drag-item"
                                        style={{ borderRadius: item?.kieuDang == 0 ? '50%' : '8px' }}
                                    // onClick={() => alert(item?.title)}
                                    >
                                        {item?.name}
                                    </div>
                                </Draggable>
                            )
                        }) : null}
                        
                    </div>
                </div>
            </div>
            <Popup
                title={"Thêm mới bàn ăn"}
                button={[
                    <Button2 name={"Hủy"} onClick={() => { setShowPopupAddNew(false) }} />,
                    <Button2
                        name={"Thêm mới"}
                        background="#fa983a"
                        onClick={() => { addNewTable() }}
                    />
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
                                    setAdults(parseInt(val));
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
