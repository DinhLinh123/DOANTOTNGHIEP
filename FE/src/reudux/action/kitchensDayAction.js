import * as types from "../constant/kitchensDayType"

export const getKitChensDay = (data) => ({

    type: types.GET_KIETCHEN_DAY,
    payload: data
})

export const getKitChensDaySuccess = (data) => ({

    type: types.GET_KIETCHEN_DAY_SUCCESS,
    payload: data
})

export const getKitChensDayFail = (data) => ({

    type: types.GET_KIETCHEN_DAY_FAIL,
    payload: data
})

// 

export const postKitChensDay = (data) => ({

    type: types.POST_KITCHEN_DAY,
    payload: data
})

export const postKitChensDaySuccess = (data) => ({

    type: types.POST_KITCHEN_DAY_SUCCESS,
    payload: data
})

export const postKitChensDayFail = (data) => ({

    type: types.POST_KITCHEN_DAY_FAIL,
    payload: data
})

// 

export const deleteKitChensDay = (data) => ({

    type: types.DELETE_KITCHEN_DAY,
    payload: data
})

export const deleteKitChensDaySuccess = (data) => ({

    type: types.DELETE_KITCHEN_DAY_SUCCESS,
    payload: data
})

export const deleteKitChensDayFail = (data) => ({

    type: types.DELETE_KITCHEN_DAY_FAIL,
    payload: data
})

// 

export const updateKitChensDay = (data) => ({

    type: types.UPDATE_KITCHEN_DAY,
    payload: data
})

export const updateKitChensDaySuccess = (data) => ({

    type: types.UPDATE_KITCHEN_DAY_SUCCESS,
    payload: data
})

export const updateKitChensDayFail = (data) => ({

    type: types.UPDATE_KITCHEN_DAY_FAIL,
    payload: data
})


