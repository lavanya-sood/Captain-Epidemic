import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./img/Logo.png";
import userimg from "./img/user.png";
import search from "./img/search.png";
import {
  Navbar,
  NavLink,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", username: localStorage.getItem("username") };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  handleChange = (e) => this.setState({ searchTerm: e.target.value });
  onClick() {
    const link = "#/searchResult/" + this.state.searchTerm;
    if (this.state.searchTerm) {
      window.location.href = link;
      if (window.location.href.indexOf("searchResult") != -1) {
        window.location.reload(true);
      }
    }
  }
  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("dob");
    localStorage.removeItem("image");
    localStorage.removeItem("quiz");
    localStorage.removeItem("games");
  }
 

  render() {
    let buttonDrop;
    if (this.state.username == null) {
      buttonDrop = (
        <NavLink href="#/login" id="NavBarLogin">
          {" "}
          Login
        </NavLink>
      );
    } else {
      buttonDrop = (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-custom">
            <span>
              <img className="nav-image" src={userimg} alt="user pic" />
              {localStorage.getItem("username")}
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-nav">
            <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/login" onClick={this.logout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    console.log("HEY" + this.state.username);
    return (
      <Navbar id="navbar" expand="lg" href="/">
        <a href="#/home" className="d-inline-block align-top">
          <img src={logo} id="logo" href="/" alt="Website logo" />{" "}
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="searchbar">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="searchbox"
                  onChange={this.handleChange}
                  value={this.state.searchTerm || ""}
                />
                <Button className="navbutton" onClick={this.onClick}>
                  {" "}
                  <img className="nav-image" src={search} alt="" />
                </Button>
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
