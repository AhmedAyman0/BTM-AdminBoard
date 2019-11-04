import React from 'react';
import './App.css';
import NavBar from './components/UI/Nav-Bar/Nav-Bar';
import Home from './components/Home/Home'
import {BrowserRouter as Router , Route , Link} from 'react-router-dom';
import PageWrapper from './containers/PageWrapper/PageWrapper';
import Login from './containers/Login/Login';
import Categories from './containers/Categories/Categories'
import Users from './containers/Users/Users'
import UsersShops from './containers/Users/UsersShops/UsersShops'
function App() {
  return (
    <div>
      <Router>
      <PageWrapper> 
        <Route
        exact={true}
        path="/"
        component={Login}
        >
        </Route>
        <Route
        path="/categories"
        component={Categories}
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
