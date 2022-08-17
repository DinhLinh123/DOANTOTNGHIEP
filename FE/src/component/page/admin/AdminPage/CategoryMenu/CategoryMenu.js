import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, ONE_DAY, SORT_TYPE, TYPE_MESSAGE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import "./categoryMenu.scss"
import DatePicker from "../../../../base/DatePicker/DatePicker";
import moment from "moment";
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import TimePicker from "../../../../base/TimePicker/TimePicker";
import baseApi from "../../../../../api/baseApi";
import { API_CATEGORY_MENU, API_TYPE_FOOD } from "../../../../base/common/endpoint";
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction";
import { useDispatch } from "react-redux";
import RadioCheck from "../../../../base/Radio/Radio";
import commonFunction from "../../../../base/common/commonFunction";
import ModalConfirm from "../../../../base/ModalConfirm/ModalConfirm";

function CategoryMenu(props) {
    const dispatch = useDispatch();
    const [sortType, setSortType] = useState();
    const [categoryNote, setCategoryNote] = useState("");
    const [dataTable, setDataTable] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [textSearch, setTextSearch] = useState("");
    const [isManyTypeFood, setIsManyTypeFood] = useState(0);
    const [nameTypeFood, setNameTypeFood] = useState('');
    const [typeFoodDetail, setTypeFoodDetail] = useState({});
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState({ show: false, title: '', key: -1 });
    const [isShowPopupComfirmDelete, setIsShowPopupComfirmDelete] = useState(false);


    const COLUMN_TABLE_INDEX_MENU = {
        CODE: "code",
        NAME: "name",
        NOTE: "note",
        PERSON: "person",
        DATE: "date",
        TYPE: "type"
    };

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            width: "200px",
        },
        {
            title: "Ghi chú",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NOTE,
            width: "250px",
        },
        {
            title: "Một món/Nhiều món",
            dataIndex: COLUMN_TABLE_INDEX_MENU.TYPE,
            width: "100px",
        },
        // {
        //     title: "Ngày nhập",
        //     dataIndex: COLUMN_TABLE_INDEX_MENU.DATE,
        //     sorter: true,
        //     width: "100px",
        // },

    ];

    const OPTION_MORE_TABLE = [
        {
            title: "Sửa",
            onSelect: (item) => {
                setNameTypeFood(item?.item?.name)
                setIsManyTypeFood(item?.item?.isMany)
                setCategoryNote(item?.item?.ghiChu)
                setTypeFoodDetail(item?.item)
                setIsShowPopupAddnew({ show: true, title: 'Sửa danh mục món ăn', key: 1 })
            },
        },
        {
            title: "Xóa",
            onSelect: (item) => {
                setTypeFoodDetail(item?.item)
                setIsShowPopupComfirmDelete(true)
            },
        },
    ];

    function callApiGetCategoryMenu() {
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
            API_CATEGORY_MENU.GET_BY_FILTER + encodeURIComponent(JSON.stringify(param)),
            null,
            {}
        )
    }

    function callAddTypeFood() {
        dispatch(changeLoadingApp(true))
        let body = {
            "name": nameTypeFood,
            "isMany": isManyTypeFood == 1,
            "createdByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "createdByUserName": "string",
            "createdOnDate": "2022-08-11T04:57:29.357Z",
            "lastModifiedByUserId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "lastModifiedByUserName": "string"
        }
        baseApi.post(
            (res) => {
                dispatch(changeLoadingApp(false))
                callApiGetCategoryMenu()
                setIsShowPopupAddnew({ show: false, title: '', key: -1 })
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm danh mục món ăn thành công")
            },
            () => {
                dispatch(changeLoadingApp(false))
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm danh mục món ăn thất bại")
                setIsShowPopupAddnew({ show: false, title: '', key: -1 })
            },
            null,
            API_TYPE_FOOD.GET_ALL,
            null,
            body
        )
    }

    function callUpdateTypeFood(item) {
        dispatch(changeLoadingApp(true))
        let body = item
        body.name = nameTypeFood;
        body.isMany = isManyTypeFood
        baseApi.put(
            (res) => {
                dispatch(changeLoadingApp(false))
                callApiGetCategoryMenu()
                setIsShowPopupAddnew({ show: false, title: '', key: -1 })
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa danh mục món ăn thành công")
            },
            () => {
                dispatch(changeLoadingApp(false))
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa danh mục món ăn thất bại")
                setIsShowPopupAddnew({ show: false, title: '', key: -1 })
            },
            null,
            API_TYPE_FOOD.UPDATE_BY_ID + item?.id,
            null,
            body
        )

    }

    function callDeleteTypeFood() {
        dispatch(changeLoadingApp(true))
        baseApi.delete(
            (res) => {
                dispatch(changeLoadingApp(false))
                callApiGetCategoryMenu()
                setIsShowPopupComfirmDelete(false)
                commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa danh mục món ăn thành công")
            },
            () => {
                dispatch(changeLoadingApp(false))
                commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa danh mục món ăn thất bại")
                setIsShowPopupComfirmDelete(false)
            },
            null,
            API_TYPE_FOOD.DELETE_BY_ID + typeFoodDetail.id,
            null,
        )

    }

    useEffect(() => {
        callApiGetCategoryMenu()
    }, [])

    useEffect(() => {
        callApiGetCategoryMenu()
    }, [textSearch])

    function columnCode(item) {
        return <div>{item?.code}</div>;
    }
    function columnName(item) {
        return <div>{item?.name}</div>;
    }
    function columnNote(item) {
        return <div>{item?.note}</div>;
    }
    function columnType(item) {
        switch (item?.isMany) {
            case true:
                return <div>Loại nhiều món</div>;
            case false:
                return <div>Loại một món</div>;
            default:
                break;
        }
    }
    function columnPerson(item) {
        return <div>{item?.person}</div>;
    }
    function columnDate(item) {
        return <div>{item?.date}</div>;
    }


    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.NOTE]: columnNote(item),
                [COLUMN_TABLE_INDEX_MENU.TYPE]: columnType(item),
                key: idx,
                item: item
            };
        });
        return [...listData];
    }

    return (
        <AdminPage
            title={"Quản lý danh mục menu"}
            index={MENU_TAB_ADMIN.CATEGOGY_MENU}
        >
            <div className="categorymenu-manager">
                <div className="categorymenu-manager__filter">
                    <div className="categorymenu-manager__filter-phone">
                        <InputField
                            placeholder={"Tên danh mục"}
                            width={"100%"}
                            onChange={(val) => {
                                setTimeout(() => {
                                    setTextSearch(val)
                                }, 200);
                            }}
                        />
                    </div>
                    <div className="categorymenu-manager__filter-create">
                        <Button2
                            name={"Thêm mới danh mục"}
                            leftIcon={<PlusOutlined />}
                            onClick={() => setIsShowPopupAddnew({ show: true, title: 'Thêm mới danh mục đồ ăn', key: 0 })}
                        />
                    </div>
                </div>

                <div className="categorymenu-manager__content">
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
                    />
                </div>
                <Popup
                    title={isShowPopupAddnew.title}
                    show={isShowPopupAddnew.show}
                    onClickClose={() => setIsShowPopupAddnew({ show: false, title: '', key: -1 })}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() => {
                                setIsShowPopupAddnew({ show: false, title: '', key: -1 })
                            }}
                        />,
                        <Button2
                            name={"Lưu"}
                            onClick={() => {
                                if (isShowPopupAddnew.key == 0) {
                                    callAddTypeFood()
                                }
                                if (isShowPopupAddnew.key == 1) {
                                    callUpdateTypeFood(typeFoodDetail)
                                }
                            }}
                            background="#fa983a"
                            disabled={nameTypeFood?.length <= 0}
                        />,
                    ]}
                    width={600}
                    className={"category-menu-popup-create-type-food"}
                    body={
                        <div className="category-menu-manager__popup">
                            <div className="category-menu-manager__popup-content">

                                <div className="category-menu-manager__popup-content-buffet">
                                    <Input
                                        label={"Tên danh mục đồ ăn"}
                                        defaultValue={nameTypeFood}
                                        onChange={(val) => {
                                            setNameTypeFood(val);
                                        }}
                                        placeholder={"Tên danh mục đồ ăn..."}
                                        required
                                    />
                                    <Input
                                        label={"Ghi chú"}
                                        defaultValue={categoryNote}
                                        onChange={(val) => {
                                            setCategoryNote(val);
                                        }}
                                        placeholder={"Ghi chú..."}
                                    />
                                    <div className="category-menu-manager__popup-content-buffet-many">
                                        <RadioCheck
                                            title={"Kiểu"}
                                            valueDefault={isManyTypeFood}
                                            listOption={[
                                                {
                                                    label: 'Một món',
                                                    value: false
                                                }, {
                                                    label: 'Nhiều món',
                                                    value: true
                                                }
                                            ]}
                                            onChange={(val) => { setIsManyTypeFood(val) }}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                />
                <ModalConfirm
                    title={"danh mục đồ ăn"}
                    setShow={(val) => setIsShowPopupComfirmDelete(val)}
                    show={isShowPopupComfirmDelete}
                    onClickSuccess={() => callDeleteTypeFood()}
                    contentName={typeFoodDetail.name}
                />
            </div>
        </AdminPage>

    )

}
export default CategoryMenu