


import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'
import reportWebVitals from './reportWebVitals';
import Paths from './pages/Paths'
import RegisterPage  from './pages/RegisterPage';
import LoginPage  from './pages/LoginPage';
import AddCampsitePage from './pages/AddCampsitePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CampsitesPage from './pages/CampsitesPage'; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={Paths.register} element={<RegisterPage />} />
        <Route path={Paths.login} element={<LoginPage />} />
        <Route path={Paths.campsites} element={<CampsitesPage />} />
        <Route path={Paths.addCampsite} element={<AddCampsitePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
