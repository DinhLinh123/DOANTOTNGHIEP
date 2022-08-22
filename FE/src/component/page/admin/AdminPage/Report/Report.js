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
import { API_REVENUEANDEXPENDITURE } from "../../../../base/common/endpoint"
import { changeLoadingApp } from "../../../../../reudux/action/loadingAction"
import { useDispatch } from "react-redux"
import baseApi from "../../../../../api/baseApi"

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
    UNIT: "unit",
    PRICE: "price",
    IMAGE: "image",
    STATUS: "status",
    CATEGORY: "category",
    DESCRIBE: "describe"
};

function Report(props) {
    const dispatch = useDispatch();
    const [menuTab, setMenuTab] = useState(MENU_TAB.CHART)
    const [typeFilter, setTypeFilter] = useState(TYPE_FILTER.DATE)
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const columns = [
        {
            title: "Tên",
            dataIndex: COLUMN_TABLE_INDEX_MENU.NAME,
            sorter: true,
            width: "200px",
        },
        {
            title: "Đơn vị tính",
            dataIndex: COLUMN_TABLE_INDEX_MENU.UNIT,
            //sorter: true,
            width: "200px",
        },
        {
            title: "Thể loại",
            dataIndex: COLUMN_TABLE_INDEX_MENU.CATEGORY,
            width: "200px",
        },
        {
            title: "Giá tiền",
            dataIndex: COLUMN_TABLE_INDEX_MENU.PRICE,
            width: "200px",
            sorter: true
        },
        {
            title: "Trạng thái",
            dataIndex: COLUMN_TABLE_INDEX_MENU.STATUS,
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
        callApiGetRevenueAndExpenditure()
    }, [timeStart, timeEnd])

    function callApiGetRevenueAndExpenditure() {
        dispatch(changeLoadingApp(true))
        console.log(timeStart)
        console.log(timeEnd)
    let param = {
      "TimeStart": moment(timeStart).toISOString(),
      "TimeEnd": moment(timeEnd).toISOString(),
      "isMonth": (typeFilter === TYPE_FILTER.QUARTER || typeFilter === TYPE_FILTER.YEAR),
    }
    console.log(param)
    baseApi.get(
      (res) => {
        dispatch(changeLoadingApp(false))
      },
      () => {
        dispatch(changeLoadingApp(false))
      },
      null,
      API_REVENUEANDEXPENDITURE.GET + encodeURIComponent(JSON.stringify(param)),
      null,
      {}
    )
    }
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
                                <div className="report-container__content-chart-spending-label">
                                    Biểu đồ thống kê chi tiêu
                                </div>
                                <div className="report-container__content-chart-spending-content">
                                    <LineChart width={900} height={300} data={data}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="pv" stroke="#10ac84" />
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                    </LineChart>
                                </div>
                            </div>

                            <div className="report-container__content-chart-customer">
                                <div className="report-container__content-chart-spending-label">
                                    Biểu đồ thống kê món được gọi nhiều nhất
                                </div>
                                <div className="report-container__content-chart-spending-content">
                                    <ComposedChart
                                        layout="vertical"
                                        width={500}
                                        height={400}
                                        data={data}
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
                                </div>
                            </div>
                        </div>
                    }

                    {
                        menuTab === MENU_TAB.BILL &&
                        <div className="report-container__content-bill">
                            <TableBase
                                // onChangePagination={(page, pageSize)=>{}}
                                columns={columns}
                                // total={dataTotal}
                                // data={convertDataTable(dataTable)}
                                // loading={false}
                                hasMoreOption
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