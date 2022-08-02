const COLOR = "#01a3a4";
const COLOR_MENU_ADMIN = "#fff";
const BACKGROUND_MENU_ADMIN = "#01a3a4";
const MENU_TAB_CLIENT = {
  HOME_PAGE: "home",
  INTRODUCE: "INTRODUCE",
  BOOKING: "booking",
  OFFER: "offer",
  FEEDBACK: "feedback",
  CONTACT: "contact",
};

const MENU_TAB_ADMIN = {
  MENU: "menus",
  AREA: "areas",
  BAR: "bars",
  BAR_INSERT: "bar-insert",
  BOOK: "books",
  KITCHEN: "kitchens",
  KITCHEN_DAY: "kitchens-days",
  SPENDING: "spendings",
  SPENDINGDETAIL: "spendingDetails",
  STAFF: "staffs",
  TURNOVER: "turnovers",
  PAY: "pays"
};

const TYPE_MENU = {
  BIG: "big",
  SMALL: "small",
};

const SORT_TYPE = {
  DESC: "descend",
  ASC: "ascend",
};

const ONE_DAY = 86399000;

const PATTETN = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

const TYPE_MESSAGE={
  SUCCESS: "SUCCESS",
  ERROR: 'ERROR'
}

export {
  COLOR,
  COLOR_MENU_ADMIN,
  BACKGROUND_MENU_ADMIN,
  MENU_TAB_CLIENT,
  ONE_DAY,
  PATTETN,
  MENU_TAB_ADMIN,
  TYPE_MENU,
  SORT_TYPE,
  TYPE_MESSAGE
};
