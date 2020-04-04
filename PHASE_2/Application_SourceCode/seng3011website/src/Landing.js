import React, { Component } from "react";
import heading from './img/webheading.png';
import {Button} from 'react-bootstrap';
import Footer from "./PageFooter.js";
import { Link} from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <img src={heading} id='heading' alt=''/>
        <div id="main">
           
          <Link to='/login'>
          <Button className="startedbutton"> Let's get started </Button>
          </Link>
          <button class="notif-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28"><path d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm8.29-4.71L19 17v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-1.29 1.29c-.63.63-.19 1.71.7 1.71h15.17c.9 0 1.34-1.08.71-1.71zM13 16h-2v-2h2v2zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v2z"/></svg>
            </button>
         
        </div>
        <div id="about">
          <h3> HELLO YOUNG HERO!</h3>
          <p> Join me in my quest to defeat the evil diseases that are talking over the world.</p>
          <p> BUT HOW CAN YOU HELP ME DEFEAT THEM?</p>
          <p> Through your knowledge Of course! </p>
          <p> Learn about all the different diseases by playing the quizzes and the badges. Each badge helps defeat the disease so COLLECT THEM ALL!</p>
          <h3> SIGNED, CAPTAIN EPIDEMIC </h3>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Landing;
