import * as types from "../constant/bookingType"
import * as actions from "../action/bookingActions"
import {takeLatest, put} from "redux-saga/effects"
import axios from "axios"
import { URL_API } from "../../utils/urpapi"

function * postDataBooking({payload}){

    try {
        const res = yield axios.post(`${URL_API}/DatBan`, payload)
        console.log("Thêm bàn", res);
        if(res){
            yield put(actions.postBookingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.postBookingFail(error))
        console.log("error", error);
        
    }

}

function * getBooking(){
    
    try {
        const res = yield axios.get(`${URL_API}/DatBan`)
        console.log("resss" ,res);
        if(res){
            yield put(actions.getBookingSuccess(res))
        }
    } catch (error) {
        yield put(actions.getBookingFail(error))
        console.log("error", error);
        
    }

}

function * deleteDataBooking({payload}){

    try {
        const res = yield axios.delete(`${URL_API}/DatBan/${payload}`)
        if(res){
            yield put(actions.deleteBookingSuccess(payload))
        }
    } catch (error) {
        yield put(actions.deleteBookingFail(error))        
    }

}

function * updateDataBooking({payload}){

    try {
        const res = yield axios.put(`${URL_API}/DatBan/${payload.id}`, payload.body)
        if(res){
            yield put(actions.updateBookingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.updateBookingFail(error))        
    }
}

function * searchDataBooking({payload}){

    try {
        const res = yield axios.get(`${URL_API}/DatBan/filter?_filter={"TextSearch":"${payload}"}`)
        if(res){
            yield put(actions.searchBookingSuccess(res.data))
        }
    } catch (error) {
        yield put(actions.searchBookingFail(error))        
    }
}


export function * watchingBooking(){
    yield takeLatest(types.POST_BOOKING, postDataBooking)
    yield takeLatest(types.GET_BOOKING, getBooking)
    yield takeLatest(types.DELETE_BOOKING, deleteDataBooking)
    yield takeLatest(types.UPDATE_BOOKING, updateDataBooking)
    yield takeLatest(types.SEARCH_BOOKING, searchDataBooking)




}
