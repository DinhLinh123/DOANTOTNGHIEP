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
import ModalConfirm from "../../../../../base/ModalConfirm/ModalConfirm";

function AreaDetail(props) {

    let dispatch = useDispatch();
    const [showPopupAddNew, setShowPopupAddNew] = useState({ show: false, title: '', key: -1 })
    const [tableType, setTableType] = useState(1)
    const [tableName, setTableName] = useState("")
    const [areaName, setAreaName] = useState("");
    const [adults, setAdults] = useState(1)
    const [list, setList] = useState([])
    const [areaDetail, setAreaDetail] = useState()
    const [isShowPopupComfirmDelete, setIsShowPopupComfirmDelete] = useState({ show: false, item: '' });

    let { areaID } = useParams();

    useEffect(() => {
        baseApi.get(
            (res) => {
                setAreaDetail(res)
                setAreaName(res?.name)
            },
            () => { },
            null,
            API_AREA.GET_BY_ID + areaID
        )
    }, [areaID])


    useEffect(() => {
        callApiGetTableInArea()
    }, [])

    function callApiGetTableInArea() {
        let param = {
            "idKhuVuc": areaID
        }
        baseApi.get(
            (res) => {
                setList(res.data)
            },
            (err) => { },
            null,
            API_TABLE.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param)),
            {},
            {}
        )
    }

    function updatePosition(item, value, value2) {
        let abc = list
        let objIndex = abc.findIndex((obj => obj.name == item.name));
        abc[objIndex].left = parseInt(value2?.x)
        abc[objIndex].top = parseInt(value2?.y)
        console.log(value2?.y);
        console.log(value2?.x);
        callSaveTable(item.id, item, parseInt(value2?.x), parseInt(value2?.y))
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
                setShowPopupAddNew({ show: false, title: '', key: -1 })
                let _listTable = [...list]

                _listTable.push(res.data)
                setList(_listTable)
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm bàn thành công")
            },
            () => {
                dispatch(changeLoadingApp(false))
                setShowPopupAddNew({ show: false, title: '', key: -1 })
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm bàn thất bại")
            },
            null,
            API_TABLE.ALL_NEW,
            {},
            body
        )
    }

    function callSaveTable(id, item, left, top) {
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

    function updateTable(item) {
        let body = item;
        body.name = tableName;
        body.soNguoiToiDa = adults;
        body.kieuDang = tableType.toString();

        baseApi.put(
            (res) => {
                setShowPopupAddNew({ show: false, title: '', key: -1 })
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa bàn ăn thành công")
            },
            () => {
                setShowPopupAddNew({ show: false, title: '', key: -1 })
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa bàn ăn thất bại")
            },
            null,
            API_TABLE.UPDATE_BY_ID + item.id,
            {},
            body
        )
    }

    function deleteTable() {
        baseApi.delete(
            (res) => {
                setShowPopupAddNew({ show: false, title: '', key: -1 })
                setIsShowPopupComfirmDelete({ show: false, item: '' })
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa bàn ăn thành công")
                callApiGetTableInArea()
            },
            () => {
                setShowPopupAddNew({ show: false, title: '', key: -1 })
                setIsShowPopupComfirmDelete({ show: false, item: '' })
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa bàn ăn thất bại")
            },
            null,
            API_TABLE.DELETE_BY_ID + showPopupAddNew.item.id,
            {},
        )
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
                            {areaName}
                        </div>
                    </div>
                    <div className="area-detail__header-button">
                        <div className="area-detail__header-button-add">
                            <Button2 name={"Thêm mới bàn ăn"} onClick={() => { setShowPopupAddNew({ show: true, title: 'Thêm mới món ăn', key: 0 }) }} />
                        </div>
                    </div>
                </div>
                <div className="area-detail__content"
                    style={{ height: '600px', width: '1000px', position: 'relative' }}
                >
                    <div className="area-detail__content-drag"
                        style={{ height: '600px', width: '1000px', position: 'absolute', top: '0', left: '0' }}
                    >
                        {list && list.length > 0 ? list?.map((item) => {
                            debugger
                            return (
                                <Draggable defaultPosition={{ x: parseInt(item?.left), y: parseInt(item?.top) }} bounds="parent" onStop={(val, val2) => { updatePosition(item, val, val2) }} className={item?.title}>
                                    <div
                                        className="area-detail__content-drag-item"
                                        style={{ borderRadius: item?.kieuDang == 0 ? '50%' : '8px', position: 'absolute', top: '8px', left: '8px' }}
                                        onDoubleClick={() => {
                                            setTableName(item.name)
                                            setAdults(item.soNguoiToiDa)
                                            setTableType(item.kieuDang)
                                            setShowPopupAddNew({ show: true, title: 'Sửa bàn ăn', key: 1, item: item })
                                        }}
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
                title={showPopupAddNew.title}
                button={[
                    <Button2 name={"Hủy"} onClick={() => { setShowPopupAddNew({ show: false, title: '', key: -1 }) }} />,
                    <Button2 name={"Xóa"} background="#ff4d4d" style={{ display: showPopupAddNew.key == 0 ? "none" : "block" }} onClick={() => { 
                        setIsShowPopupComfirmDelete({show: true, item:''}) }} />,
                    <Button2
                        name={"Lưu"}
                        background="#fa983a"
                        onClick={() => { showPopupAddNew.key == 0 ? addNewTable() : updateTable(showPopupAddNew.item) }}
                    />
                ]}
                className="add-table"
                show={showPopupAddNew.show}
                onClickClose={() => { setShowPopupAddNew({ show: false, title: '', key: -1 }) }}
                body={
                    <>
                        <div className="add-table__item">
                            <InputField
                                label={"Tên bàn"}
                                value={tableName}
                                onChange={(val) => {
                                    setTableName(val);
                                }}
                                required
                            />
                        </div>
                        <div className="add-table__item">
                            <InputField
                                value={adults}
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
                                valueDefault={parseInt(tableType)}
                                onChange={(val) => { setTableType(val) }}
                            />
                        </div>
                    </>
                }
            />
            <ModalConfirm
                title={"bàn ăn"}
                setShow={(val) => setIsShowPopupComfirmDelete({ show: val, item: '' })}
                show={isShowPopupComfirmDelete.show}
                onClickSuccess={() => deleteTable()}
                contentName={showPopupAddNew?.item?.name}
            />
        </AdminPage>

    )

}
export default AreaDetail;
