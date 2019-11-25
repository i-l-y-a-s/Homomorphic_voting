import React, { Component } from 'react';
import './App.css';
import ApiService from './api.js'
import Header from './header'

class Votes extends Component {
    constructor(){
        super()
        this.state={
            login:"",
            password:""
        }
    }
    
    handleLoginChange(event){
        this.setState({login: event.target.value})
    }
    handlePassChange(event){

        this.setState({password: event.target.value})
    }
    onSubmitClick(){
        ApiService.register(this.state.login, this.state.password,this.callback)

    }
    callback(res){

    }
    render()
    {
        return (
            <div className="App">

            <Header/>
            <div className='container-signIn'> 
            <div>
            </div>
            <form onSubmit={this.handleSubmit}>
            <label>
                Login :
              <input type="text" value={this.state.login} onChange={this.handleLoginChange} />
            </label>
            <label>
                Password 
              <input type="text" value={this.state.password} onChange={this.handlePassChange} />
            </label>
            <input type="submit" value="Envoyer"  onClick={this.onSubmitClick}/>
          </form>
            </div>
          </div> 
            
            
        );
      }

    }
    
export default Votes;
