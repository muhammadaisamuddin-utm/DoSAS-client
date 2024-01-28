import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios';
import {getCookie} from "typescript-cookie";

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.withXSRFToken = true;

axiosInstance.interceptors.request.use(
  config => {
    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export default axiosInstance;