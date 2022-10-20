import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { URL_API } from "../../../../../utils/urpapi";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import commonFunction from "../../../../base/common/commonFunction";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import "./kitchensDayDetail.scss";
import moment from "moment"

function KitchensDayDetail(props) {
    const [sortType, setSortType] = useState();
    const COLUMN_TABLE_INDEX_MENU = {
        SERIAL: "serial",
        NAME: "name",
        UNIT: "unit",
        AMOUNT: "amount",
    };

    const columns = [
        {
            title: "Số thứ tự",
            dataIndex: COLUMN_TABLE_INDEX_MENU.SERIAL,
            width: "100px",
        },
        {
            title: "Tên mặt hàng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            width: "20%",
        },
        {
            title: "Đơn vị tính",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
            sorter: true,
            width: "20%",
        },
        {
            title: "Số lượng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.AMOUNT,
            width: "20%",
        },
    ];

    const [kitchenDayDetail, setKitchenDayDetail] = useState({
        key: "1",
        billName: "HD01",
        billDate: "27/08/2022",
        image: "",
        matHangs: '[{"name":"Giấy bạc", "unit":"Bọc", "amount": "2", "unitprice": "50000"}, {"name":"Kẹo", "unit":"Ăn", "amount": "10", "unitprice": "25000"}]',
        note: "ghi chú",
        status: "Đã duyệt",
        person: "Linhdtt",
        date: "27/08/2022",

    });

    const {kitchenDayID} = useParams()
    useEffect(() => {

        const getChickensDetail = async () => {
            const res = await axios.get(`${URL_API}/PhieuNhapVatTu/${kitchenDayID}`)
            setKitchenDayDetail(res.data.data)
        }
        getChickensDetail()
    }, [kitchenDayID])

    const data =
    {
        key: "1",
        billName: "HD01",
        billDate: "27/08/2022",
        listItems: '[{"name":"Giấy bạc", "unit":"Bọc", "amount": "2"}, {"name":"Kẹo", "unit":"Ăn", "amount": "10"}]',
        note: "ghi chú",
        person: "Linhdtt",
        date: "27/08/2022",

    };

    function columnSerial(idx) {
        return <div>{idx}</div>;
    }
    function columnName(item) {
        return <div>{item?.name}</div>;
    }
    function columnUnit(item) {
        return <div>{item?.unit}</div>;
    }
    function columnAmount(item) {
        return <div>{item?.amount}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.SERIAL]: columnSerial(idx + 1),
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
                [COLUMN_TABLE_INDEX_MENU.AMOUNT]: columnAmount(item),
                key: idx,
            };
        });
        return [...listData];
    }

    return (
        <AdminPage
            title={"Chi tiết nguyên liệu/Thực phẩm yêu cầu"}
            index={MENU_TAB_ADMIN.KITCHEN_DAY}
        >
            <div className="kitchensDayDetail-manager">
                <div className="kitchensDayDetail-manager__item">
                    <span className="kitchensDayDetail-manager__item-lable">Ngày sử dụng</span>
                    <span className="kitchensDayDetail-manager__item-content">{moment(kitchenDayDetail.ngayHoaDon).format("DD-MM-YYYY")}</span>
                </div>
                <div className="kitchensDayDetail-manager__table">
                    <div className="kitchensDayDetail-manager__table-title">Danh sách nguyên liệu/Thực phẩm</div>
                    <div className="kitchensDayDetail-manager__table-content">
                        <TableBase
                            columns={columns}
                            data={convertDataTable(JSON.parse(kitchenDayDetail?.matHangs))}
                            loading={false}
                            //hasMoreOption
                            setObjectSort={(field, order) => {
                                setSortType({
                                    field: field,
                                    order: order,
                                });
                            }}
                            isPaging={false}
                        />
                    </div>
                </div>
                <div className="kitchensDayDetail-manager__item">
                    <span className="kitchensDayDetail-manager__item-lable">Ghi chú</span>
                    <span className="kitchensDayDetail-manager__item-content">{kitchenDayDetail?.ghiChu ?? "Chưa có"}</span>
                </div>
                <div className="kitchensDayDetail-manager__item">
                    <span className="kitchensDayDetail-manager__item-lable">Người nhập</span>
                    <span className="kitchensDayDetail-manager__item-content">{kitchenDayDetail.createdByUserName}</span>
                </div>
                <div className="kitchensDayDetail-manager__item">
                    <span className="kitchensDayDetail-manager__item-lable">Ngày nhập</span>
                    <span className="kitchensDayDetail-manager__item-content">{moment(kitchenDayDetail.createdOnDate).format("DD-MM-YYYY")}</span>
                </div>
                <div className="kitchensDayDetail-manager__item">
                    <span className="kitchensDayDetail-manager__item-back" onClick={() => window.open(`/admin/kitchens-days`, "_self")}>Quay lại</span>
                </div>

            </div>
        </AdminPage>
    )

}
export default KitchensDayDetail;
