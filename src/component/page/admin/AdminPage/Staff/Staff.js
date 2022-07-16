import React  from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";

function Staff (props) {

    return (
        <AdminPage 
            title={"Quản lý nhân viên"}
            index={MENU_TAB_ADMIN.STAFF}
        >
            Quản lý nhân viên
        </AdminPage>

    )

}
export default Staff