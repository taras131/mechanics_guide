import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter
} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./services/store";
import "./firebase";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={setupStore()}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
