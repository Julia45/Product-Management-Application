
import './App.css';
import MainPage from './components/MainPage/MainPage'
import CreateViewPage from "./components/CreateViewPage/CreateView"
import EditView from './components/EditViewPage/EditView'
import CartView from './components/CartViewPage/CartView'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>

          <Route path="/" exact>
            <MainPage />
          </Route>

          <Route path="/create-view">
            <CreateViewPage />
          </Route>

          <Route path="/edit-view/:id">
            <EditView />
          </Route>

          <Route path="/cart-view">
            <CartView />
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
