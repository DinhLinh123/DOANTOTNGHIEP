import React from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";

function Bar(props) {

    return (
        <AdminPage
            title={"Quản lý bar"}
            index={MENU_TAB_ADMIN.BAR}
        >
            Quản lý bar
        </AdminPage>
    )

}
export default Bar