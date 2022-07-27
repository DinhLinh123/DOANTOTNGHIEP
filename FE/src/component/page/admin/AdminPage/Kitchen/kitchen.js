import React  from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";

function Kitchen (props) {

    return (
        <AdminPage 
            title={"Quản lý bếp"}
            index={MENU_TAB_ADMIN.KITCHEN}
        >
            Quản lý bếp
        </AdminPage>

    )

}
export default Kitchen