import React, { Component } from 'react';
import './App.css';
import ApiService from './api.js'
import autoBind from 'auto-bind'
import Header from './headerConnected'
import './css/style.css'
import Footer from './footer'
import {ListGroup, Row, Col, Form, Card,Button, Alert, Table} from 'react-bootstrap';
class BulltinBoard extends Component {
    constructor(){
        super()
        autoBind(this)
        this.state={
            votesList:[],
            currentElectionName:"",
            currentElectionID: 0,
            currentOptionList:[],
            vote:[],
            hashedVote:"",
            key:"",
            voteDone:false,
            results: []
        }
    }
    componentDidMount(){
        ApiService.electionLis(this.getElectionsCallback)
    }
    getElectionsCallback(res){
        // TODO: chech if status of res is ok
        this.setState({votesList:res.result})
        ApiService.getResults(this.state.votesList[this.state.currentElectionID].id, this.resultCallback)
        
        // show first election by default
        if(res.result.length > 0) {
            this.setState({currentElectionName: this.state.votesList[0].question})
            this.setState({currentOptionList:this.state.votesList[0].options})
        }
    }
    componentWillMount(){
    }

    resultCallback(res){
        var results= []
        var options = this.state.votesList[this.state.currentElectionID].options;
        for(var i = 0; i < options.length; i++) {
            results.push({'key':options[i], 'val':res.result[i]})
        }
        this.setState({results : results})
    }
    onListElementClick(event) {
        this.setState({currentElectionName: this.state.votesList[event.target.value].question});
        this.setState({currentOptionList:this.state.votesList[event.target.value].options});
        this.setState({currentElectionID: event.target.value});
        ApiService.getResults(this.state.votesList[this.state.currentElectionID].id, this.resultCallback)
    }
    
    render()
    {
          
        const bultin =[]
        const list=[]
        for(var i=0;i<this.state.votesList.length;i++){
            this.state.votesList[i].bulltinBoard.map(elt2=>{
                        bultin.push(
                            <tr>
                                <td>{elt2.username}</td>
                                <td>{elt2.hashed_vote}</td>
                               
                            </tr>
                          )

                  
          })
            
            list.push(<ListGroup.Item action value={i} onClick={this.onListElementClick}>
                    {this.state.votesList[i].name}
          </ListGroup.Item>)
        }
        var results =[]
        this.state.results.map(
            elt2=>{
                results.push(
                    <tr>
                        <td>{elt2.key}</td>
                        <td>{elt2.val}</td>
                       
                    </tr>
                  )
            }


        )
        
        return (
           <div className="App">
            <section id="hero2" >
            <Header/>
            <div className='container-listVotes'> 
            <div>
            <Row>
                <Col md={4}><ListGroup>
            {list}
             </ListGroup></Col>
                <Col md={8}>
                <Card>
                            <Card.Body>
                    <Card.Header>Bulletin Board</Card.Header>
                    <br/>
                         <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Username</th>
                                <th> Hashed Vote </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bultin}
                            </tbody>
                        </Table>
                        <br/>

                        <Card.Header>Result</Card.Header>
                        {this.state.results.length!=0 && 
                        
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Option name </th>
                                <th> Number of votes</th>
                                </tr>
                            </thead>

                            <tbody>
                                {results}
                            </tbody>
                        </Table>
                        
                        }
                           {this.state.results.length==0 && 
                        
                      <Alert variant='secondary'>No results yet</Alert>
                        
                        }


                            </Card.Body>
                    </Card>
                    
                   </Col>
            </Row>
           
            
          </div> 
          </div>
                      </section>
            <Footer />
          </div>
        );
      }
}    
export default BulltinBoard;
