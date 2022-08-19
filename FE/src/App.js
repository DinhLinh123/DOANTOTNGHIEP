import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from './component/page/Login/Login';
import ClientPage from './component/page/client/ClientPage/ClientPage';
import AdminPage from './component/page/admin/AdminPage/AdminPage';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Navigate,
  Switch,
  Redirect,
  Router
} from "react-router-dom";
import Kitchen from './component/page/admin/AdminPage/Kitchen/kitchen';
import Book from './component/page/admin/AdminPage/Book/Book';
import Turnover from './component/page/admin/AdminPage/Turnover/Turnover';
import Spending from './component/page/admin/AdminPage/Spending/Spending';
import Area from './component/page/admin/AdminPage/Area/Area';
import AreaDetail from './component/page/admin/AdminPage/Area/AreaDetail/AreaDetail';
import Menu from './component/page/admin/AdminPage/Menu/Menu';
import Bar from './component/page/admin/AdminPage/Bar/Bar';
import Staff from './component/page/admin/AdminPage/Staff/Staff';
import Home from './component/page/client/ClientPage/Home/Home';
import Booking from './component/page/client/ClientPage/Booking/Booking';
import Feedback from './component/page/client/ClientPage/Feedback/Feedback';
import Offer from './component/page/client/ClientPage/Offer/Offer';
import Contact from './component/page/client/ClientPage/Contact/Contact';
import Order from './component/page/admin/AdminPage/Order/Order';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import TableOrder from './component/page/admin/AdminPage/TableOrder/TableOrder';
import SpendingDetail from './component/page/admin/AdminPage/SpendingDetail/SpendingDetail';
import KitchenDetail from './component/page/admin/AdminPage/KitchenDetail/KitchenDetail';
import KitchensDay from './component/page/admin/AdminPage/KitchensDay/KitchensDay';
import Pay from './component/page/admin/AdminPage/Pay/Pay';
import KitchensDayDetail from './component/page/admin/AdminPage/KitchensDayDetail/KitchensDayDetail';
import BarInsert from './component/page/admin/AdminPage/BarInsert/BarInsert';
import BarList from './component/page/admin/AdminPage/BarList/BarList';
import CategoryDrinks from './component/page/admin/AdminPage/CategoryDrinks/CategoryDrinks';
import CategoryMenu from './component/page/admin/AdminPage/CategoryMenu/CategoryMenu';
import CategoryPosition from './component/page/admin/AdminPage/CategoryPosition/CategoryPosition';
import ManagerFeedback from './component/page/admin/AdminPage/Feedback/Feedback';
import Promotion from './component/page/admin/AdminPage/Promotion/Promotion';

let historyApp;
function App() {
  if (String.prototype.format) {

    String.prototype.format = function () {
      var formatted = this;
      for (var arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
      }
      return formatted;
    };
  }

  // historyApp = useHistory();
  let loadingMainApp = useSelector(state => state.loading.loadingMainApp)

  return (
    <Spin tip="Loading..." spinning={loadingMainApp}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/client/home" />
            </Route>
            <Route path={"/login"}><Login /></Route>

            {/* admin */}
            <Route exact path="/admin">
              <Redirect to="/admin/menus" />
            </Route>
            <Route path={"/admin/menus"} ><Menu /></Route>
            <Route path={"/admin/areas"} ><Area /></Route>
            <Route path={"/admin/area/detail/:areaID"} ><AreaDetail /></Route>
            <Route path={"/admin/spendings"} ><Spending /></Route>
            <Route path={"/admin/turnovers"}> <Turnover /></Route>
            <Route path={"/admin/books"}><Book /></Route>
            <Route path={"/admin/kitchens"}><Kitchen /></Route>
            <Route path={"/admin/kitchen/detail/:kitchenID"}><KitchenDetail /></Route>
            <Route path={"/admin/kitchens-days"}><KitchensDay /></Route>
            <Route path={"/admin/kitchens-day/detail/:kitchenDayID"}><KitchensDayDetail /></Route>
            <Route path={"/admin/bar-insert"}><BarInsert /></Route>
            <Route path={"/admin/bars"}><BarList /></Route>
            <Route path={"/admin/category_drink"}><CategoryDrinks/></Route>
            <Route path={"/admin/category_menu"}><CategoryMenu/></Route>
            <Route path={"/admin/category_position"}><CategoryPosition/></Route>
            <Route path={"/admin/staffs"}> <Staff /></Route>
            <Route path={"/admin/spending/detail/:spendingID"}> <SpendingDetail /></Route>
            <Route path={"/admin/kitchenday"}> <Staff /></Route>
            <Route path={"/admin/pays"}> <Pay /></Route>
            <Route path={"/admin/feedback"}> <ManagerFeedback /></Route>
            <Route path={"/admin/promotion"}> <Promotion /></Route>

            {/* order */}
            <Route path={"/admin/tables"}> <TableOrder /></Route>
            <Route path={"/admin/table/:tableID/order"}> <Order /></Route>

            {/* client */}
            <Route exact path="/client">
              <Redirect to="/client/home" />
            </Route>
            {/* <Route path={"/client"}> <ClientPage /></Route> */}
            <Route path={"/client/home"}><Home /></Route>
            <Route path={"/client/booking"}><Booking /></Route>
            <Route path={"/client/feedback"}><Feedback /></Route>
            <Route path={"/client/offer"}><Offer /></Route>
            <Route path={"/client/contact"}><Contact /></Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Spin>

  );
}

export default App;
export { historyApp }
