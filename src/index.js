import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css";
import App from './app/App';
import { Provider } from 'react-redux';
import { createStore } from './app/store/create.store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore();
root.render(
    <Provider store={store}>
        <App />
    </Provider>
    
);

