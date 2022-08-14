import * as types from "../constant/spendingsType"
import * as actions from "../action/spendingsAction"
import {takeLatest, put} from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"

function * postDataSpending({payload}){

    try {
        const res = yield axios.post(`${URL_API}/ChiTieuTrongNgay`, payload)
        if(res){
            yield put(actions.postSpendingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.postSpendingFail(error))
        
    }
}


function * getDataSpending(){

    try {
        const res = yield axios.get(`${URL_API}/ChiTieuTrongNgay`)
        if(res){
            yield put(actions.getSpendingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getSpendingFail(error))
        
    }
}



export function * watchingSpendings(){
    yield takeLatest(types.POST_SPENDING, postDataSpending)
    yield takeLatest(types.GET_SPENDING, getDataSpending)
}
