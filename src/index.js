import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import WebFont from 'webfontloader';
import { BrowserRouter } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css'

// WebFont.load({
//   google: {
//     families: ['Qahiri', 'sans-serif']
//   }
// });

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);