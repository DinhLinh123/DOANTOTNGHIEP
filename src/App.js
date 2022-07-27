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

let historyApp;
function App() {

  // historyApp = useHistory();
  let loadingMainApp = useSelector(state=> state.loading.loadingMainApp)

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
             <Redirect to="/admin/menu" /> 
          </Route>
          <Route path={"/admin/menu"} ><Menu /></Route>
          <Route path={"/admin/area"} ><Area /></Route>
          <Route path={"/admin/spending"} ><Spending /></Route>
          <Route path={"/admin/turnover"}> <Turnover /></Route>
          <Route path={"/admin/book"}><Book /></Route>
          <Route path={"/admin/kitchen"}><Kitchen /></Route>
          <Route path={"/admin/bar"}><Bar /></Route>
          <Route path={"/admin/staff"}> <Staff /></Route>
          
          {/* order */}
          <Route path={"/admin/tablea"}> <TableOrder /></Route>
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
