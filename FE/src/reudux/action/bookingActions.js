import * as types from "../constant/bookingType";

//  thêm dữ liệu
export const postBooking = (data) => (
    {

    type : types.POST_BOOKING,
    payload: data
})

export const postBookingSuccess = (data) => ({

    type : types.POST_BOOKING_SUCCESS,
    payload: data
})

export const postBookingFail = (data) => ({

    type : types.POST_BOOKING_FAIL,
    payload: data
})

//  lấy dữ liệu
export const getBooking = () => (
    {

    type : types.GET_BOOKING,
})

export const getBookingSuccess = (data) => (
    {

    type : types.GET_BOOKING_SUCCESS,
    payload: data
})

export const getBookingFail = (data) => (
    {

    type : types.GET_BOOKING_FAIL,
    payload: data
})

// Xóa dữ liêu

export const deleteBooking = (data) => (
    {

    type : types.DELETE_BOOKING,
    payload: data
})

export const deleteBookingSuccess = (data) => (
    {

    type : types.DELETE_BOOKING_SUCCESS,
    payload: data
})

export const deleteBookingFail = (data) => (
    {

    type : types.DELETE_BOOKING_FAIL,
    payload: data
})

// update dữ liệu

export const updateBooking = (data) => (
    {
    type : types.UPDATE_BOOKING,
    payload: data
})

export const updateBookingSuccess = (data) => (
    {

    type : types.DELETE_BOOKING_SUCCESS,
    payload: data
})

export const updateBookingFail = (data) => (
    {

    type : types.DELETE_BOOKING_FAIL,
    payload: data
})

// Tìm dữ liệu

export const searchBooking = (data) => (
    {
    type : types.SEARCH_BOOKING,
    payload: data
})

export const searchBookingSuccess = (data) => (
    {
    type : types.SEARCH_BOOKING_SUCCESS,
    payload: data
})

export const searchBookingFail = (data) => (
    {
    type : types.SEARCH_BOOKING_FAIL,
    payload: data
})
