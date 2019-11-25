import React, { Component } from 'react';
import './App.css';
import ApiService from './api.js'
import Header from './header'
import autoBind from 'auto-bind'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    constructor() {
        super()
        autoBind(this)
        this.state = {
            username: "",
            password: "",
            redirectSucceed: false
        }
    }
    handleUsernameChange(event) {
        this.setState({username: event.target.value})
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value})
    }
    onSubmitClick(event) {
        event.preventDefault()
        ApiService.authenticate(this.state.username, this.state.password,this.callback)
        return false;
    }
    callback(res) {
        if(res.hasOwnProperty("status")) {
            if(res["status"] == "ok") {
                this.setState({redirectSucceed: true})
                return;
            }
        }
        // TODO: show error message
    }
    renderRedirectSucceed = () => {
        if(this.state.redirectSucceed) {
            return <Redirect to='/votes' />
        }
    }
    render() {
        return (   <div className="App">
            <section id="hero3">
                <Header/>
                <div className='container-signIn'  >
                <div class="wrapper fadeInDown">
  <div id="formContent">
                    <div></div>
                    <form onSubmit={this.handleSubmit} align="center">
                        <label>
                            username
                            <input id="login" class="fadeIn second" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                        </label>
                        <label>
                            password
                            <input type="text" id="password" class="fadeIn third" value={this.state.password} onChange={this.handlePasswordChange} />
                        </label>
                        <a class="btn btn-default btn-lg" href="" style={{align:"center"}}><input type="submit" onClick={this.onSubmitClick} class="btn btn-default" value="Envoyer"/></a>
                    </form>
                </div>
                {this.renderRedirectSucceed()}
                 </div>
</div>
                    </section>
                  <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%"}}>
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
export default SignIn;
    
