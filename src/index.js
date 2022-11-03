import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const container = document.getElementById('app');
const root = ReactDOM.createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
