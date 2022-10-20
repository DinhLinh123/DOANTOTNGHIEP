import * as types from "../constant/spendingsType"
import * as actions from "../action/spendingsAction"
import { takeLatest, put } from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"
import commonFunction from "../../component/base/common/commonFunction"
import { TYPE_MESSAGE } from "../../component/base/common/commonConstant"

function* postDataSpending({ payload }) {

    try {
        const res = yield axios.post(`${URL_API}/ChiTieuTrongNgay`, payload)
        if (res) {
            yield put(actions.postSpendingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.postSpendingFail(error))

    }
}


function* getDataSpending({ payload }) {

    try {
        const res = yield axios.get(`${URL_API}/ChiTieuTrongNgay/filter?_filter={"TextSearch" : "${payload.textSearch}", "NgayHoaDon" : "${payload.textSearchTime}"}`)
        if (res) {
            yield put(actions.getSpendingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getSpendingFail(error))

    }
}

function* deleteDataSpending({ payload }) {

    try {
        const res = yield axios.delete(`${URL_API}/ChiTieuTrongNgay/${payload}`)
        if (res) {
            yield put(actions.deleteSpendingSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa hóa đơn chi tiêu thành công")
        } else {
            commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa hóa đơn chi tiêu thất bại")


        }
    } catch (error) {
        yield put(actions.deleteSpendingFail(error))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa hóa đơn chi tiêu thất bại")
    }
}

function* editDataSpending({ payload }) {

    try {
        const res = yield axios.put(`${URL_API}/ChiTieuTrongNgay/${payload.id}`, payload)
        if (res) {
            yield put(actions.editSpendingSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa chi tiêu thành công")
        } else {
            commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa chi tiêu thất bại")


        }
    } catch (error) {
        yield put(actions.editSpendingFail(error))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Sửa chi tiêu thất bại")
    }
}




export function* watchingSpendings() {
    yield takeLatest(types.POST_SPENDING, postDataSpending)
    yield takeLatest(types.GET_SPENDING, getDataSpending)
    yield takeLatest(types.DELETE_SPENDING, deleteDataSpending)
    yield takeLatest(types.EDIT_SPENDING, editDataSpending)


}
