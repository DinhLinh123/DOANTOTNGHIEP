import * as types from "../constant/feedbackType"

export const postFeedback = (data) => ({

    type: types.POST_FEEDBACK,
    payload: data
})

export const postFeedbackSuccess = (data) => ({

    type: types.POST_FEEDBACK_SUCCESS,
    payload: data
})

export const postFeedbackFail = (data) => ({

    type: types.POST_FEEDBACK_FAIL,
    payload: data
})

// lấy dữ liệu
export const getFeedback = () => ({

    type: types.GET_FEEDBACK,
})

export const getFeedbackSuccess = (data) => ({

    type: types.GET_FEEDBACK_SUCCESS,
    payload: data
})

export const getFeedbackFail = (data) => ({

    type: types.GET_FEEDBACK_FAIL,
    payload: data

})

// tìm kiếm
export const searchFeedback = (data) => ({

    type: types.SEARCH_FEEDBACK,
    payload: data
})

export const searchFeedbackSuccess = (data) => ({

    type: types.SEARCH_FEEDBACK_SUCCESS,
    payload: data
})

export const searchFeedbackFail = (data) => ({

    type: types.SEARCH_FEEDBACK_FAIL,
    payload: data
})

// Xóa
export const deleteFeedback = (data) => ({

    type: types.DELETE_FEEDBACK,
    payload: data
})

export const deleteFeedbackSuccess = (data) => ({

    type: types.DELETE_FEEDBACK_SUCCESS,
    payload: data
})

export const deleteFeedbackFail = (data) => ({

    type: types.DELETE_FEEDBACK_FAIL,
    payload: data
})

