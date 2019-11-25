import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/style.css'

class Header extends Component {
  constructor(){
      super()
      this.state={
        connected:false
      }
    }
  render() {


    
    return (
      <div className="App">
      <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
        
 
        <h1 ><a href="./home">Vortex</a></h1>
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active"><a href="./home">Home</a></li>
          <li><a href="./home#about">About Us</a></li>
                     <li><a href="./signIn">Login</a></li>
            <li><a href="./register">Register</a></li>
          <li><a href="./home#contact">Contact Us</a></li>
          
        </ul>
      </nav>
    </div>
  </header>

      </div> 
    );
  }
}

export default Header;
