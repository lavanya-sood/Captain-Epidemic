import React, { Component } from "../../node_modules/react";
import '../css/pure-min.css';
import '../css/Login.css';
import background from '../img/login-background.png';
import { NavLink } from "../../node_modules/react-router-dom";
import signup_logo from '../img/signup-logo.png';
import logo from '../img/Logo.png';

export default class SignUp extends Component {
    render() {
        return (
            <div className="bg-color">
                <img src={background} alt="bg" className="bg"/>
                <div className="signup-form" align = "center">
                    <form className="pure-form pure-form-aligned">
                        <fieldset className="signup-fieldset">
                        <a href='/home'><img src={logo} className='logo-signup' href='/home'alt="Website logo"/></a>
                            <div className="welcome">
                                <img className = "signup-logo" src={signup_logo} alt=""/>
                                <p className="login-signup-title">Get Started!</p>
                            </div>
                            <div className="pure-control-group">
                                <input id="username" type="text" placeholder="Username">
                                </input>
                            </div>
                            <div className="pure-control-group">
                                <input id="password" type="password" placeholder="Password">
                                </input>
                            </div>
                            <NavLink className = " nav-link pure-button login-button font" to="/home">Signup</NavLink>
                            <div className="signup-nav">
                                <NavLink className = "nav-link login-link" to="/login">Already have an account? Login now!</NavLink>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}