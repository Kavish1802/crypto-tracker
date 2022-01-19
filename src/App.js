import './App.css';
import React from 'react';
import {  Route, Routes } from 'react-router-dom'
import Header from './Component/Header';
import { makeStyles } from '@material-ui/core';
import { Home } from './Component/Home';
import { About } from './Component/About';
import { Market } from './Component/Market';
import { Portfolio } from './Component/Portfolio';
import CreateState from './Component/ContextApi/CreateState';
import { CoinsPage } from './Component/CoinsPage';

const styles=makeStyles(()=>({
  format:{
    padding:"0px",
    marginTop:"0px",
  }
}))

function App() {
  const classes=styles();
  // var str='hello world'
  // var sub=str.substr(1,4);
  // console.log(sub);
  return (
    <>
    <CreateState>
      <div>
        <Header/>
        <div className={classes.format}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/portfolio" element={<Portfolio/>}/>
            <Route exact path="/market" element={<Market/>}/>
            <Route exact path="/coins/:id" element={<CoinsPage/>}/>
          </Routes>
        </div>
      </div>
      </CreateState>
    </>
  );
}

export default App;
