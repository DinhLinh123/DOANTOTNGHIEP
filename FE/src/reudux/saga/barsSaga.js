
import * as types from "../constant/barsType"
import * as actions from "../action/barsAction"
import { takeLatest, put } from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"
import commonFunction from "../../component/base/common/commonFunction"
import { TYPE_MESSAGE } from "../../component/base/common/commonConstant"

function* getDataBars({payload}) {

    try {
        const res = yield axios.get(`${URL_API}/Bars/filter?_filter={"PageSize":"10","TextSearch":"${payload.textSearch}"}`)
        if (res) {
            yield put(actions.getBarsSuccess(res))
        }
    } catch (error) {
        yield put(actions.getBarsFail(error))

    }

}

function* postDataBars({ payload }) {

    try {
        const res = yield axios.post(`${URL_API}/Bars`, payload)
        if (res) {
            yield put(actions.postBarsSuccess(res))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm mới thất bại")
        }
    } catch (error) {
        yield put(actions.postBarsFail(error))

    }

}

function* deleteDataBars({ payload }) {

    try {
        const res = yield axios.delete(`${URL_API}/Bars/${payload}`)
        if (res) {
            yield put(actions.deleteBarsSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa thất bại")
        }
    } catch (error) {
        yield put(actions.deleteBarsFail(error))

    }

}

function* updateDataBars({ payload }) {

    try {
        const res = yield axios.put(`${URL_API}/Bars/${payload.id}`, payload.body)
        if (res) {
            yield put(actions.updateBarsSuccess(res))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa thành công")
        }
        else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa thất bại")
        }
    } catch (error) {
        yield put(actions.updateBarsFail(error))

    }

}


export function* watchingBars() {

    yield takeLatest(types.GET_BARS, getDataBars)
    yield takeLatest(types.POST_BARS, postDataBars)
    yield takeLatest(types.DELETE_BARS, deleteDataBars)
    yield takeLatest(types.UPDATE_BARS, updateDataBars)

}
