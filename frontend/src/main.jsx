import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import {Urls} from './Urls'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.scss';
import {MyProvider} from '.';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MyProvider>
    <Urls />
    </MyProvider>
  </BrowserRouter>,
)
