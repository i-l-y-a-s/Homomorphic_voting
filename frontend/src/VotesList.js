import React, { Component } from 'react';
import './App.css';
import ApiService from './api.js'
import autoBind from 'auto-bind'
import Header from './headerConnected'
import Footer from './footer'
import {ListGroup, Row, Col, Form, Card,Button, Alert} from 'react-bootstrap';
class VotesList extends Component {
    constructor(){
        super()
        autoBind(this)
        this.state={
            votesList:[],
            currentElectionName:"name",
            currentElectionID: 0,
            currentOptionList:[],
            vote:[],
            hashedVote:"",
            key:"",
            voteDone:false
        }
    }
    onValidateVote(e){
        e.preventDefault();
      var [hashedVote, key] = ApiService.manageVote(this.state.vote,
            this.state.votesList[this.state.currentElectionID].id,
            this.state.votesList[this.state.currentElectionID].voters_count,
            this.state.votesList[this.state.currentElectionID].public_key, this.onValidateCallback);
        this.setState({key:key})
        this.setState({hashedVote:hashedVote.toString()})
    }
    onValidateCallback(res) {
        if(res["status"] == "error") {
            // Just do nothing
        } else {
            this.setState({voteDone:true})
        }
    }
    componentDidMount(){
        ApiService.electionLis(this.getElectionsCallback)
    }
    getElectionsCallback(res){
        // TODO: chech if status of res is ok
        this.setState({votesList:res.result})
        // show first election by default
        if(res.result.length > 0) {
            this.setState({currentElectionName: this.state.votesList[0].question})
            this.setState({currentOptionList:this.state.votesList[0].options})
            document.getElementById("opt-container-" + 0).style.display = "block";
        }
    }
    handleLoginChange(event) {
        this.setState({login: event.target.value})
    }
    handlePassChange(event) {
        this.setState({password: event.target.value})
    }
    callback(res){
        console.log(res)
    }
    onOptionClick(event){
        var vote = [];
        var election = this.state.currentElectionID;
        var options = this.state.votesList[election].options;
        var choice = event.target.value;
        for(var i = 0; i < options.length; i++) {
            if(choice == options[i]) {
                vote.push(1);
            } else {
                vote.push(0);
            }
        }
        this.setState({vote: vote});
    }
    onListElementClick(event){
        for(var i=0;i<this.state.votesList.length;i++) {
            document.getElementById("opt-container-" + i).style.display = "none";
        }
        document.getElementById("opt-container-" + event.target.value).style.display = "block";
        this.setState({currentElectionName: this.state.votesList[event.target.value].question});
        this.setState({currentOptionList:this.state.votesList[event.target.value].options});
        this.setState({currentElectionID: event.target.value});
    }
    onRevealClick(event) {
        var private_key = prompt("Please the private key", "")
        var privateKey = ApiService.constructPrivateKey(private_key)
        ApiService.countTallies(this.state.votesList[this.state.currentElectionID].id, this.state.votesList[this.state.currentElectionID].voters_count, privateKey, this.state.votesList[this.state.currentElectionID].options, this.callback)
    }
    revealResults() {
        if(this.state.votesList.length > 0 && this.state.votesList[this.state.currentElectionID].isOwner) {
            return <Button style={{'float': 'left'}} onClick={this.onRevealClick}>Reveal Tally</Button>
        }
    }
    render()
    {
       const blockList=[]

        const list=[]
        for(var i=0;i<this.state.votesList.length;i++){
            const optionList=[]
            this.state.votesList[i].options.map(elt=>{
            optionList.push(
                <Form.Check 
                type='radio'
                name={'option-election-' + i}
                id={elt}
                label={elt}
                value={elt}
                onClick={this.onOptionClick}
            />
              )
          })
            var block = (<div id={"opt-container-" + i} class="displayNone">{optionList}</div>)
            blockList.push(block)
            list.push(<ListGroup.Item action value={i} onClick={this.onListElementClick}>
                    {this.state.votesList[i].name}
          </ListGroup.Item>)
        }
        return (
            <div className="App">
                     <section id="hero3">
                <Header/>
            <Header/>
            <div className='container-listVotes'> 
            <div>
                {!this.state.voteDone &&
                
                <Row>
                <Col md={4}><ListGroup>
            {list}
             </ListGroup></Col>
                <Col md={8}>
                <Card>
                            <Card.Body>
                    <Card.Header>{this.state.currentElectionName}</Card.Header>
                    <br/>
                                <Form>
                            {blockList}
                            {this.revealResults()}
                            <Button style={{'float':'right'}} onClick={this.onValidateVote}>Submit</Button>
                            </Form>
                            </Card.Body>
                    </Card>
                    
                   </Col>
            </Row>
                } 
           
           {this.state.voteDone &&
           
           
           <Card>
                            <Card.Body>
                            <Alert variant='info'>
                                Thanks for Voting !
                            </Alert>
                            
                    <Row>
                        <Col md={4}>           <label> Your personnal key to verify the vote:</label>

                        </Col>
                        <Col>
                        <Alert >
                                {this.state.key}
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                        <label>
                                The hashed Vote:
                            </label>
                        </Col>
                        <Col>
                        <Alert>
                                {this.state.hashedVote}
                            </Alert>
                        </Col>
                    </Row>
                            
                            
                            
                            </Card.Body>
                    </Card>
                    
           }
            
          </div> 
          </div>
          </section>
          <Footer/>
          </div>
            
        );
      }
}    
export default VotesList;
