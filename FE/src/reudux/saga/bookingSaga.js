import * as types from "../constant/bookingType"
import * as actions from "../action/bookingActions"
import { takeLatest, put } from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"
import commonFunction from "../../component/base/common/commonFunction"
import { TYPE_MESSAGE } from "../../component/base/common/commonConstant"

function* postDataBooking({ payload }) {

    try {
        const res = yield axios.post(`${URL_API}/DatBan`, payload)
        if (res) {
            yield put(actions.postBookingSuccess(res.data))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm mới đặt bàn thành công")
        } else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Thêm mới đặt bàn thất bại")
        }
    } catch (error) {
        yield put(actions.postBookingFail(error))

    }

}

function* getBooking({ payload }) {

    const filterData = payload?.textSearch === "" && payload?.ngayCheckIn === "" ? "" : `filter?_filter={"TextSearch": "${payload.textSearch}","GioDen":"${payload.ngayCheckIn}"}`;
    try {
        const res = yield axios.get(`${URL_API}/DatBan/${filterData}`)
        if (res) {
            yield put(actions.getBookingSuccess(res))
        }
    } catch (error) {
        yield put(actions.getBookingFail(error))

    }

}

function* deleteDataBooking({ payload }) {

    try {
        const res = yield axios.delete(`${URL_API}/DatBan/${payload}`)
        if (res) {
            yield put(actions.deleteBookingSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa đặt bàn thành công")

        } else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa đặt bàn thất bại")

        }
    } catch (error) {
        yield put(actions.deleteBookingFail(error))
    }

}

function* updateDataBooking({ payload }) {

    try {
        const res = yield axios.put(`${URL_API}/DatBan/${payload.id}`, payload)
        if (res) {
            yield put(actions.updateBookingSuccess(res))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa đặt bàn thành công")
        } else {
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Sửa đặt bàn thất bại")
        }
    } catch (error) {
        yield put(actions.updateBookingFail(error))
    }
}

function* searchDataBooking({ payload }) {

    try {
        const res = yield axios.get(`${URL_API}/DatBan/filter?_filter={"TextSearch":"${payload}"}`)
        if (res) {
            yield put(actions.searchBookingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.searchBookingFail(error))
    }
}

function* getTable() {

    try {
        const res = yield axios.get(`${URL_API}/PhieuOder`)
        if (res) {
            yield put(actions.getTableSuccess(res))
        }
    } catch (error) {
        yield put(actions.getTableFail(error))

    }

}


function* editTable({ payload }) {

    try {
        const res = yield axios.put(`${URL_API}/PhieuOder/${payload.id}`, payload)
        if (res) {
            yield put(actions.editTableSuccess(res))
        }
    } catch (error) {
        yield put(actions.editTableFail(error))

    }

}

export function* watchingBooking() {
    yield takeLatest(types.POST_BOOKING, postDataBooking)
    yield takeLatest(types.GET_BOOKING, getBooking)
    yield takeLatest(types.DELETE_BOOKING, deleteDataBooking)
    yield takeLatest(types.UPDATE_BOOKING, updateDataBooking)
    yield takeLatest(types.SEARCH_BOOKING, searchDataBooking)
    yield takeLatest(types.GET_TABLE, getTable)
    yield takeLatest(types.EDIT_TABLE, editTable)

}
