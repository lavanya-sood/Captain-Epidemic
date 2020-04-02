import React, { Component } from "react";
import './css/pure-min.css';
import './css/Login.css';
import background from './img/login-background.png';
import { NavLink } from "react-router-dom";
import signup_logo from './img/signup-logo.png';
import logo from './img/Logo.png';

export default class SignUp extends Component {
    render() {
        return (
            <div className="bg-color">
                <img src={background} alt="bg" class="bg"/>
                <div class="signup-form" align = "center">
                    <form class="pure-form pure-form-aligned">
                        <fieldset class="signup-fieldset">
                        <a href='/home'><img src={logo} class='logo-signup' href='/home'alt="Website logo"/></a>
                            <div class="welcome">
                                <img class = "signup-logo" src={signup_logo} alt=""/>
                                <p class="title">Get Started!</p>
                            </div>
                            <div class="pure-control-group">
                                <input id="username" type="text" placeholder="Username">
                                </input>
                            </div>
                            <div class="pure-control-group">
                                <input id="password" type="password" placeholder="Password">
                                </input>
                            </div>
                            <NavLink class = " nav-link pure-button login-button font" to="/">Signup</NavLink>
                            <div class="signup-nav">
                                <NavLink class = "nav-link login-link" to="/login">Already have an account? Login now!</NavLink>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}