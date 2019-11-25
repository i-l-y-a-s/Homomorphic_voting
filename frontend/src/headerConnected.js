import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/style.css'
class HeaderConnected extends Component {
  render() {
    return (
      <div className="App">
       
      <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
        <h1><a href="./home" color="black">Vortex</a></h1>
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">

          <li class="menu-active"><a href="./home">Home</a></li>
          <li><a href="./home#about">About Us</a></li>
      
    <a className="header1" class="active" href="./votes">Elections</a>
    <a className="header1" href="./create-vote">create Vote</a>
    <a className="header1" href="./home">Log out</a>
          <li><a href="./home#contact">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </header>
      </div>
    );
  }
}

export default HeaderConnected;
