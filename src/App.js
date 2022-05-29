import logo from './logo.svg';
import './App.css';
import React from "react";
import Login from './component/page/Login/Login';

let historyApp;
function App() {

  // historyApp = useHistory();

  return (
    <div className="App">
        <Login/>
    </div>
  );
}

export default App;
export {historyApp}
