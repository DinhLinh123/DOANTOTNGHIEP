import logo from './logo.svg';
import './App.css';
import Login from './component/page/Login';

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
