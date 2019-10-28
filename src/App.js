import React from 'react';
import './App.css';
import NavBar from './components/UI/Nav-Bar/Nav-Bar';
import Home from './components/Home/Home'
import {BrowserRouter as Router , Route , Link} from 'react-router-dom';
import PageWrapper from './containers/PageWrapper/PageWrapper';
import Login from './containers/Login/Login';
import Shops from './containers/Shops/Shops'
import Users from './containers/Users/Users'
import UsersShops from './containers/Users/UsersShops/UsersShops'
function App() {
  return (
    <div className="App">
      <Router>
      <PageWrapper> 
        <Route
        exact={true}
        path="/"
        component={Login}
        >
        </Route>
        <Route
        path="/shops"
        component={Shops}
        ></Route>
        <Route
        path="/users/shops/:id"
        component={UsersShops}
        ></Route>
        <Route
        path="/users"
        exact={true}
        component={Users}
        ></Route>
      </PageWrapper>
      </Router>
    </div>
  );
}

export default App;
