import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/style.css'

class Footer extends Component {
  constructor(){
      super()
      this.state={
        connected:false
      }
    }
  render() {


    
    return (
      <div className="App">
  <footer id="footer">
    <div class="footer-top">
      <div class="container">

      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong>Vortex</strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="#">WMI</a>
      </div>
    </div>
  </footer>
      </div> 
    );
  }
}

export default Footer;