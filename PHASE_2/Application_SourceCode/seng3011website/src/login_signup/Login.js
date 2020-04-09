import React, { Component } from "../../node_modules/react";
import '../css/pure-min.css';
import '../css/Login.css';
import { NavLink, Redirect } from "../../node_modules/react-router-dom";
import login_logo from '../img/login-logo.png';
import background from '../img/login-background.png';
import logo from '../img/Logo.png';

export default class Login extends Component {
    clearErrors(div) {
        div.innerHTML = '';
    }
    clearValue(input) {
        input.value = '';
    }
    handleSubmit(event) {
        const div = document.getElementById('error')
        this.clearErrors(div)
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const empty = document.createElement('p')
        empty.classList.add('error-p')
        empty.textContent = 'username and password can not be empty'
        if (username.value === '' || password.value === '') {
            event.preventDefault();
            this.clearValue(username)
            this.clearValue(password)
            div.appendChild(empty)
        } else {
            //do checking
        }
    }
    

    render() {
        return (
            <div className="bg-color">
                <img src={background} alt="bg" className="bg"/>
                <div className="login-form" align = "center">
                    <form className="pure-form pure-form-aligned">
                        <fieldset className="login-fieldset">
                        <a href='/home'><img src={logo} className='logo-login' href='/home'alt="Website logo"/></a>
                            <div className="welcome">
                                <img className = "login-logo" src={login_logo} alt=""/>
                                <p className="login-signup-title">Welcome Back!</p>
                            </div>
                            <div id = "error"></div>
                            <div className="pure-control-group">
                                <input id="username" type="text" placeholder="Username">
                                </input>
                            </div>
                            <div className="pure-control-group">
                                <input id="password" type="password" placeholder="Password">
                                </input>
                            </div>
                            <div className="pure-control-group">
                                <NavLink className = "nav-link pure-button login-button font" to="/home" onClick={this.handleSubmit.bind(this)}>Login</NavLink>
                            </div>
                            <div className="pure-control-group login-nav">
                                <NavLink className="nav-link sign-up-link" to="/signup">Don't have an account? Sign up now!</NavLink>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}