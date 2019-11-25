import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header'
import Footer from './footer'
import SignInForm from './signIn'
import RegisterForm from './RegisterForm'
import './css/style.css'
import './lib/font-awesome/css/font-awesome.min.css'
import './lib/animate/animate.min.css'

function App() {

  return (


    <div className="App">
    <Header />
      <div className='container-app'> 
	     <section id="hero">
    <div class="hero-container">
      <h1>Welcome to vortex</h1>
      <h2>Democracy is in your hands</h2>
      <a href="#about" class="btn-get-started">Get Started</a>
    </div>
  </section>
  </div>
  <section id="about">
      <div class="container">
        <div class="row about-container">

          <div class="col-lg-6 content order-lg-1 order-2">
            <h2 class="title">Online Election / Voting</h2>
            <p>
              
            </p>

            <div class="icon-box wow fadeInUp">
              <div class="icon"><i class="fas fa-vote-yea"></i></div>
              <h4 class="title"><a href=""><b>Organize Elections</b></a></h4>
              <p class="description">Organize your own elections</p>
            </div>

            <div class="icon-box wow fadeInUp" data-wow-delay="0.2s">
              <div class="icon"><i class=""></i></div>
              <h4 class="title"><a href=""><b>Invite Voters</b></a></h4>
              <p class="description">Select and send invitations for people to vote</p>
            </div>

            <div class="icon-box wow fadeInUp" data-wow-delay="0.2s">
              <div class="icon"><i class="-person-booth"></i></div>
              <h4 class="title"><a href=""><b>Vote Confidentially</b></a></h4>
              <p class="description">Votes are secured and both integrity and confidentiality of your online votes are guaranteed</p>
            </div>

            <div class="icon-box wow fadeInUp" data-wow-delay="0.4s">
              <div class="icon"><i class="f-bar-chart"></i></div>
              <h4 class="title"><a href=""><b>Check the results</b></a></h4>
              <p class="description">Annonce the results and the winner of the elections, verify the ballot at any time</p>
            </div>

          </div>

          <div class="col-lg-6 background order-lg-2 order-1 wow fadeInRight"></div>
        </div>

      </div>
    </section>
      <section id="call-to-action">
      <div class="container wow fadeIn">
        <div class="row">
          <div class="col-lg-9 text-center text-lg-left">
            <h3 class="cta-title">Be Democratic</h3>
            <p class="cta-text"> <i>"Democracy is the government of the people, by the people, for the people"</i> - Abraham Lincoln</p>

          </div>
          <div class="col-lg-3 cta-btn-container text-center">
            <a class="cta-btn align-middle" href="./create-vote">Create Election</a>
          </div>
        </div>

      </div>
 </section>
        <section id="contact">
      <div class="container wow fadeInUp">
        <div class="section-header">
          <h3 class="section-title">Contact</h3>
          <p class="section-description">We will be happy to assist you with any question regarding election, voting, and any security issue.</p>
        </div>
      </div>
      <div class="container wow fadeInUp mt-5">
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-4">
            <div class="info">
              <div>
                <i class="fa fa-map-marker"></i>
                <p>Lot 660, Hay Moulay Rachid, UM6P Benguerir, 43150</p>
              </div>
              <div>
                <i class="fa fa-envelope"></i>
                <p>WMI_DNA@um6p.com</p>
              </div>
              <div>
                <i class="fa fa-phone"></i>
                <p>+212 627 46 15 51</p>
              </div>
            </div>
            <div class="social-links">
              <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
              <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
              <a href="#" class="instagram"><i class="fa fa-instagram"></i></a>
              <a href="#" class="google-plus"><i class="fa fa-google-plus"></i></a>
              <a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
            </div>
          </div>
          <div class="col-lg-5 col-md-8">
            <div class="form">
              <div id="sendmessage">Your message has been sent. Thank you!</div>
              <div id="errormessage"></div>
              <form action="" method="post" role="form" class="contactForm">
                <div class="form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                  <div class="validation"></div>
                </div>
                <div class="form-group">
                  <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                  <div class="validation"></div>
                </div>
                <div class="text-center"><button type="submit">Send Message</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>






    <Footer />
  </div>

  );
}

export default App;
