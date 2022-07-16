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

let historyApp;
function App() {

  // historyApp = useHistory();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route
            exact
            path="/"
            render={() => {
              return (
                <Route path={"/login"} element={<Login />} />
              )
            }}
          /> */}
          <Route path={"/"} element={<Login />} />
          <Route path={"/login"} element={<Login />} />
          {/* admin  */}
          <Route path={"/admin"} element={<AdminPage />} />
          <Route path={"/admin/menu"} element={<Menu />} />
          <Route path={"/admin/area"} element={<Area />} />
          <Route path={"/admin/spending"} element={<Spending />} />
          <Route path={"/admin/turnover"} element={<Turnover />} />
          <Route path={"/admin/book"} element={<Book />} />
          <Route path={"/admin/kitchen"} element={<Kitchen />} />
          <Route path={"/admin/bar"} element={<Bar />} />
          <Route path={"/admin/staff"} element={<Staff />} />

          {/* client */}

          <Route path={"/client"} element={<ClientPage />} />
          <Route path={"/client/home"} element={<Home />} />
          <Route path={"/client/booking"} element={<Booking />} />
          <Route path={"/client/feedback"} element={<Feedback />} />
          <Route path={"/client/offer"} element={<Offer />} />
          <Route path={"/client/contact"} element={<Contact />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
export { historyApp }
