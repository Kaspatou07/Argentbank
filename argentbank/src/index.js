import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store'; 
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Enveloppez App avec Provider et passez-lui votre store Redux */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
