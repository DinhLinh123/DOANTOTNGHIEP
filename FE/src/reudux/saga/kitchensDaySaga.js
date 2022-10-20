import * as types from "../constant/kitchensDayType"
import * as actions from "../action/kitchensDayAction"
import { takeLatest, put } from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"
import commonFunction from "../../component/base/common/commonFunction"
import { TYPE_MESSAGE } from "../../component/base/common/commonConstant"

function* postDataKitchensDay({ payload }) {

    try {
        const res = yield axios.post(`${URL_API}/PhieuNhapVatTu`, payload)
        if (res) {
            yield put(actions.postKitChensDaySuccess(res.data))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm hóa đơn bếp thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm hóa đơn bếp thất bại")
        }
    } catch (error) {
        yield put(actions.postKitChensDayFail(error))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Thêm hóa đơn bếp thất bại")
    }
}

function* getDatakitChensDay() {

    try {
        const res = yield axios.get(`${URL_API}/PhieuNhapVatTu/filter?_filter={"kieu":"Yêu cầu nguyên liệu"}`)
        if (res) {
            yield put(actions.getKitChensDaySuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getKitChensDayFail(error))

    }
}


function* deleteDataKitchensDay({ payload }) {

    try {
        const res = yield axios.delete(`${URL_API}/PhieuNhapVatTu/${payload}`)
        if (res) {
            yield put(actions.deleteKitChensDaySuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa yêu cầu nguyên liệu thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa yêu cầu nguyên liệu thất bại")
        }
    } catch (error) {
        yield put(actions.deleteKitChensDayFail(error))
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa yêu cầu nguyên liệu thất bại")


    }
}

function* updateDataKitchensDay({ payload }) {

    try {
        const res = yield axios.put(`${URL_API}/PhieuNhapVatTu/${payload.id}`, payload.body)
        if (res) {
            yield put(actions.updateKitChensDaySuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa hóa đơn bếp thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa hóa đơn bếp thất bại")
        }
    } catch (error) {
        yield put(actions.updateKitChensDayFail(error))
        commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa hóa đơn bếp thất bại")


    }
}


export function* watchingKitchensDay() {
    yield takeLatest(types.POST_KITCHEN_DAY, postDataKitchensDay)
    yield takeLatest(types.GET_KIETCHEN_DAY, getDatakitChensDay)
    yield takeLatest(types.DELETE_KITCHEN_DAY, deleteDataKitchensDay)
    yield takeLatest(types.UPDATE_KITCHEN_DAY, updateDataKitchensDay)
}
