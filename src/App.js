import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import { Route, Link, BrowserRouter, Switch, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="navBar">
          <h2 style={{ textAlign: 'initial', width: "65%", paddingLeft: '1rem' }}>MetaVerse NFT MarketPlace</h2>
          <div style={{ width: '35%', display: "flex", justifyContent: 'space-evenly' }}>
            <a className="customLink">Sell Assets</a>
            <a className="customLink">Own Assets</a>
            <a className="customLink">Create NFT</a>
          </div>


        </div>
        <div className="customContainer">
          <Routes>
            <Route  path="/" element={<HomePage />} />
            <Route  path="/CreatePage" element={<CreatePage />} />
          </Routes>
          {/* </Router> */}
          {/* <Route path="/aboutus" component={AboutUs} />
            <Route path="/contactus" component={ContactUs} />
            <Route component={ErrorPage} /> */}
          {/* <HomePage></HomePage> */}
        </div>



      </div>
    </BrowserRouter>
  );
}

export default App;
