const PART = "http://sqldemo-001-site1.htempurl.com/api"
const API_TABLE = {
    GET_ALL: PART + "/Ban",
    GET_BY_ID: PART + "/Ban/"
};

const API_AREA = {
    GET_ALL: PART + "/KhuVuc",
    GET_BY_ID: PART + "/KhuVuc/"
};

const API_MENU = {
    GET_ALL: PART + "/DoAn",
    CREATE_NEW: PART + "/DoAn",
    GET_BY_ID: PART + "/DoAn/"
};

export {
    API_TABLE,
    API_AREA,
    API_MENU
};
