import React  from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import TableBase from "../../../../base/Table/Table";
import AdminPage from "../AdminPage";

function Menu(props) {

    return (
        <AdminPage 
            title={"Quản lý menu"}
            index={MENU_TAB_ADMIN.MENU}
        >
            <TableBase/>
        </AdminPage>

    )

}
export default Menu