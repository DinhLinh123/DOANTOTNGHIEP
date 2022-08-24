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
    UPDATE_BY_ID: PART + "/DoAn/",
    GET_BY_FILTER: PART + "/DoAn/filter?_filter=",
};

const API_PROMOTION = {
    GET_ALL: PART + "/UuDai",
    CREATE_NEW: PART + "/UuDai",
    GET_BY_ID: PART + "/UuDai/",
    GET_BY_FILTER: PART + "/UuDai/filter?_filter=",
    UPDATE_BY_ID: PART + "/UuDai/",
    DELETE_BY_ID: PART + "/UuDai/",
};

const API_TYPE_FOOD = {
    GET_ALL: PART + "/TheLoaiMonAn",
    CREATE_NEW: PART + "/TheLoaiMonAn",
    GET_BY_ID: PART + "/TheLoaiMonAn/",
    UPDATE_BY_ID: PART + "/TheLoaiMonAn/",
    DELETE_BY_ID: PART + "/TheLoaiMonAn/",
};

const API_CATEGORY_MENU = {
    UPDATE_BY_ID: PART + "/TheLoaiMonAn/",
    GET_ALL: PART + "/TheLoaiMonAn",
    GET_BY_ID: PART + "/TheLoaiMonAn/",
    DELETE_BY_ID: PART + "/TheLoaiMonAn/",
    GET_BY_FILTER: PART + "/TheLoaiMonAn/filter?_filter=",
};

const API_ORDER = {
    GET_ALL: PART + "/PhieuOder",
    CREATE_NEW: PART + "/PhieuOder",
    GET_BY_ID_TABLE: PART + "/PhieuOder/findbyidban/",
    UPDATE_BY_ID: PART + "/PhieuOder/",
    DELETE_BY_ID: PART + "/PhieuOder/",
    GET_BY_FILTER: PART + "/PhieuOder/filter?_filter=",
};

const API_OFFER = {
    GET_ALL: PART + "/UuDai",
    CREATE_NEW: PART + "/UuDai",
    GET_BY_ID: PART + "/UuDai/",
    UPDATE_BY_ID: PART + "/UuDai/",
    DELETE_BY_ID: PART + "/UuDai/",
    GET_BY_FILTER: PART + "/UuDai/filter?_filter=",
};

const API_REVENUE_AND_EXPENDITURE = {
    GET: PART +  '/BaoCaoThongKe/thuchi/'
};

const API_REPORT_FOOD = {
    GET: PART +  '/BaoCaoThongKe/monan/'
};


export {
    API_TABLE,
    API_AREA,
    API_MENU,
    API_TYPE_FOOD,
    API_CATEGORY_MENU,
    API_PROMOTION,
    API_ORDER,
    API_OFFER,
    API_REVENUE_AND_EXPENDITURE,
    API_REPORT_FOOD
};
