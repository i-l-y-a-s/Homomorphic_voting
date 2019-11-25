import React, { Component } from 'react';
import './App.css';
import ApiService from './api.js'
import autoBind from 'auto-bind'
import Header from './headerConnected'
import {ListGroup, Row, Col, Form, Card,Button,Input,Alert} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import './css/style.css'
import Footer from './footer'

class CreateVote extends Component {
    constructor(){
        super();
        autoBind(this);
        this.state={
            login:"",
            password:"",
            namesList:[],
            candidatesnumber:1,
            question:"",
            name:"",
            users:"",
            options:"",
            redirectSucceed: false,
            publicKey: "",
            privateKey: "",
            encrypted_0: ""
        }
    }
    
    handleNameChange(event){
        this.setState({name: event.target.value})
    }
    handlequestionChange(event){
        this.setState({question: event.target.value})
    }
    handleUsersChange(event){
      this.setState({users:event.target.value})
    }
    onSubmitClick(){
        var ls=[]
        for(var i = 0; i <= this.state.candidatesnumber; i++) {
            ls.push(document.getElementById("cand-" + i).value)
            this.state.options += document.getElementById("cand-" + i).value
            if(i != this.state.candidatesnumber) {
                this.state.options += ';'
            }
        }
        this.setState({namesList:ls})
        ApiService.createElection(this.state.name, this.state.question,this.state.options,this.state.users,this.state.publicKey, this.state.encrypted_0, this.callback)
    }
    callback(res){
        // TODO: check if everything is ok
        this.setState({redirectSucceed: true});
    }
    onAddclick(event){
      event.preventDefault();
         this.setState({candidatesnumber:this.state.candidatesnumber+1})
        
    }
    handleCandidateChange(event){
        var ls=this.state.namesList
        ls.push(event.target.value)
        this.setState({namesList:ls})
    }
    generatePublicKey(event) {
        event.preventDefault();
        var keys = ApiService.generatePublicPrivateKey();
        this.setState({encrypted_0: keys[0].encrypt(0)})
        this.setState({
            publicKey: keys[0].n.toString() + "/" + keys[0].g.toString(),
            privateKey: keys[1].lambda.toString() 
                        + "/" + keys[1].mu.toString()
                        + "/" + keys[1]._p.toString()
                        + "/" + keys[1]._q.toString()
                        + "/" + keys[0].n.toString()
                        + "/" + keys[0].g.toString()
        });
    }
    renderRedirectSucceed = () => {
        if(this.state.redirectSucceed) {
            return <Redirect to='/votes' />
        }
    }
    render()
    {
        //const [index, value] of this.state.namesList.entries()
        const names=[]
       for (var i=0;i<=this.state.candidatesnumber;i++) {
            names.push(
                <Row><label>
                <h6 className='label'>Option {i+1} </h6>
            
          <input id={"cand-" + i} type="text"  key={i}  />
        </label></Row>
                
        )
          }
        return (
          <div className="App">
            <section id="hero2" >
            <Header/>
            <div className='container-addVote' >
            <form  style={{margin:"auto"}}>
            <Row >
            <label>
            <h6 className='label'>Election name </h6>
              <input type="text" value={this.state.name} onChange={this.handleNameChange} />
            </label>
            </Row>
            <Row>
            <label>
            <h6 className='label'> Question </h6>
              <input type="text" value={this.state.question} onChange={this.handlequestionChange} />
            </label>
            </Row>
               <Row>
          <button onClick={this.onAddclick}>+</button>
                </Row> 
            {names}
            <Row>
            <label>
            <h6 className='label'> Voters <small>(Comma separated)</small> </h6>
              <input type="text" value={this.state.users} onChange={this.handleUsersChange} />
            </label>

          </Row>
  
            <Row>
            <label>
            <h6 className='label'> Public key </h6>
              <input type="text" value={this.state.publicKey} onChange={this.handlePublicKeyChange} />
              <button onClick={this.generatePublicKey}>generate one!</button>
            </label>
          </Row>
          <Row>
            <label>
            <h6 className='label'> Private key </h6>
            <br/>
            <textarea value=
               {this.state.privateKey}
               cols="52"
>
               </textarea>
            </label>
          </Row>
          </form>
          <Row>
          <input type="submit" value="Envoyer"  onClick={this.onSubmitClick}/>
          </Row>
            </div>
            {this.renderRedirectSucceed()}
            </section>
            <Footer />
          </div>


        );
      }

    }
    
export default CreateVote;
