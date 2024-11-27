
import React from "react";
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Sidebar from './components/sideBar';
import './Constantes.css';


function App() {

  return (
    <div className="App">

      <div className='d-flex'>
        <Sidebar />
        <div className='container-fluid'>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
} export default App;