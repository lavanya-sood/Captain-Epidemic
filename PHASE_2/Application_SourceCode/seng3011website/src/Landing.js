import React, { Component } from "react";
import heading from './img/landingheading.png';
import Footer from "./PageFooter.js";
import { NavLink,Link} from "react-router-dom";
import logo from './img/Logo.png';
import superhero from './img/Super.png';
import userimg from './img/user.png';
import search from './img/search.png';
import "./css/Landing.css";

import {Navbar,Nav,Table,Button,Dropdown,Modal} from 'react-bootstrap';
import PageFooter from "./PageFooter.js";
import {Message} from "./Message.js";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state={addModalShow:false};
  }
  render() {
    let addModalClose = () => this.setState({addModalShow:false});
    if (localStorage.getItem('username')) {
      return (
        <div className="Landing">
            <Navbar id='landingnav' expand="lg" href='/'> 
            <NavLink className="d-inline-block align-top" to="/home"><img src={logo} id="logo" href='/'alt="Website logo"/></NavLink>
          </Navbar>
          <div className="MainLanding">
            {/* <h1> HEY </h1> */}
            <Table borderless size="sm" className="landingTable">
            <tr>
            <td className="logoPicture">
              <h1> <img src={superhero} id="superhero" href='/'alt="Super"/></h1>
            </td>
            <td className="otherInfo">
                <Table borderless size="sm" className="landingTable">
                  <tr>
                    <td><img src={heading} id="headingLanding" href='/'alt="Super"/></td>
                  </tr>
                  <tr>
                    <Link to='/home'>
                      <button className="startedbutton"> Welcome back, {localStorage.getItem('username')} </button>
                    </Link>
                  </tr>


                </Table>
            </td>
            </tr>
            </Table>
            <button class="notif-btn" onClick={()=>this.setState({addModalShow:true})}>
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28"><path d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm8.29-4.71L19 17v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-1.29 1.29c-.63.63-.19 1.71.7 1.71h15.17c.9 0 1.34-1.08.71-1.71zM13 16h-2v-2h2v2zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v2z"/></svg>
            </button>
          </div>
          <PageFooter />
          <Message show={this.state.addModalShow} onHide={addModalClose}/>
      </div>
      )
    }
    return (
      <div className="Landing">
            <Navbar id='landingnav' expand="lg" href='/'>
            <a href='#/home' className="d-inline-block align-top" ><img src={logo} id="logo" href='/'alt="Website logo"/> </a>        
            <NavLink className="LoginLanding" to="/login">Login</NavLink>
          </Navbar>
          <div className="MainLanding">
            {/* <h1> HEY </h1> */}
            <Table borderless size="sm" className="landingTable">
            <tr>
            <td className="logoPicture">
              <h1> <img src={superhero} id="superhero" href='/'alt="Super"/></h1>
            </td>
            <td className="otherInfo">
                <Table borderless size="sm" className="landingTable">
                  <tr>
                    <td><img src={heading} id="headingLanding" href='/'alt="Super"/></td>
                  </tr>
                  <tr>
                    <Link to='/login'>
                      <button className="startedbutton"> Let's get started </button>
                    </Link>
                  </tr>


                </Table>
            </td>
            </tr>
            </Table>
            <button class="notif-btn" onClick={()=>this.setState({addModalShow:true})}>
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28"><path d="M12 23c1.1 0 1.99-.89 1.99-1.99h-3.98c0 1.1.89 1.99 1.99 1.99zm8.29-4.71L19 17v-6c0-3.35-2.36-6.15-5.5-6.83V3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.17C7.36 4.85 5 7.65 5 11v6l-1.29 1.29c-.63.63-.19 1.71.7 1.71h15.17c.9 0 1.34-1.08.71-1.71zM13 16h-2v-2h2v2zm0-5c0 .55-.45 1-1 1s-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v2z"/></svg>
            </button>
          </div>
          <PageFooter />
          <Message show={this.state.addModalShow} onHide={addModalClose}/>
      </div>
    );
  }

  
}
export default Landing;