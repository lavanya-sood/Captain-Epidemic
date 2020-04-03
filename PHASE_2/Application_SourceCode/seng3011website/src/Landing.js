import React, { Component } from "react";
import heading from './img/webheading.png';
import {Button} from 'react-bootstrap';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <a href='/home'><img src={heading} id='heading' alt=''/></a>
        <div id="main">
          <Button className="startedbutton"> Let's get started </Button>
        </div>
      </div>
    );
  }
}
export default Landing;
