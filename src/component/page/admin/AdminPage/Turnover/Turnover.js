import React from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";

function Turnover(props) {

    return (
        <AdminPage
            title={"Quản lý doanh thu"}
            index={MENU_TAB_ADMIN.TURNOVER}
        >
            Quản lý doanh thu
        </AdminPage>

    )

}
export default Turnover