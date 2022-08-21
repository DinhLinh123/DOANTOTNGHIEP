import { DatePicker } from "antd"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant"
import AdminPage from "../AdminPage"
import './report.scss'
import { LineChart, BarChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import $ from "jquery";
import TableBase from "../../../../base/Table/Table"
import Dropdown from "../../../../base/Dropdown/Dropdown"

const MENU_TAB = {
    CHART: "chart",
    BILL: 'bill'
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
    const [menuTab, setMenuTab] = useState(MENU_TAB.CHART)

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
                        <Dropdown/>
                        {/* <RangePicker
                          value={hackValue || value}
                          disabledDate={disabledDate}
                          onCalendarChange={val => setDates(val)}
                          onChange={val => setValue(val)}
                          onOpenChange={onOpenChange}
                        /> */}
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