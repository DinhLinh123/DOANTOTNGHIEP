import React, { useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, SORT_TYPE, TYPE_MESSAGE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./area.scss"
import { useDispatch } from "react-redux";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import baseApi from "../../../../../api/baseApi";
import { API_AREA } from "../../../../base/common/endpoint";
import { useEffect } from "react";
import Popup from "../../../../base/Popup/Popup";
import commonFunction from "../../../../base/common/commonFunction";
import ModalConfirm from "../../../../base/ModalConfirm/ModalConfirm";

function Area(props) {
    const dispatch = useDispatch();
    const [sortType, setSortType] = useState();
    const [dataTable, setDataTable] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [areaName, setAreaName] = useState("");
    const [areaDetail, setAreaDetail] = useState();
    const [isShowPopupAddNew, setIsShowPopupAddNew] = useState({ show: false, title: '', key: -1 });
    const [isShowPopupConfirmDelete, setIsShowPopupConfirmDelete] = useState({ show: false, item: '' });
    const [textSearch, setTextSearch] = useState("");

    const COLUMN_TABLE_INDEX_MENU = {
        NAME: "name",
        AGE: "age",
        ADDRESS: "address",
    };
    const columns = [
        {
            title: "Tên Khu vực",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            sorter: true,
            width: "300px",
        },
        // {
        //     title: "Age",
        //     dataIndex: COLUMN_TABLE_INDEX_MENU.AGE,
        //     defaultSortOrder: SORT_TYPE.DESC,
        //     sorter: true,
        //     width: "300px",
        // },
        // {
        //     title: "Address",
        //     dataIndex: COLUMN_TABLE_INDEX_MENU.ADDRESS,
        //     width: "300px",
        // },
    ];
    const getQuyen = JSON.parse(localStorage.getItem("quyen"))

    const quyen = getQuyen
  
    const quyen1 = quyen?.find((item) => item === "0-7-0")
    const quyen2 = quyen?.find((item) => item === "0-7-1")
    const quyen3 = quyen?.find((item) => item === "0-7-2")

    const OPTION_MORE_TABLE = [
        {
            title: "Chi tiết",
            onSelect: (item) => {
                window.open(`/admin/area/detail/${item.item.id}`, "_self")
            },
        },
        {
            title: "Sửa",
            onSelect: (item) => {
                if(quyen2 === "0-7-2"){
                    setAreaDetail(item.item)
                    setIsShowPopupAddNew({ show: true, title: 'Sửa Khu vực', key: 1 })
                    setAreaName(item.item.name)
                }else{
                    commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền sửa khu vực")
                }
               
            },
        },
        {
            title: "Xóa",
            onSelect: (item) => {
                if(quyen3 === "0-7-3"){
                    setIsShowPopupConfirmDelete({ show: true, item: item.item })
                }else{
                    commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa khu vực")
                }
            },
        },
    ];

    useEffect(() => {
        callGetAllArea()
    }, [])
    useEffect(() => {
        callGetAllArea()
    }, [textSearch])
    function columnName(item) {
        return <div>{item?.name}</div>;
    }
    function columnAge(item) {
        return <div>{item?.age}</div>;
    }
    function columnAddress(item) {
        return <div>{item?.address}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                // [COLUMN_TABLE_INDEX_MENU.AGE]: columnAge(item),
                // [COLUMN_TABLE_INDEX_MENU.ADDRESS]: columnAddress(item),
                key: idx,
                item
            };
        });
        return [...listData];
    }

    function callGetAllArea() {

        dispatch(changeLoadingApp(true))
        let param = {
            "TextSearch": textSearch
        }
        baseApi.get(
            (res) => {
                setDataTable(res.data || [])
                setDataTotal(res?.data?.length)
                dispatch(changeLoadingApp(false))
            },
            () => {
                dispatch(changeLoadingApp(false))
            },
            null,
            API_AREA.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param)),
            null,
            {}
        )
    }

    function callAddArea() {
        dispatch(changeLoadingApp(true))

        let body = {
            name: areaName
        }

        baseApi.post(
            (res) => {
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm khu vực thành công")
                dispatch(changeLoadingApp(false))
                callGetAllArea()
                setAreaName('')
                setIsShowPopupAddNew({ show: false, title: '', key: -1 })
            },
            () => {
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm khu vực thất bại")
                dispatch(changeLoadingApp(false))
                setIsShowPopupAddNew({ show: false, title: '', key: -1 })
            },
            null,
            API_AREA.GET_ALL,
            null,
            body
        )
    }

    function callUpdateArea() {
        dispatch(changeLoadingApp(true))

        let body = areaDetail;
        body.name = areaName

        baseApi.put(
            (res) => {
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa khu vực thành công")
                dispatch(changeLoadingApp(false))
                callGetAllArea()
                setAreaName('')
                setIsShowPopupAddNew({ show: false, title: '', key: -1 })
            },
            () => {
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa khu vực thất bại")
                dispatch(changeLoadingApp(false))
                setIsShowPopupAddNew({ show: false, title: '', key: -1 })
            },
            null,
            API_AREA.UPDATE_BY_ID + areaDetail.id,
            null,
            body
        )
    }



    function callDeleterea() {
        dispatch(changeLoadingApp(true))

        baseApi.delete(
            (res) => {
                setIsShowPopupConfirmDelete({ show: false, item: '' })
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa khu vực thành công")
                dispatch(changeLoadingApp(false))
                callGetAllArea()
            },
            () => {
                setIsShowPopupConfirmDelete({ show: false, item: '' })
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa khu vực thất bại")
                dispatch(changeLoadingApp(false))
            },
            null,
            API_AREA.DELETE_BY_ID + isShowPopupConfirmDelete?.item.id,
            null,
            {}
        )
    }


    return (
        <AdminPage
            title={"Quản lý khu vực"}
            index={MENU_TAB_ADMIN.AREA}
        >
            <div className="area-manager">
                <div className="area-manager__filter">
                    <div className="area-manager__filter-search">
                        <InputField placeholder={"Tìm kiếm theo từ khóa"} width={400} onChange={(val) => {
                            setTimeout(() => {
                                setTextSearch(val)
                            }, 200);
                        }} />
                    </div>
                    <div className="area-manager__filter-create-new">
                        {quyen1 === "0-7-0" ?  
                        <Button2
                            name={"Thêm mới Khu vực"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => setIsShowPopupAddNew({ show: true, title: 'Thêm mới Khu vực', key: 0 })}
                        /> : null}
                       
                    </div>
                </div>
                <div className="area-manager__content">
                    <TableBase
                        // onChangePagination={(page, pageSize)=>{}}
                        columns={columns}
                        total={dataTotal}
                        data={convertDataTable(dataTable)}
                        loading={false}
                        hasMoreOption
                        option={OPTION_MORE_TABLE}
                        setObjectSort={(field, order) => {
                            setSortType({
                                field: field,
                                order: order,
                            });
                        }}
                        onClickRow={(record, rowIndex, event) => {
                        }}
                    />
                </div>
            </div>
            <Popup
                title={isShowPopupAddNew.title}
                show={isShowPopupAddNew.show}
                onClickClose={() => setIsShowPopupAddNew({ show: false, title: '', key: -1 })}
                button={[
                    <Button2
                        name={"Đóng"}
                        onClick={() => {
                            setAreaName("")
                            setIsShowPopupAddNew({ show: false, title: '', key: -1 })
                        }}
                    />,
                    <Button2
                        name={"Lưu"}
                        onClick={() => isShowPopupAddNew.key == 0 ? callAddArea() : callUpdateArea()}
                        background="#fa983a"
                        disabled={areaName?.length <= 0}
                    />,
                ]}
                width={600}
                className={"menu-popup-create"}
                body={
                    <div className="menu-manager__popup">
                        <div className="menu-manager__popup-content">
                            <div className="menu-manager__popup-content-buffet">
                                <div className="menu-manager__popup-content-buffet-name">
                                    <InputField
                                        label={"Tên khu vực"}
                                        value={areaName}
                                        onChange={(val) => {
                                            setAreaName(val);
                                        }}
                                        placeholder={"Tên khu vực..."}
                                        required
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                }
            />
            <ModalConfirm
                title={"khu vực"}
                setShow={(val) => setIsShowPopupConfirmDelete({ show: val, item: '' })}
                show={isShowPopupConfirmDelete.show}
                onClickSuccess={() => callDeleterea()}
                contentName={isShowPopupConfirmDelete.item.name}
            />
        </AdminPage>

    )

}
export default Area;
