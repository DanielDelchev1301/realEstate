import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import './index.css';
import App from './App';
import { FILTERS, SORTING_OPTIONS } from './constants/constants';

window.sessionStorage.setItem('sortOption', SORTING_OPTIONS.REMOVE_SORTING);
window.sessionStorage.setItem('filters', JSON.stringify(FILTERS));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>
);
