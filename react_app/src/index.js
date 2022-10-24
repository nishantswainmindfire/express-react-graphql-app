import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PostList from './components/PostList';
function Dumb(){
  return<div style={{background:"black"}}>"hello"</div>  
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={<App />}>    </Route> */}
        <Route path="/home" element={<App />} />
        <Route path="/homec" element={<Dumb />} />
        {/* <Route path="/notfound" element={<h1>"not found"</h1>}></Route> */}
        {/* <Route path="/*" element={<h1>"not found"</h1>}></Route> */}
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>
);

