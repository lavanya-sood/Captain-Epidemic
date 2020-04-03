import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import heading from './img/webheading.png';
import NavigationBar from './NavigationBar.js';

class PageHeader extends Component {
  render() {
    return (
      <Router>
        <div>
          <a href='/home'><img src={heading} id='heading' alt=''/></a>
          
          <NavigationBar />
        </div>
      </Router>
    );
  }
}
export default PageHeader;
