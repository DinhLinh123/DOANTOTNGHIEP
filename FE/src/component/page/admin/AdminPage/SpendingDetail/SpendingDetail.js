import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../../../../../utils/urpapi";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import commonFunction from "../../../../base/common/commonFunction";
import InputField from "../../../../base/Input/Input";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import "./spendingDetail.scss"

function SpendingDetail(props) {
    const { spendingID } = useParams();
    const [spendingDetail, setPendingDetail] = useState([]);
    useEffect(() => {
        const spenDingDetail = async (id) => {
            try {
                const res = await axios.get(`${URL_API}/ChiTieuTrongNgay/${id}`)
                setPendingDetail(res.data)
            } catch (error) {

            }
        }
        spenDingDetail(spendingID)
    }, [])
    const [sortType, setSortType] = useState();
    const COLUMN_TABLE_INDEX_MENU = {
        SERIAL: "serial",
        NAME: "name",
        UNIT: "unit",
        AMOUNT: "amount",
        UNITPRICE: "unitprice",
        INTOMONEY: "intomoney",
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
            width: "300px",
        },
        {
            title: "Đơn vị tính",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
            sorter: true,
            width: "200px",
        },
        {
            title: "Số lượng",
            dataIndex: COLUMN_TABLE_INDEX_MENU.AMOUNT,
            width: "200px",
        },
        {
            title: "Đơn giá",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNITPRICE,
            sorter: true,
            width: "200px",
        },
        {
            title: "Thành tiền",
            dataIndex: COLUMN_TABLE_INDEX_MENU.INTOMONEY,
            width: "200px",
        },
    ];

    const data =
    {
        key: "1",
        billName: "HD01",
        billDate: "27/08/2022",
        image: "",
        listItems: '[{"name":"Giấy bạc", "unit":"Bọc", "amount": "2", "unitprice": "100"}, {"name":"Kẹo", "unit":"Ăn", "amount": "10", "unitprice": "25000"}]',
        note: "ghi chú",
        status: "Đã duyệt",
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
    function columnUnitprice(item) {
        return <div>{commonFunction.numberWithCommas(item?.unitprice)}</div>;
    }
    function columnIntomoney(item) {
        return <div>{commonFunction.numberWithCommas(item?.amount * item?.unitprice)}</div>;
    }

    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
            return {
                [COLUMN_TABLE_INDEX_MENU.SERIAL]: columnSerial(idx + 1),
                [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
                [COLUMN_TABLE_INDEX_MENU.UNIT]: columnUnit(item),
                [COLUMN_TABLE_INDEX_MENU.AMOUNT]: columnAmount(item),
                [COLUMN_TABLE_INDEX_MENU.UNITPRICE]: columnUnitprice(item),
                [COLUMN_TABLE_INDEX_MENU.INTOMONEY]: columnIntomoney(item),
                key: idx,
            };
        });
        return [...listData];
    }

    function renderTotalMoney(data) {
        let total = 0
        data?.map((item) => {
            total += item?.amount * item?.unitprice
        })
        return total;
    }


    return (
        <AdminPage
            title={"Chi tiết hóa đơn"}
            index={MENU_TAB_ADMIN.SPENDING}
        >
            {spendingDetail.length === 0 ? null : <div className="spendingDetail-manager">
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Tên hóa đơn</span>
                    <span className="spendingDetail-manager__item-content">{spendingDetail?.name}</span>
                </div>
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Ngày hóa đơn</span>
                    <span className="spendingDetail-manager__item-content">{data.billDate}</span>
                </div>
                <div className="spendingDetail-manager__table">
                    <div className="spendingDetail-manager__table-title">Danh sách mặt hàng</div>
                    <div className="spendingDetail-manager__table-content">
                        <TableBase
                            columns={columns}
                            data={convertDataTable(JSON.parse(spendingDetail?.matHang))}
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
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">TỔNG TIỀN: </span>
                    <span className="spendingDetail-manager__item-content">{commonFunction.numberWithCommas(renderTotalMoney(JSON.parse(spendingDetail?.matHang)))}</span>
                </div>
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Ảnh hóa đơn</span>
                    <span className="spendingDetail-manager__item-content">
                      {spendingDetail?.anh ? <img src={spendingDetail?.anh} alt="" width={150} /> : "chưa có"}  
                    </span>
                </div>
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Ghi chú</span>
                    <span className="spendingDetail-manager__item-content">{spendingDetail?.ghiChu ?? "Chưa có"}</span>
                </div>
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Trạng thái</span>
                    <span className="spendingDetail-manager__item-content">{spendingDetail?.trangThaiHienTai}</span>
                </div>
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Người nhập</span>
                    <span className="spendingDetail-manager__item-content">{spendingDetail?.createdByUserName}</span>
                </div>
                <div className="spendingDetail-manager__item">
                    <span className="spendingDetail-manager__item-lable">Ngày nhập</span>
                    <span className="spendingDetail-manager__item-content">{data.date}</span>
                </div>
                <div className="spendingDetail-manager__approve">
                    <div className="spendingDetail-manager__approve-title">Quản lý phê duyệt</div>
                    <div className="spendingDetail-manager__approve-content">
                        <div className="spendingDetail-manager__approve-content-text">
                            <InputField label={"Nội dung phê duyệt"} />
                        </div>
                        <div className="spendingDetail-manager__approve-content-text">

                        </div>
                        <div className="spendingDetail-manager__approve-content-date">
                            <div className="spendingDetail-manager__approve-content-date-label">
                                Ngày phê duyệt:
                            </div>
                            <div className="spendingDetail-manager__approve-content-date-value">

                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </AdminPage>
    )

}
export default SpendingDetail;
