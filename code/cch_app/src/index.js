import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Create a root using the new ReactDOM.createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire application inside the created root
root.render(
  <React.StrictMode>
    {/* Wrap the entire application with BrowserRouter for routing functionality */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
// Register the service worker for Progressive Web App features
serviceWorkerRegistration.register();

reportWebVitals();
