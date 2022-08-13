import * as types from "../constant/feedbackType"
import * as actions from "../action/feedbackAction"
import {takeLatest, put} from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"

function * postDataFeedback({payload}){

    try {
        const res = yield axios.post(`${URL_API}/YKienDongGop`, payload)
        if(res){
            yield put(actions.postFeedbackSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.postFeedbackFail(error))
        
    }
}

function * getDataFeedback(){

    try {
        const res = yield axios.get(`${URL_API}/YKienDongGop`)
        console.log("res", res);
        if(res){
            yield put(actions.getFeedbackSuccess(res))
        }
    } catch (error) {
        yield put(actions.getFeedbackFail(error))
        
    }

}

export function * watchingFeedback(){
    yield takeLatest(types.POST_FEEDBACK, postDataFeedback)
    yield takeLatest(types.GET_FEEDBACK, getDataFeedback)

}
