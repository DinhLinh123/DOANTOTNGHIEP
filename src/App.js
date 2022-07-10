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
} from "react-router-dom";

let historyApp;
function App() {

  // historyApp = useHistory();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/client"} element={<ClientPage />} />
          <Route path={"/admin"} element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
export { historyApp }
