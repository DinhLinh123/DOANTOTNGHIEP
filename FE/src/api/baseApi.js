import axiosClient from './axiosClient'

//lekhoe
const generateQueryParam = function (objParam) {
    if (objParam) {
        let keys = Object.keys(objParam);
        if (keys.length > 0) {
            let query = '?';
            for (let i; i < keys.length; i++) {
                if (objParam[keys[i]] != null && objParam[keys[i]] != '') {
                    if (query.length > 1) {
                        query += '&';
                    }
                    query = query + keys[i] + '=' + objParam[keys[i]];
                }
            }
            if(query === '?') return '';
            return query;
        }
    }
    return '';
}

const baseApi = {
    post: async function (onSuccess, onFailure, beforeExcute, endPoint, queryParam, body, config) {
        if (beforeExcute) beforeExcute()
        try {
            let response = await axiosClient.post(
                endPoint + generateQueryParam(queryParam),
                body,
                config
            );
            if(onSuccess) onSuccess(response);
            return response;
        } catch (ex) {
            if(onFailure) onFailure(ex)
            throw ex
        }
    },

    put: async function (onSuccess, onFailure, beforeExcute, endPoint, queryParam, body, config) {
        if (beforeExcute) beforeExcute()
        try {
            let response = await axiosClient.put(
                endPoint + generateQueryParam(queryParam),
                body,
                config
            );
            if(onSuccess) onSuccess(response);
            return response;
        } catch (ex) {
            if(onFailure) onFailure(ex)
            throw ex
        }
    },

    get: async function (onSuccess, onFailure, beforeExcute, endPoint, queryParam, body, config) {
        if (beforeExcute) beforeExcute()
        try {
            let response = await axiosClient.get(
                endPoint + generateQueryParam(queryParam),
                body,
                config
            );
            if(onSuccess) onSuccess(response);
            return response;
        } catch (ex) {
            if(onFailure) onFailure(ex)
            throw ex
        }
    },

    delete: async function (onSuccess, onFailure, beforeExcute, endPoint, queryParam, body, config) {
        if (beforeExcute ) beforeExcute()
        try {
            let response = await axiosClient.delete(
                endPoint + generateQueryParam(queryParam),
                body,
                config
            );
            if(onSuccess) onSuccess(response);
            return response;
        } catch (ex) {
            if(onFailure) onFailure(ex)
            throw ex
        }
    },
}

export default baseApi