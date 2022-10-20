import { DatePicker } from "antd"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant"
import AdminPage from "../AdminPage"
import './report.scss'
import { LineChart, BarChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import $ from "jquery";
import TableBase from "../../../../base/Table/Table"
import Dropdown from "../../../../base/Dropdown/Dropdown"
import moment from "moment";
import { API_GET_BILL, API_REPORT_FOOD, API_REVENUE_AND_EXPENDITURE } from "../../../../base/common/endpoint"
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction"
import { useDispatch } from "react-redux"
import baseApi from "../../../../../api/baseApi"
import InputField from "../../../../base/Input/Input"
import noDataimg from "../../../../../image/nodatachart.png"
import commonFunction from "../../../../base/common/commonFunction"

const MENU_TAB = {
    CHART: "chart",
    BILL: 'bill'
}

const TYPE_FILTER = {
    DATE: 'date',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
}

const { RangePicker } = DatePicker;

const COLUMN_TABLE_INDEX_MENU = {
    NAME: "name",
    TOTAL: "total",
    PROMOTION: "promotion",
    REAL_MONEY: "realMoney",
    TIME: "time",
    CATEGORY: "category",
    DESCRIBE: "describe"
};

function Report(props) {
    const dispatch = useDispatch();
    const [menuTab, setMenuTab] = useState(MENU_TAB.CHART)
    const [typeFilter, setTypeFilter] = useState(TYPE_FILTER.DATE)
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [dataLineChart, setDataLineChart] = useState([])
    const [dataBarChart, setDataBarChart] = useState([])
    const [dataBills, setDataBills] = useState([])
    const [pageSize, setPageSize] = useState(5)

    const columns = [
        // {
        //     title: "Tên",
        //     dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
        //     sorter: true,
        //     width: "200px",
        // },
        {
            title: "Tổng tiền",
            dataIndex: COLUMN_TABLE_INDEX_MENU.TOTAL,
            //sorter: true,
            width: "200px",
        },
        {
            title: "Khuyễn mãi",
            dataIndex: COLUMN_TABLE_INDEX_MENU.PROMOTION,
            width: "200px",
        },
        {
            title: "Tiền phải trả",
            dataIndex: COLUMN_TABLE_INDEX_MENU.REAL_MONEY,
            width: "200px",
            // sorter: true
        },
        {
            title: "Thời gian thanh toán",
            dataIndex: COLUMN_TABLE_INDEX_MENU.TIME,
            width: "200px",
        },
    ];

    const customDateStartEndFormat = (value) => {
        let time = `${moment(value).startOf('date').format('DD/MM/YYYY')} ~ ${moment(value)
            .endOf('date')
            .format('DD/MM/YYYY')}`;

        return time
    }


    const customWeekStartEndFormat = (value) => {
        let time = `${moment(value).startOf('week').format('DD/MM/YYYY')} ~ ${moment(value)
            .endOf('week')
            .format('DD/MM/YYYY')}`;

        return time
    }

    const customMonthStartEndFormat = (value) => {
        let time = `${moment(value).startOf('month').format('DD/MM/YYYY')} ~ ${moment(value)
            .endOf('month')
            .format('DD/MM/YYYY')}`;

        return time
    }

    const customQuarterStartEndFormat = (value) => {
        let time = `${moment(value).startOf('quarter').format('DD/MM/YYYY')} ~ ${moment(value)
            .endOf('quarter')
            .format('DD/MM/YYYY')}`;

        return time
    }

    const customYearStartEndFormat = (value) => {
        let time = `${moment(value).startOf('year').format('DD/MM/YYYY')} ~ ${moment(value)
            .endOf('year')
            .format('DD/MM/YYYY')}`;

        return time
    }


    function getFormatDatePicker(value) {
        switch (typeFilter) {
            case TYPE_FILTER.DATE:
                return customDateStartEndFormat(value)
            case TYPE_FILTER.WEEK:
                return customWeekStartEndFormat(value)
            case TYPE_FILTER.MONTH:
                return customMonthStartEndFormat(value)
            case TYPE_FILTER.QUARTER:
                return customQuarterStartEndFormat(value)
            case TYPE_FILTER.YEAR:
                return customYearStartEndFormat(value)

            default:
                break;
        }

    }
    useEffect(() => {
        switch (typeFilter) {
            case TYPE_FILTER.DATE: {
                let time = `${moment().startOf('date').format('YYYY/MM/DD')} ~ ${moment()
                    .endOf('date')
                    .format('YYYY/MM/DD')}`;
                let start = time.slice(0, 10)
                let end = time.slice(13, 23)
                setTimeStart(start)
                setTimeEnd(end)
                break;
            }

            case TYPE_FILTER.WEEK: {
                let time = `${moment().startOf('week').format('YYYY/MM/DD')} ~ ${moment()
                    .endOf('week')
                    .format('YYYY/MM/DD')}`;
                let start = time.slice(0, 10)
                let end = time.slice(13, 23)
                setTimeStart(start)
                setTimeEnd(end)
                break;
            }

            case TYPE_FILTER.MONTH: {
                let time = `${moment().startOf('month').format('YYYY/MM/DD')} ~ ${moment()
                    .endOf('month')
                    .format('YYYY/MM/DD')}`;
                let start = time.slice(0, 10)
                let end = time.slice(13, 23)
                setTimeStart(start)
                setTimeEnd(end)
                break;
            }

            case TYPE_FILTER.QUARTER: {
                let time = `${moment().startOf('quarter').format('YYYY/MM/DD')} ~ ${moment()
                    .endOf('quarter')
                    .format('YYYY/MM/DD')}`;
                let start = time.slice(0, 10)
                let end = time.slice(13, 23)
                setTimeStart(start)
                setTimeEnd(end)
                break;
            }

            case TYPE_FILTER.YEAR: {
                let time = `${moment().startOf('year').format('YYYY/MM/DD')} ~ ${moment()
                    .endOf('year')
                    .format('YYYY/MM/DD')}`;
                let start = time.slice(0, 10)
                let end = time.slice(13, 23)
                setTimeStart(start)
                setTimeEnd(end)
                break;
            }


            default:
                break;
        }
    }, [typeFilter])

    useEffect(() => {
        if(menuTab === MENU_TAB.CHART){
            callApiGetRevenueAndExpenditure()
            callApiGetReportFood()
        }else{
            callApiGetBill()
        }
    }, [timeStart, timeEnd])

    useEffect(() => {
        if(menuTab === MENU_TAB.CHART){
            callApiGetRevenueAndExpenditure()
            callApiGetReportFood()
        }else{
            callApiGetBill()
        }
    }, [menuTab])

    useEffect(() => {
        callApiGetReportFood()
    }, [pageSize])

    function callApiGetRevenueAndExpenditure() {
        dispatch(changeLoadingApp(true))
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;

        if (timeStart != '' && timeEnd != '') {
            let a = (new Date(moment(timeStart).startOf('day').unix() * 1000 - tzoffset)).toISOString().slice(0, -1);
            let b = (new Date(moment(timeEnd).endOf('day').unix() * 1000 - tzoffset)).toISOString().slice(0, -1);
            let param = `?TimeStart=${a}&TimeEnd=${b}&isMonth=${(typeFilter === TYPE_FILTER.QUARTER || typeFilter === TYPE_FILTER.YEAR)}&PageSize=25`;
            baseApi.get(
                (res) => {
                    let data = res?.data?.map((item) => {
                        switch (typeFilter) {
                            case TYPE_FILTER.DATE:
                            case TYPE_FILTER.WEEK:
                            case TYPE_FILTER.MONTH:
                                return ({
                                    ngay: moment(item?.ngay).format('DD/MM/YYYY'),
                                    soThu: item?.soThu,
                                    soChi: item?.soChi

                                })
                            case TYPE_FILTER.QUARTER:
                            case TYPE_FILTER.YEAR:
                                return ({
                                    ngay: moment(item?.ngay).format('MM/YYYY'),
                                    soThu: item?.soThu,
                                    soChi: item?.soChi

                                })

                            default:
                                break;
                        }

                    })
                    setDataLineChart(data)
                    dispatch(changeLoadingApp(false))
                },
                () => {
                    dispatch(changeLoadingApp(false))
                },
                null,
                API_REVENUE_AND_EXPENDITURE.GET + param,
                null,
                {}
            )
        }

    }

    function callApiGetBill() {
        dispatch(changeLoadingApp(true))
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;

        if (timeStart != '' && timeEnd != '') {
            let a = (new Date(moment(timeStart).startOf('day').unix() * 1000 - tzoffset)).toISOString().slice(0, -1);
            let b = (new Date(moment(timeEnd).endOf('day').unix() * 1000 - tzoffset)).toISOString().slice(0, -1);
            let body = {
                "endTime": b,
                "startTime": a,
                "pageNumber": 1,
                "pageSize": 10
              }
            baseApi.post(
                (res) => {
                    setDataBills(res?.data)
                    dispatch(changeLoadingApp(false))
                },
                () => {
                    dispatch(changeLoadingApp(false))
                },
                null,
                API_GET_BILL.GET,
                null,
                body
            )
        }

    }

    function callApiGetReportFood() {
        dispatch(changeLoadingApp(true))
        let tzoffset = (new Date()).getTimezoneOffset() * 60000;

        if (timeStart != '' && timeEnd != '') {
            let a = (new Date(moment(timeStart).startOf('day').unix() * 1000 - tzoffset)).toISOString().slice(0, -1);
            let b = (new Date(moment(timeEnd).endOf('day').unix() * 1000 - tzoffset)).toISOString().slice(0, -1);
            let param = `?TimeStart=${a}&TimeEnd=${b}&isMonth=${(typeFilter === TYPE_FILTER.QUARTER || typeFilter === TYPE_FILTER.YEAR)}&PageSize=${pageSize}`;
            baseApi.get(
                (res) => {
                    let data = res?.data?.map((item) => {
                        switch (typeFilter) {
                            case TYPE_FILTER.DATE:
                            case TYPE_FILTER.WEEK:
                            case TYPE_FILTER.MONTH:
                                return ({
                                    ngay: moment(item?.ngay).format('DD/MM/YYYY'),
                                    soThu: item?.soThu,
                                    soChi: item?.soChi

                                })
                            case TYPE_FILTER.QUARTER:
                            case TYPE_FILTER.YEAR:
                                return ({
                                    ngay: moment(item?.ngay).format('MM/YYYY'),
                                    soThu: item?.soThu,
                                    soChi: item?.soChi

                                })

                            default:
                                break;
                        }

                    })
                    setDataBarChart(data)
                    dispatch(changeLoadingApp(false))
                },
                () => {
                    dispatch(changeLoadingApp(false))
                },
                null,
                API_REPORT_FOOD.GET + param,
                null,
                {}
            )
        }
    }
    function columnTotal(item) {
        return(<div>{commonFunction.numberWithCommas(item?.tongTien) }</div>)
    }

    function columnPromotion(item) {
        return(<div>{commonFunction.numberWithCommas(item?.soTienGiam)}</div>)
    }

    function columnRealMoney(item) {
        return(<div>{commonFunction.numberWithCommas(item?.thucThu)}</div>)
    }

    function columnTime(item) {
        let time = moment(item?.thoiGianThanhToan).format("DD/MM/YYYY")
        return(<div>{time}</div>)
    }


    function convertDataTable(dataTable) {
        let listData;
        listData = dataTable.map((item, idx) => {
          return {
            detail: item,
            // [COLUMN_TABLE_INDEX_MENU.NAME]: columnName(item),
            [COLUMN_TABLE_INDEX_MENU.TOTAL]: columnTotal(item),
            [COLUMN_TABLE_INDEX_MENU.PROMOTION]: columnPromotion(item),
            [COLUMN_TABLE_INDEX_MENU.REAL_MONEY]: columnRealMoney(item),
            [COLUMN_TABLE_INDEX_MENU.TIME]: columnTime(item),
            // [COLUMN_TABLE_INDEX_MENU.STATUS]: columnStatus(item),
            key: idx,
            item
          };
        });
        return [...listData];
      }

    // useEffect(() => {
    //     console.log(dataLineChart)
    // }, [dataLineChart])
    return (
        <AdminPage title={"Báo cáo"} index={MENU_TAB_ADMIN.REPORT}>
            <div className="report-container">
                <div className="report-container__header">
                    <div className={`report-container__header-chart ${menuTab === MENU_TAB.CHART ? 'menu-active' : ''}`}
                        onClick={() => setMenuTab(MENU_TAB.CHART)}
                    >
                        Báo cáo tổng quan
                    </div>
                    <div className={`report-container__header-bill ${menuTab === MENU_TAB.BILL ? 'menu-active' : ''}`}
                        onClick={() => setMenuTab(MENU_TAB.BILL)}
                    >
                        Phiếu thanh toán
                    </div>
                    <div className="report-container__header-filter">
                        <div className="report-container__header-filter-type">
                            <div className={`report-container__header-filter-type-item ${typeFilter === TYPE_FILTER.DATE ? "active" : ''}`}
                                onClick={() => setTypeFilter(TYPE_FILTER.DATE)}
                            >
                                Ngày
                            </div>
                            <div className={`report-container__header-filter-type-item ${typeFilter === TYPE_FILTER.WEEK ? "active" : ''}`}
                                onClick={() => setTypeFilter(TYPE_FILTER.WEEK)}
                            >
                                Tuần
                            </div>
                            <div className={`report-container__header-filter-type-item ${typeFilter === TYPE_FILTER.MONTH ? "active" : ''}`}
                                onClick={() => setTypeFilter(TYPE_FILTER.MONTH)}
                            >
                                Tháng
                            </div>
                            <div className={`report-container__header-filter-type-item ${typeFilter === TYPE_FILTER.QUARTER ? "active" : ''}`}
                                onClick={() => setTypeFilter(TYPE_FILTER.QUARTER)}
                            >
                                Qúy
                            </div>
                            <div className={`report-container__header-filter-type-item ${typeFilter === TYPE_FILTER.YEAR ? "active" : ''}`}
                                onClick={() => setTypeFilter(TYPE_FILTER.YEAR)}
                            >
                                Năm
                            </div>
                        </div>
                        <div className="report-container__header-filter-date">
                            <DatePicker
                                defaultValue={moment()}
                                onChange={(val1, val2, val3) => {
                                    let start = val2.slice(0, 10)
                                    let end = val2.slice(13, 23)
                                    setTimeStart(start.split("/").reverse().join("/"))
                                    setTimeEnd(end.split("/").reverse().join("/"))
                                }}
                                format={getFormatDatePicker}
                                picker={typeFilter}

                            />
                        </div>
                    </div>
                </div>
                <div className="report-container__content">
                    {
                        menuTab === MENU_TAB.CHART &&
                        <div className="report-container__content-chart">
                            <div className="report-container__content-chart-spending">
                                <div className="report-container__content-chart-spending-header">
                                    <div className="report-container__content-chart-spending-header-label">
                                        Biểu đồ thống kê chi tiêu
                                    </div>
                                </div>
                                <div className="report-container__content-chart-spending-content">
                                    {
                                        dataLineChart?.length === 0 ?
                                            <div className="report-container__content-chart-spending-content-nodata">
                                                <img src={noDataimg} height={150} width={150} />
                                            </div>
                                            :
                                            <LineChart width={900} height={300} data={dataLineChart}>
                                                <Line type="monotone" dataKey="soChi" stroke="#8884d8" />
                                                <Line type="monotone" dataKey="soThu" stroke="#10ac84" />
                                                <CartesianGrid stroke="#ccc" />
                                                <XAxis dataKey="ngay" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                            </LineChart>
                                    }

                                </div>
                            </div>

                            <div className="report-container__content-chart-customer">
                                <div className="report-container__content-chart-spending-header">
                                    <div className="report-container__content-chart-spending-header-label">
                                        Biểu đồ thống kê chi tiêu
                                    </div>
                                    <div className="report-container__content-chart-spending-header-filter">
                                        <div className="report-container__content-chart-spending-header-filter-label">
                                            Số lượng món
                                        </div>
                                        <div className="report-container__content-chart-spending-header-filter-input">
                                            <InputField value={pageSize} onChange={(val) => setPageSize(val)} placeholder={"Nhập số lượng món ăn muốn thông kê"} />
                                        </div>
                                    </div>
                                </div>
                                <div className="report-container__content-chart-spending-content">
                                    {
                                        dataBarChart?.length === 0 ?
                                            <div className="report-container__content-chart-spending-content-nodata">
                                                <img src={noDataimg} height={150} width={150} />
                                            </div>
                                            :
                                            <ComposedChart
                                                layout="vertical"
                                                width={500}
                                                height={400}
                                                data={dataBarChart}
                                                margin={{
                                                    top: 20,
                                                    right: 20,
                                                    bottom: 20,
                                                    left: 20
                                                }}
                                            >
                                                <CartesianGrid stroke="#f5f5f5" />
                                                <XAxis type="number" />
                                                <YAxis dataKey="name" type="category" />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                            </ComposedChart>
                                    }

                                </div>
                            </div>
                        </div>
                    }

                    {
                        menuTab === MENU_TAB.BILL &&
                        <div className="report-container__content-bill">
                            <TableBase
                                onChangePagination={(page, pageSize)=>{}}
                                columns={columns}
                                total={dataBills?.length}
                                data={convertDataTable(dataBills)}
                                loading={false}
                                // hasMoreOption
                            // option={OPTION_MORE_TABLE}
                            // setObjectSort={(field, order) => {
                            //     setSortType({
                            //         field: field,
                            //         order: order,
                            //     });
                            // }}
                            />
                        </div>
                    }

                </div>
            </div>
        </AdminPage>
    )
}

export default Report