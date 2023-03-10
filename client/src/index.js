import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import './index.css';
import HomePage from './pages/HomePage';
import './firebase';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Layout>
      <HomePage />
    </Layout>
  </AuthContextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
