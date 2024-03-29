import React, { useEffect, useState } from "react";
import Button2 from "../../../../base/Button/Button";
import { MENU_TAB_ADMIN, TYPE_MESSAGE } from "../../../../base/common/commonConstant";
import InputField from "../../../../base/Input/Input";
import AdminPage from "../AdminPage";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import TableBase from "../../../../base/Table/Table";
import "./kitchensDay.scss"
import Popup from "../../../../base/Popup/Popup";
import Input from "../../../../base/Input/Input";
import DatePicker from "../../../../base/DatePicker/DatePicker";
import { Tooltip } from "antd";
import ImageUpload from "../../../../base/ImageUpload/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { deleteKitChensDay, getKitChensDay, postKitChensDay, updateKitChensDay } from "../../../../../reudux/action/kitchensDayAction";
import moment from "moment"
import commonFunction from "../../../../base/common/commonFunction";

function KitchensDay(props) {

    const [statusAction, setStatusAction] = useState("");
    const [idKitchenDays, setIdKitchendays] = useState()
    const [sortType, setSortType] = useState();
    const [isShowPopupAddnew, setIsShowPopupAddnew] = useState(false);
    const [itemUseDate, setItemUseDate] = useState("");
    console.log("itemUseDateitemUseDateitemUseDate", itemUseDate);
    const [listItems, setListItems] = useState([{ name: "", unit: "", amount: "", unitprice: "" }]);
    const [itemNote, setItemNote] = useState("");
    const [search, setSearch] = useState("")

    const COLUMN_TABLE_INDEX_MENU = {
        USENAME: "usename",
        AMOUNT: "amount",
        DATAENTRYDATE: "dataentrydate",
        DATAENTRYPERSON: "dataentryperson",
    };
    const columns = [
        {
            title: "Ngày sử dụng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.USENAME,
            width: "200px",
        },
        {
            title: "SL mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.AMOUNT,
            width: "200px",
        },
        {
            title: "Ngày nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.DATAENTRYDATE,
            sorter: true,
            width: "200px",
        },
        {
            title: "Người nhập",
            dataIndex: COLUMN_TABLE_INDEX_MENU.DATAENTRYPERSON,
            width: "200px",
        },
    ];

    function columnUseName(item) {
        return <div>{moment(item?.ngayHoaDon).format("DD-MM-YYYY")}</div>;
    }
    function columnAmount(item) {
        const count = JSON.parse(item?.matHangs)
        return <div>{count.length}</div>;
    }
    function columnDataentrydate(item) {
        return <div>{moment(item?.createdOnDate).format("DD-MM-YYYY")}</div>;
    }
    function columnDataentryperson(item) {
        return <div>{item?.createdByUserName}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable?.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.USENAME]: columnUseName(item),
                [COLUMN_TABLE_INDEX_MENU.AMOUNT]: columnAmount(item),
                [COLUMN_TABLE_INDEX_MENU.DATAENTRYDATE]: columnDataentrydate(item),
                [COLUMN_TABLE_INDEX_MENU.DATAENTRYPERSON]: columnDataentryperson(item),
                key: item.id,
                data: item
            };
        });
        return [...listData];
    }

    const data = [
        {
            key: "1",
            usename: "28/07/2022",
            amount: 5,
            dataentrydate: "28/07/2022",
            dataentryperson: "Linhdtt",
        },
        {
            key: "2",
            usename: "28/07/2022",
            amount: 5,
            dataentrydate: "28/07/2022",
            dataentryperson: "Linhdtt",
        },
        {
            key: "3",
            usename: "28/07/2022",
            amount: 5,
            dataentrydate: "28/07/2022",
            dataentryperson: "Linhdtt",
        },
        {
            key: "4",
            usename: "28/07/2022",
            amount: 5,
            dataentrydate: "28/07/2022",
            dataentryperson: "Linhdtt",
        },
    ];

    const getQuyen = JSON.parse(localStorage.getItem("quyen"))

    const quyen = getQuyen

    const quyen1 = quyen?.find((item) => item === "0-3-0")
    const quyen2 = quyen?.find((item) => item === "0-3-1")
    const quyen3 = quyen?.find((item) => item === "0-3-2")

    const OPTION_MORE_TABLE = [
        {
            title: "Chi tiết",
            onSelect: (item) => {
                window.open(`/admin/kitchens-day/detail/${item.key}`, "_self")
            },
        },
        {
            title: "Sửa",
            onSelect: (item) => {
                if (quyen2 === "0-3-1") {
                    setStatusAction("UPDATE")
                    setIdKitchendays(item.key)
                    setIsShowPopupAddnew(true)
                    setItemUseDate(item.data.ngayHoaDon)
                    setListItems(JSON.parse(item?.data?.matHangs))
                    setItemNote(item.data.ghiChu)
                } else {
                    commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền sửa nguyên liêu")

                }

            },
        },
        {
            title: "Xóa",
            onSelect: (item) => {
                if (quyen3 === "0-3-2") {
                    dispatch(deleteKitChensDay(item.key))

                } else {
                    commonFunction.messages(TYPE_MESSAGE.ERROR, "Không có quyền xóa nguyên liêu")
                }
            },
        },
    ];

    const { dataChickensDay, loading } = useSelector(state => state.chickensDayReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getKitChensDay(search))
    }, [dispatch, loading, search])
    function handleClickAddnew(type) {
        setIsShowPopupAddnew(true);
        setStatusAction("ADD")
    }

    function renderTotalMoney(data) {
        let total = 0
        data?.map((item) => {
            total += item?.amount * item?.unitprice
        })
        return total;
    }

    const onSubmitSave = () => {
        setIsShowPopupAddnew(false)
        const userName = JSON.parse(localStorage.getItem("roleType"))
        const date = new Date();
        if (statusAction === "ADD") {
            const body = {
                ngayHoaDon: itemUseDate,
                kieu: "Yêu cầu nguyên liệu",
                matHangs: JSON.stringify(listItems),
                tongSoTien: parseInt(commonFunction.numberWithCommas(renderTotalMoney((listItems))), 10),
                createdByUserName: userName.userName,
                createdOnDate: date
            };

            dispatch(postKitChensDay(body))
            // console.log("bodybodybody", body, itemUseDate);
        } else {
            const body = {
                id: idKitchenDays,
                ngayHoaDon: itemUseDate,
                kieu: "Yêu cầu nguyên liệu",
                matHangs: JSON.stringify(listItems),
                tongSoTien: parseInt(commonFunction.numberWithCommas(renderTotalMoney((listItems))), 10),
                createdByUserName: userName.userName,
                createdOnDate: date
            };
            dispatch(updateKitChensDay({ id: idKitchenDays, body }))
        }
        setListItems([
            { name: "", unit: "", amount: "", unitprice: "" },
        ])
    }

    //thêm nhiều mặt hàng



    function ChangeNameItems(val, index) {
        let _listItems = [...listItems];
        _listItems[index].name = val;
        setListItems(_listItems);
    }

    function ChangeUnitItems(val, index) {
        let _listItems = [...listItems];
        _listItems[index].unit = val;
        setListItems(_listItems);
    }

    function ChangeAmountItems(val, index) {
        let _listItems = [...listItems];
        _listItems[index].amount = val;
        setListItems(_listItems);
    }

    function ChangeUnitpriceItems(val, index) {
        let _listItems = [...listItems];
        _listItems[index].unitprice = val;
        setListItems(_listItems);
    }

    function deleteItems(index) {
        let _listItems = [...listItems];
        _listItems.splice(index, 1);
        setListItems(_listItems);
    }

    function addIteams() {
        let _listItems = [...listItems];
        _listItems.push({ name: "", unit: "", amount: "", unitprice: "" });
        setListItems(_listItems);
    }

    const Card = (props) => {
        const { listItems, ChangeNameItems, ChangeUnitItems, ChangeAmountItems, ChangeUnitpriceItems, deleteItems } = props;
        return (
            <>
                {listItems?.map((item, index) => {
                    return (
                        <div className="kitchensDay-manager__popup-items">
                            <div className="kitchensDay-manager__popup-items-name">
                                <Input
                                    label={"Tên mặt hàng"}
                                    defaultValue={item.name}
                                    onBlurInput={(val) => {
                                        ChangeNameItems(val, index);
                                    }}
                                />
                            </div>
                            <div className="kitchensDay-manager__popup-items-unit">
                                <Input
                                    label={"Đơn vị tính"}
                                    defaultValue={item.unit}
                                    onBlurInput={(val) => {
                                        ChangeUnitItems(val, index);
                                    }}
                                />
                            </div>
                            <div className="kitchensDay-manager__popup-items-amount">
                                <Input
                                    label={"Số lượng"}
                                    defaultValue={item.amount}
                                    onBlurInput={(val) => {
                                        ChangeAmountItems(val, index);
                                    }}
                                />
                            </div>
                            {index > 0 && (
                                <div className="kitchensDay-manager__popup-items-delete">
                                    <Tooltip title={"Xóa món"}>
                                        <DeleteOutlined
                                            onClick={() => deleteItems(index)}
                                            style={{ color: "red" }}
                                        />
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <AdminPage
            title={"Quản lý yêu cầu nguyên liệu/Thực phẩm"}
            index={MENU_TAB_ADMIN.KITCHEN_DAY}
        >
            <div className="kitchensDay-manager">
                <div className="kitchensDay-manager__filter">
                    <div className="kitchensDay-manager__filter-search">
                        <DatePicker placeholder="dd/MM/yyyy" label={"Ngày sử dụng"} onChange={(val) => setSearch(moment(val).format("YYYY-MM-DDT00:00:00"))} />
                    </div>
                    <div className="kitchensDay-manager__filter-create-new">
                        {quyen1 === "0-3-0" ?
                            <Button2
                                name={"Thêm mới"}
                                leftIcon={<PlusOutlined />}
                                onClick={() => handleClickAddnew()}
                            /> : null}
                    </div>
                </div>
                <div className="kitchensDay-manager__content">
                    <TableBase
                        // onChangePagination={(page, pageSize)=>{}}
                        columns={columns}
                        total={90}
                        data={convertDataTable(dataChickensDay)}
                        loading={false}
                        hasMoreOption
                        option={OPTION_MORE_TABLE}
                        setObjectSort={(field, order) => {
                            setSortType({
                                field: field,
                                order: order,
                            });
                        }}
                        //onClickRow={(record, rowIndex, event)=>{window.open(`/admin/spending/detail/${record.key}`, "_self")}}
                        onContextMenu={(record, rowIndex, event) => { }}
                    />
                </div>
                <Popup
                    title={"Thêm mới nguyên liệu/thực phẩm"}
                    show={isShowPopupAddnew}
                    onClickClose={() => setIsShowPopupAddnew(false)}
                    button={[
                        <Button2
                            name={"Đóng"}
                            onClick={() => setIsShowPopupAddnew(false)}
                        />,
                        <Button2
                            name={"Lưu"}
                            onClick={() => onSubmitSave()}
                            background="#fa983a"
                        />,
                    ]}
                    width={1000}
                    //className={"menu-popup-create"}
                    body={
                        <div className="kitchensDay-manager__popup">
                            <div className="kitchensDay-manager__popup-bill">
                                <DatePicker
                                    defaultValue={itemUseDate}
                                    onChange={(val) => {
                                        setItemUseDate(moment(val).format("YYYY-MM-DDT00:00:00"));
                                    }}
                                    placeholder="dd/MM/yyyy"
                                    label={"Ngày sử dụng "}
                                />
                            </div>
                            <div className="kitchensDay-manager__popup-buttonAdd">
                                <Button2
                                    name={"Thêm nguyên liệu/Thực phẩm"}
                                    background={"#ff9f43"}
                                    onClick={() => addIteams()}
                                />
                            </div>
                            <Card
                                listItems={listItems}
                                ChangeNameItems={(val, item) =>
                                    ChangeNameItems(val, item)
                                }
                                ChangeUnitItems={(val, item) =>
                                    ChangeUnitItems(val, item)
                                }
                                ChangeAmountItems={(val, item) =>
                                    ChangeAmountItems(val, item)
                                }
                                ChangeUnitpriceItems={(val, item) =>
                                    ChangeUnitpriceItems(val, item)
                                }
                                deleteItems={(index) => deleteItems(index)}
                            />
                            <Input
                                label={"Ghi chú"}
                                defaultValue={itemNote}
                                onChange={(val) => { setItemNote(val) }}
                                autoFocus
                            />
                        </div>
                    }
                />
            </div>
        </AdminPage>

    )

}
export default KitchensDay