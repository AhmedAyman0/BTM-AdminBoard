import React from 'react';
import './App.css';
import NavBar from './components/UI/Nav-Bar/Nav-Bar';
import Home from './components/Home/Home'
import {BrowserRouter as Router , Route , Link} from 'react-router-dom';
import PageWrapper from './containers/PageWrapper/PageWrapper';
import Login from './containers/Login/Login';
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
      </PageWrapper>
      </Router>
    </div>
  );
}

export default App;
