//* Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//* App
import App from './App';

//* Store
import { store } from 'app/store';

//* Styles
import './index.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
