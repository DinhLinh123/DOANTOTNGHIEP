import React from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";

function Book(props) {

    return (
        <AdminPage
            title={"Quản lý đặt bàn"}
            index={MENU_TAB_ADMIN.BOOK}
        >
            Quản lý đặt bàn
        </AdminPage>

    )

}
export default Book