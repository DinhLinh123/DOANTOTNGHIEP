const PART = "http://sqldemo-001-site1.htempurl.com/api"
const API_TABLE = {
    GET_ALL: PART + "/Ban",
    ALL_NEW: PART + "/Ban",
    GET_BY_ID: PART + "/Ban/",
    UPDATE_BY_ID: PART + "/Ban/",
    DELETE_BY_ID: PART + "/Ban/",
    GET_BY_FILTER: PART + "/Ban/filter?_filter=",
};

const API_AREA = {
    UPDATE_BY_ID: PART + "/KhuVuc/",
    GET_ALL: PART + "/KhuVuc",
    GET_BY_ID: PART + "/KhuVuc/",
    DELETE_BY_ID: PART + "/KhuVuc/",
    GET_BY_FILTER: PART + "/KhuVuc/filter?_filter=",
};

const API_MENU = {
    GET_ALL: PART + "/DoAn",
    CREATE_NEW: PART + "/DoAn",
    GET_BY_ID: PART + "/DoAn/",
    GET_BY_FILTER: PART + "/DoAn/filter?_filter=",
};

const API_TYPE_FOOD = {
    GET_ALL: PART + "/TheLoaiMonAn",
    CREATE_NEW: PART + "/TheLoaiMonAn",
    GET_BY_ID: PART + "/TheLoaiMonAn/"
};

export {
    API_TABLE,
    API_AREA,
    API_MENU,
    API_TYPE_FOOD
};
