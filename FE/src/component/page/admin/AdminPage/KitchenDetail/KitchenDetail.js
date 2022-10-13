import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "../../../../../utils/urpapi";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import commonFunction from "../../../../base/common/commonFunction";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";
import "./kitchenDetail.scss"
import moment from "moment"

function KitchenDetail(props) {
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
        billName: "HD012",
        billDate: "27/08/2022",
        image: "",
        listItems: '[{"name":"Giấy bạc", "unit":"Bọc", "amount": "2", "unitprice": "50000"}, {"name":"Kẹo", "unit":"Ăn", "amount": "10", "unitprice": "25000"}]',
        note: "ghi chú",
        status: "Đã duyệt",
        person: "Linhdtt",
        date: "27/08/2022",

    };

    const [kitchenDetail, setKitchenDetail] = useState({
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
    const { kitchenID } = useParams()
    useEffect(() => {

        const getChickensDetail = async () => {
            const res = await axios.get(`${URL_API}/PhieuNhapVatTu/${kitchenID}`)
            setKitchenDetail(res.data.data)
        }
        getChickensDetail()
    }, [kitchenID])

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
        return <div>{commonFunction.numberWithCommas(item?.unitprice)} </div>;
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
            title={"Chi tiết hóa đơn nguyên liệu/Thực phẩm"}
            index={MENU_TAB_ADMIN.KITCHEN}
        >
            <div className="kitchenDetail-manager">
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Tên hóa đơn</span>
                    <span className="kitchenDetail-manager__item-content">{kitchenDetail.name}</span>
                </div>
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Ngày hóa đơn</span>
                    <span className="kitchenDetail-manager__item-content">{moment(kitchenDetail.ngayHoaDon).format("DD-MM-YYYY")}</span>
                </div>
                <div className="kitchenDetail-manager__table">
                    <div className="kitchenDetail-manager__table-title">Danh sách mặt hàng</div>
                    <div className="kitchenDetail-manager__table-content">
                        <TableBase
                            columns={columns}
                            data={convertDataTable(JSON.parse(kitchenDetail?.matHangs))}
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
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">TỔNG TIỀN: </span>
                    <span className="kitchenDetail-manager__item-content">{commonFunction.numberWithCommas(renderTotalMoney(JSON.parse(kitchenDetail?.matHangs)))}</span>
                </div>
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Ảnh hóa đơn</span>
                    <span className="kitchenDetail-manager__item-content">
                        {kitchenDetail?.hinhAnh ? <img src={kitchenDetail?.hinhAnh} alt="" width={150}/> : "Không có"}
                    </span>
                </div>
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Ghi chú</span>
                    <span className="kitchenDetail-manager__item-content">{data.note}</span>
                </div>
                {/* <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Trạng thái</span>
                    <span className="kitchenDetail-manager__item-content">{data.status}</span>
                </div> */}
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Người nhập</span>
                    <span className="kitchenDetail-manager__item-content">{kitchenDetail?.createdByUserName}</span>
                </div>
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable">Ngày nhập</span>
                    <span className="kitchenDetail-manager__item-content">{data.date}</span>
                </div>
                <div className="kitchenDetail-manager__item">
                    <span className="kitchenDetail-manager__item-lable" onClick={() => window.open(`/admin/kitchens-days`, "_self")}>quay lại</span>
                </div>
            </div>
        </AdminPage>
    )

}
export default KitchenDetail;
