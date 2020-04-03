import React, { Component } from "react";
import heading from './img/webheading.png';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <a href='/home'><img src={heading} id='heading' alt=''/></a>
      </div>
    );
  }
}
export default Landing;
