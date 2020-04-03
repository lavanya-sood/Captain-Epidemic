import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import heading from './img/webheading.png';
import logo from './img/Logo.png';
import userimg from './img/user.png';
import search from './img/search.png';
import {Navbar,Nav,Form,FormControl,Button,Dropdown} from 'react-bootstrap';


class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <a href='/'><img src={heading} id='heading' alt=''/></a>
          
          <Navbar id='navbar' expand="lg" href='/'>
            <a href='/' className="d-inline-block align-top" ><img src={logo} id="logo" href='/'alt="Website logo"/> </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className='searchbar'>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="searchbox" />
                    <Button className='navbutton'> < img className="nav-image" src={search} alt=''/></Button>
                  </Form>
                </Nav.Link>
              
              </Nav>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-custom">
                    <span>
                      <img className="nav-image" src={userimg} alt="user pic"/>
                      Username
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item href="/game">Game</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/login">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              

            </Navbar.Collapse>
          </Navbar>

          {/* <ul className="header">
            <li><NavLink exact to="/"><img src={logo} id='logo'/></NavLink></li>
            <li><NavLink to="/game">Game</NavLink></li>
            <li> 
            <form> <input type="text" name="name" /> <input type="submit" value="Submit"/> </form>
            </li>
            <li><NavLink to="/profile">Profile</NavLink></li>
          </ul> */}
          {/* <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Game" component={Game}/>
            <Route path="/Profile" component={Profile}/>
          </div> */}

          
        </div>
      </Router>
    );
  }
}
export default Main;
