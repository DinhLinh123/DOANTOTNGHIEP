import React  from "react";
import { MENU_TAB_ADMIN } from "../../../../base/common/commonConstant";
import AdminPage from "../AdminPage";

function Area(props) {

    return (
        <AdminPage
            title={"Quản lý khu vực"}
            index={MENU_TAB_ADMIN.AREA}
        >
            <div style={{backgroundColor: 'red'}}>dsdfsdfsadfasd</div>
        </AdminPage>

    )

}
export default Area