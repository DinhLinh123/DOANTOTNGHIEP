import * as types from "../constant/staff"

export const postStaff = (data) => ({

    type: types.POST_STAFF,
    payload: data
})

export const postStaffSuccess = (data) => ({

    type: types.POST_STAFF_SUCCESS,
    payload: data
})

export const postStaffFail = (data) => ({

    type: types.POST_STAFF_FAIL,
    payload: data
})

// 
export const getStaff = () => ({

    type: types.GET_STAFF
})

export const getStaffSuccess = (data) => ({

    type: types.GET_STAFF_SUCCESS,
    payload: data
})

export const getStaffFail = (data) => ({

    type: types.GET_STAFF_FAIL,
    payload: data
})

// xóa dữ liệu
export const deleteStaff = (data) => ({

    type: types.DELETE_STAFF,
    payload: data
})

export const deleteStaffSuccess = (data) => ({

    type: types.DELETE_STAFF_SUCCESS,
    payload: data
})

export const deleteStaffFail = (data) => ({

    type: types.DELETE_STAFF_FAIL,
    payload: data
})

// update dữ liệu
export const updateStaff = (data) => ({

    type: types.UPDATE_STAFF,
    payload: data
})
export const updateStaffSuccess = (data) => ({

    type: types.UPDATE_STAFF_SUCCESS,
    payload: data
})
export const updateStaffFail = (data) => ({

    type: types.UPDATE_STAFF_FAIL,
    payload: data
})





