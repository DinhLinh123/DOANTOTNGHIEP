import * as types from "../constant/feedbackType"
import * as actions from "../action/feedbackAction"
import { takeLatest, put } from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"
import commonFunction from "../../component/base/common/commonFunction"
import { TYPE_MESSAGE } from "../../component/base/common/commonConstant"

function* postDataFeedback({ payload }) {

    try {
        const res = yield axios.post(`${URL_API}/YKienDongGop`, payload)
        if (res) {
            yield put(actions.postFeedbackSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.postFeedbackFail(error))

    }
}

function* getDataFeedback() {

    try {
        const res = yield axios.get(`${URL_API}/YKienDongGop`)
        if (res) {
            yield put(actions.getFeedbackSuccess(res))
        }
    } catch (error) {
        yield put(actions.getFeedbackFail(error))

    }

}

function* searchDataFeedback({ payload }) {

    try {
        const res = yield axios.get(`${URL_API}/YKienDongGop/filter?_filter={"TextSearch":"${payload}"}`)
        if (res) {

            yield put(actions.searchFeedbackSuccess(res))
        }
    } catch (error) {

        yield put(actions.searchFeedbackFail(error))
    }
}

function* deleteDataFeedback({ payload }) {

    try {
        const res = yield axios.delete(`${URL_API}/YKienDongGop/${payload}`)
        if (res) {

            yield put(actions.deleteFeedbackSuccess(payload))
            commonFunction.messages(TYPE_MESSAGE.SUCCESS, "Xóa phản hồi thành công")
        }
    } catch (error) {

        yield put(actions.deleteFeedbackFail(error))
        commonFunction.messages(TYPE_MESSAGE.ERROR, "Xóa phản hồi thất bại")
    }
}

export function* watchingFeedback() {
    yield takeLatest(types.POST_FEEDBACK, postDataFeedback)
    yield takeLatest(types.GET_FEEDBACK, getDataFeedback)
    yield takeLatest(types.SEARCH_FEEDBACK, searchDataFeedback)
    yield takeLatest(types.DELETE_FEEDBACK, deleteDataFeedback)
}
