import React, { Component } from "../../node_modules/react";
import '../css/pure-min.css';
import '../css/Login.css';
import background from '../img/login-background.png';
import { NavLink } from "../../node_modules/react-router-dom";
import signup_logo from '../img/signup-logo.png';
import logo from '../img/Logo.png';
import Modal from './Avatar';

export default class SignUp extends Component {
    state = { users : "",
              avatar: false
            }
    
   callAPI() {
        fetch("/login")
            .then(res => res.json())
            .then(res => this.setState({ users: res}));
    }
    componentWillMount() {
        this.callAPI();
    }

    authenticate(username) {
        for (var i = 0; i < this.state.users.length; i++) {
            if (username.value === this.state.users[i].username) {
                return 'username already exists'
            }
        } 
        return true
    }

    clearErrors(div) {
        div.innerHTML = '';
    }
    clearValue(input) {
        input.value = '';
    }
    signupError(username, password, dob) {
        var err = ' can not be empty or invalid'
        var msg =''
        if (password.value === '') {
            msg=password.id
            if (dob.value === '') {
                msg=dob.id + ', ' + msg
                if (username.value === '') {
                    msg=username.id + ', ' + msg
                }
            } else {
                if (username.value === '') {
                    msg=username.id + ', ' + msg
                }
            }
            return msg + err
        } 
        return msg
    }
    birthdate(dob) {
        var msg = ''
        const dob_p = Date.parse(dob.value)
        const curr = new Date()
        curr.setFullYear(curr.getFullYear() - 5)
        if (dob_p > curr) {
            msg = 'users must be over the age of 5'
        }
        return msg
    }
    handleSubmit(event) {
        const div = document.getElementById('error')
        this.clearErrors(div)
        const username = document.getElementById('username');
        const password = document.getElementById('password');
        const dob = document.getElementById('dob');
        const empty = document.createElement('p')
        empty.classList.add('error-s')
        var msg = this.signupError(username, password, dob)
        if (msg === '') {
            msg = this.signupError(dob, username, password)
        }
        if (msg === '') {
            msg = this.signupError(password, dob, username)
        }
        if (msg !== '') {
            empty.textContent = msg
            event.preventDefault();
            this.clearValue(username)
            this.clearValue(password)
            this.clearValue(dob)
            div.appendChild(empty)
            return
        }
        var checkdob = this.birthdate(dob)
        if (checkdob !== '') {
            empty.textContent = checkdob
            event.preventDefault();
            this.clearValue(username)
            this.clearValue(password)
            this.clearValue(dob)
            div.appendChild(empty)
            return
        }
        this.setState({
            username: username.value,
            password: password.value,
            dob: dob.value,
        })
        var auth = this.authenticate(username)
        if (auth === true) {
            this.showModal(event);
        } else {
            empty.textContent = auth
            event.preventDefault();
            this.clearValue(username)
            this.clearValue(password)
            this.clearValue(dob)
            div.appendChild(empty)
            return
        }
    }

    showModal(event) {
        this.setState ({
            avatar: !this.state.avatar
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className="bg-color">
                <img src={background} alt="bg" className="bg"/>
                <Modal show={this.state.avatar} data={this.state} onClose={this.showModal.bind(this)}>
                </Modal>
                <div id='signup-form' className="signup-form" align = "center" hidden={this.state.avatar}>
                    <form className="pure-form pure-form-aligned">
                        <fieldset className="signup-fieldset">
                        <a href='#/home'><img src={logo} className='logo-signup' href='#/home'alt="Website logo"/></a>
                            <div className="welcome">
                                <img className = "signup-logo" src={signup_logo} alt=""/>
                                <p className="login-signup-title">Get Started!</p>
                            </div>
                            <div id = "error"></div>
                            <div className='inputs'>
                                <div className="pure-control-group">
                                    <input id="username" type="text" placeholder="Username">
                                    </input>
                                </div>
                                <div className="pure-control-group">
                                    <input className='dob' id="dob" type="date" placeholder="DOB (--/--/----)">
                                    </input>
                                </div>
                                <div className="pure-control-group">
                                    <input id="password" type="password" placeholder="Password">
                                    </input>
                                </div>
                                <NavLink className = " nav-link pure-button login-button signup-button font" to="/home" onClick={this.handleSubmit.bind(this)}>Signup</NavLink>
                                <div className="signup-nav">
                                    <NavLink className = "nav-link login-link" to="/login">Already have an account? Login now!</NavLink>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                
            </div>
        );
    }
}