import React from 'react';
import './index.css';
import App from './App';
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import StoreProvider from "./redux/StoreProvider";

render(
    <BrowserRouter>
        <StoreProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);

