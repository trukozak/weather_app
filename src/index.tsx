//* Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//* App
import App from './App';

//* Store
import { store } from 'app/store';

//* Styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
