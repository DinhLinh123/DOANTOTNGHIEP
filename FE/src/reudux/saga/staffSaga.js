import * as types from "../constant/staff"
import * as actions from "../action/staffAction"
import {takeLatest, put} from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"

function * postDataStaff({payload}){

    try {
        const res = yield axios.post(`${URL_API}/User`, payload)
        if(res){
            yield put(actions.postStaffSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.postStaffFail(error))
        
    }
}

function * getDataStaff(){

    try {
        const res = yield axios.get(`${URL_API}/User`)
        if(res){
            yield put(actions.getStaffSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.getStaffFail(error))
        
    }
}

function * deleteDataStaff({payload}){

    try {
        const res = yield axios.delete(`${URL_API}/User/${payload}`)
        if(res){
            yield put(actions.deleteStaffSuccess(payload))
        }
    } catch (error) {
        yield put(actions.deleteStaffFail(error))
        
    }
}

function * updateDataStaff({payload}){

    try {
        const res = yield axios.put(`${URL_API}/User/${payload.id}`, payload.body)
        if(res){
            yield put(actions.updateStaffSuccess(payload))
        }
    } catch (error) {
        yield put(actions.updateStaffFail(error))
        
    }
}





export function * watchingStaffs(){
    yield takeLatest(types.POST_STAFF, postDataStaff)
    yield takeLatest(types.GET_STAFF, getDataStaff)
    yield takeLatest(types.DELETE_STAFF, deleteDataStaff)
    yield takeLatest(types.UPDATE_STAFF, updateDataStaff)


}
