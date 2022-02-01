import './App.css';
import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './Component/Header';
import { makeStyles } from '@material-ui/core';
import { Home } from './Component/Home';
import { About } from './Component/About';
import { Portfolio } from './Component/Portfolio';
import { CoinsPage } from './Component/CoinsPage';

import alanBtn from '@alan-ai/alan-sdk-web';
import Context from './Component/ContextApi/CreateContext';
import { SignUp } from './Component/SignUp';
import Login from './Component/Login';
import { WatchList } from './Component/WatchList';

const alanKey = '8e542ce0b8a7c315c916690fe0240d2c2e956eca572e1d8b807a3e2338fdd0dc/stage'

const styles = makeStyles(() => ({
  format: {
    padding: "0px",
    marginTop: "0px",
  }
}))

function App() {

  const classes = styles();
  const navigate = useNavigate();
  const capi = useContext(Context);
  // var str='hello world'
  // var sub=str.substr(1,4);
  // console.log(sub);


  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, val }) => {
        // console.log(command, val);
        if (command === 'search') {
          console.log(command, val);
          const input = document.getElementById('searchCryptoHome');
          input.value = val;
          input.click();
        }
        else if (command === 'coins') {
          navigate(`/coins/${val}`);
          window.location.reload(true);
        }
        else if (command === 'back') {
          navigate('../');
        }
        else if (command === 'chart') {
          if (val === '1') {
            document.getElementById('1day').click();
          }
          else if (val === '30') {
            document.getElementById('30day').click();
          }
          else if (val === '90') {
            document.getElementById('90day').click();
          }
          else if (val === '365') {
            document.getElementById('365day').click();
          }
        }
        else if (command === 'currency') {
          // CreateState.fullchange();
          // document.getElementById('switchCurrency').click();
          // capi.fullchange();
          if (capi.currency === "INR") {
            capi.setsymbol("$")
            capi.setcurrency('USD')
          }
          else {
            capi.setsymbol("₹")
            capi.setcurrency('INR');
          }
        }
      }
    })
    // eslint-disable-next-line
  }, []);

  // { console.log(capi.currency, capi.symbol) }

  // console.log(window.location.pathname)

  return (
    <>
        <div>
          <Header />
          <div className={classes.format}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/portfolio" element={<Portfolio />} />
              <Route exact path="/watchlist" element={<WatchList />} />
              <Route exact path="/coins/:id" element={<CoinsPage />} />
              <Route exact path="/signup" element={<SignUp/>}/>
              <Route exact path="/login" element={<Login/>}/>
            </Routes>
          </div>
        </div>
    </>
  );
}

export default App;
