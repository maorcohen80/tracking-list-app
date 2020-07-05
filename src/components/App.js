import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Nav from './Nav';
import Home from './Home';
import RecivedItemsList from './RecivedItemsList';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className="ui container">
          <Route path="/tracking-list-app" exact component={Home} />
          <Route path="/received" component={RecivedItemsList} />
        </div>
      </BrowserRouter>
    </div>
  )
};

export default App;
