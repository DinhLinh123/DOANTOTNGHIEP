import ACCOUNT_TYPE from '../constant/actionType'


export const changeAccountType = function (
    {
        userName,
        userAvatar,
        roleType
    }
) {
    return {
        type: ACCOUNT_TYPE,
        payload: {
            userName: userName,
            userAvatar: userAvatar,
            roleType: roleType
        }
    };
};