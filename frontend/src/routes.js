import React from 'react';
import {  Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import SignInForm from './signIn'
import RegisterForm from './RegisterForm'
import CreateVote from './CreateVote'
import VotesList from './VotesList'
import BulltinBoard from './BulltinBoard'

import App from './App'
const routes = () => (
    <BrowserRouter>
      <Route exact path="/signin" component={SignInForm}/>
      <Route exact path="/register" component={RegisterForm}/>
      <Route exact path="/home" component={App}/>
      <Route exat path="/create-vote" component={CreateVote}/>
      <Route exact path="/votes" component={VotesList}/>
      <Route exact path="/bulltin-board" component={BulltinBoard}/>

    </BrowserRouter>
);

export default routes;