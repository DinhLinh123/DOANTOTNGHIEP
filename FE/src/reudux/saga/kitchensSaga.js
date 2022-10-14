import * as types from "../constant/kitchensType"
import * as actions from "../action/kitchensAction"
import { takeLatest, put } from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"
import commonFunction from "../../component/base/common/commonFunction"
import { TYPE_MESSAGE } from "../../component/base/common/commonConstant"

function* postDataChickens({ payload }) {

    try {
        const res = yield axios.post(`${URL_API}/PhieuNhapVatTu`, payload)
        if (res) {
            yield put(actions.postChickensSuccess(res.data))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm hóa đơn bếp thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm hóa đơn bếp thất bại")
        }
    } catch (error) {
        yield put(actions.postChickensFail(error))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm hóa đơn bếp thất bại")
    }
}

function* getDataChickens({ payload }) {

    try {
        const res = yield axios.get(`${URL_API}/PhieuNhapVatTu/filter?_filter={"kieu":"Quản lý hóa đơn bếp","TextSearch" : "${payload.textSearch}","NgayHoaDon":"${payload.textSearchTime}"}`)
        if (res) {
            yield put(actions.getChickensSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getChickensFail(error))

    }
}


function* deleteDataKitchens({ payload }) {

    try {
        const res = yield axios.delete(`${URL_API}/PhieuNhapVatTu/${payload}`)
        if (res) {
            yield put(actions.deleteKitchensSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa hóa đơn bếp thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa hóa đơn bếp thất bại")
        }
    } catch (error) {
        yield put(actions.deleteKitchensFail(error))
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa hóa đơn bếp thất bại")


    }
}

function* updateDataKitchens({ payload }) {

    try {
        const res = yield axios.put(`${URL_API}/PhieuNhapVatTu/${payload.id}`, payload)
        if (res) {
            yield put(actions.updateKitchenSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa hóa đơn bếp thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa hóa đơn bếp thất bại")
        }
    } catch (error) {
        yield put(actions.updateKitchenFail(error))
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa hóa đơn bếp thất bại")


    }
}



export function* watchingChickens() {
    yield takeLatest(types.POST_CHICKEN, postDataChickens)
    yield takeLatest(types.GET_CHICKEN, getDataChickens)
    yield takeLatest(types.DELETE_CHICKEN, deleteDataKitchens)
    yield takeLatest(types.EDIT_CHICKEN, updateDataKitchens)
}
