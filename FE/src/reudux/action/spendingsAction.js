import * as types from "../constant/spendingsType"

export const postSpending = (data) => ({

    type: types.POST_SPENDING,
    payload: data
})

export const postSpendingSuccess = (data) => ({

    type: types.POST_SPENDING_SUCCESS,
    payload: data
})


export const postSpendingFail = (data) => ({

    type: types.POST_SPENDING_FAIL,
    payload: data
})

// lấy dữ liệu

export const getSpending = () => ({

    type: types.GET_SPENDING
})

export const getSpendingSuccess = (data) => ({

    type: types.GET_SPENDING_SUCCESS,
    payload: data
})

export const getSpendingFail = (data) => ({

    type: types.GET_SPENDING_FAIL,
    payload: data
})