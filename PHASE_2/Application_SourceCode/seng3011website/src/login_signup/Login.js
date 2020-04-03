import React, { Component } from "../../node_modules/react";
import '../css/pure-min.css';
import '../css/Login.css';
import { NavLink } from "../../node_modules/react-router-dom";
import login_logo from '../img/login-logo.png';
import background from '../img/login-background.png';
import logo from '../img/Logo.png'

export default class Login extends Component {
    render() {
        return (
            <div className="bg-color">
                <img src={background} alt="bg" class="bg"/>
                <div class="login-form" align = "center">
                    <form class="pure-form pure-form-aligned">
                        <fieldset class="login-fieldset">
                        <a href='/home'><img src={logo} class='logo-login' href='/home'alt="Website logo"/></a>
                            <div class="welcome">
                                <img class = "login-logo" src={login_logo} alt=""/>
                                <p class="title">Welcome Back!</p>
                            </div>
                            <div class="pure-control-group">
                                <input id="username" type="text" placeholder="Username">
                                </input>
                            </div>
                            <div class="pure-control-group">
                                <input id="password" type="password" placeholder="Password">
                                </input>
                            </div>
                            <div class="pure-control-group">
                                <NavLink class = "nav-link pure-button login-button font" to="/">Login</NavLink>
                            </div>
                            <div class="pure-control-group login-nav">
                                <NavLink class="nav-link sign-up-link" to="/signup">Don't have an account? Sign up now!</NavLink>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}