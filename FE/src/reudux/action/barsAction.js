import * as types from "../constant/barsType"

export const getBars = (data) => ({

    type: types.GET_BARS,
    payload: data
})

export const getBarsSuccess = (data) => ({

    type: types.GET_BARS_SUCCESS,
    payload: data
})

export const getBarsFail = (data) => ({

    type: types.GET_BARS_FAIL,
    payload: data
})

// 
export const postBars = (data) => ({

    type: types.POST_BARS,
    payload: data
})

export const postBarsSuccess = (data) => ({

    type: types.POST_BARS_SUCCESS,
    payload: data
})

export const postBarsFail = (data) => ({

    type: types.POST_BARS_FAIL,
    payload: data
})

// 
export const deleteBars = (data) => ({

    type: types.DELETE_BARS,
    payload: data
})

export const deleteBarsSuccess = (data) => ({

    type: types.DELETE_BARS_SUCCESS,
    payload: data
})
export const deleteBarsFail = (data) => ({

    type: types.DELETE_BARS_FAIL,
    payload: data
})

// 

export const updateBars = (data) => ({

    type: types.UPDATE_BARS,
    payload: data
})

export const updateBarsSuccess = (data) => ({

    type: types.UPDATE_BARS_SUCCESS,
    payload: data
})

export const updateBarsFail = (data) => ({

    type: types.UPDATE_BARS_FAIL,
    payload: data
})






