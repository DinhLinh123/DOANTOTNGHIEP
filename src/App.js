import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from './component/page/Login/Login';
import ClientPage from './component/page/client/ClientPage/ClientPage';

let historyApp;
function App() {

  // historyApp = useHistory();

  return (
    <div className="App">
        <ClientPage/>
    </div>
  );
}

export default App;
export {historyApp}
