import React, { Component } from "../../node_modules/react";
import '../css/pure-min.css';
import '../css/Login.css';
import { NavLink } from "../../node_modules/react-router-dom";
import login_logo from '../img/login-logo.png';
import background from '../img/login-background.png';
import logo from '../img/Logo.png';

export default class Login extends Component {
    state = { users : "" }

   callAPI() {
        fetch("/login")
            .then(res => res.json())
            .then(res => this.setState({ users: res}));
    }
    componentWillMount() {
        this.callAPI();
    }

    clearErrors(div) {
        div.innerHTML = '';
    }
    clearValue(input) {
        input.value = '';
    }
    authenticate(username, password) {
        for (var i = 0; i < this.state.users.length; i++) {
            if (username.value === this.state.users[i].username) {
                if (password.value === this.state.users[i].password) {
                    return i;
                }
            }
        }
        return false
    }

    handleSubmit(event) {
        const div = document.getElementById('error')
        this.clearErrors(div)
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const empty = document.createElement('p')
        empty.classList.add('error-p')
        if (username.value === '' || password.value === '') {
            empty.textContent = 'username and password can not be empty'
            event.preventDefault();
            this.clearValue(username)
            this.clearValue(password)
            div.appendChild(empty)
        } else {
            const res = this.authenticate(username, password)
            if (res !== false) {
                localStorage.setItem('username', username.value)
                localStorage.setItem('dob', this.state.users[res].dob)
                localStorage.setItem('image', this.state.users[res].image)
                fetch("/getgame")
                    .then(res => res.json())
                    .then( res => {
                      let quiz = []
                      for (var i = 0;i < res.length;i++){
                        if (res[i]['username'] === localStorage.getItem('username')){
                          // dont count same quiz twice
                            quiz.push(res[i]['quiz']);
                        }
                      }
                      localStorage.setItem('quiz',JSON.stringify(quiz))
                    })
            } else {
                empty.textContent = 'incorrect username or password'
                event.preventDefault();
                this.clearValue(username)
                this.clearValue(password)
                div.appendChild(empty)
            }
        }
    }

    render() {
        return (
            <div className="bg-color">
                <img src={background} alt="bg" className="bg"/>
                <div className="login-form" align = "center">
                    <form className="pure-form pure-form-aligned">
                        <fieldset className="login-fieldset">
                        <a href='#/home'><img src={logo} className='logo-login' alt="Website logo"/></a>
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
