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
