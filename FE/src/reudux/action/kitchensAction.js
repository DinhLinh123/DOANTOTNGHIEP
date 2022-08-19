import * as types from "../constant/kitchensType"

// 
export const postChickens = (data) => ({

    type: types.POST_CHICKEN,
    payload: data
})

export const postChickensSuccess = (data) => ({

    type: types.POST_CHICKEN_SUCCESS,
    payload: data
})


export const postChickensFail = (data) => ({

    type: types.POST_CHICKEN_FAIL,
    payload: data
})

// 
export const getChickens = () => ({

    type: types.GET_CHICKEN
})

export const getChickensSuccess = (data) => ({

    type: types.GET_CHICKEN_SUCCESS,
    payload: data
})

export const getChickensFail = (data) => ({

    type: types.GET_CHICKEN_FAIL,
    payload: data
})

// 
export const deleteKitchens = (data) => ({

    type: types.DELETE_CHICKEN,
    payload: data
})

export const deleteKitchensSuccess = (data) => ({

    type: types.DELETE_CHICKEN_SUCCESS,
    payload: data
})

export const deleteKitchensFail = (data) => ({

    type: types.DELETE_CHICKEN_FAIL,
    payload: data
})



