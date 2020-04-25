import React, { Component } from "react";
import logo from './img/Logo.png';
import userimg from './img/user.png';
import search from './img/search.png';
import {Navbar,NavLink,Nav,Form,FormControl,Button,Dropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: localStorage.getItem('username')
  };

    onClick(){
      window.location.href="#/searchResult";
    }
    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('dob');
      localStorage.removeItem('image');
      localStorage.removeItem('quiz');
      localStorage.removeItem('games');
    }
    

    render() {
      let buttonDrop;
      if (this.state.username == null) {
        buttonDrop = <NavLink href="#/login" id="NavBarLogin"> Login</NavLink>;
      } else {
        buttonDrop = <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-custom">
            <span>
              <img className="nav-image" src={userimg} alt="user pic"/>
              {localStorage.getItem('username')}
            </span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu-nav">
          <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/login" onClick={this.logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>;
      }
      console.log("HEY" + this.state.username);
        return (
            <Navbar id='navbar' expand="lg" href='/'>
            <a href='#/home' className="d-inline-block align-top" ><img src={logo} id="logo" href='/'alt="Website logo"/> </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className='searchbar'>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="searchbox" />
                      <Button className='navbutton' onClick={this.onClick}> < img className="nav-image" src={search} alt=''/></Button>
                  </Form>
                </Nav.Link>

              </Nav>
              

              {buttonDrop}
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default NavigationBar;
