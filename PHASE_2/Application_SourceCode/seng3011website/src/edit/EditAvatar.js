import React, { Component } from "../../node_modules/react";
import PropTypes from 'prop-types';
import '../css/Login.css';
import ReactCardCarousel from "react-card-carousel";
import {Animated} from "react-animated-css";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import { NavLink } from "../../node_modules/react-router-dom";

import i1 from '../img/userimage1.png';
import i2 from '../img/userimage2.png';
import i3 from '../img/userimage3.png';
import i4 from '../img/userimage4.png';
import i5 from '../img/userimage5.png';
import i6 from '../img/userimage6.png';
import i7 from '../img/userimage7.png';
import i8 from '../img/userimage8.png';
import i9 from '../img/userimage9.png';
import i10 from '../img/userimage10.png';
import i11 from '../img/userimage11.png';
import i12 from '../img/userimage12.png';
import i13 from '../img/userimage13.png';
import i14 from '../img/userimage14.png';
import i15 from '../img/userimage15.png';
import i16 from '../img/userimage16.png';
import i17 from '../img/userimage17.png';
import i18 from '../img/userimage18.png';
import i19 from '../img/userimage19.png';
import i20 from '../img/userimage20.png';
import i21 from '../img/userimage21.png';
import i22 from '../img/userimage22.png';
import i23 from '../img/userimage23.png';
import i24 from '../img/userimage24.png';
import i25 from '../img/userimage25.png';


class Modal1 extends Component {
    state = {
        vis: true
    }


        constructor(props) {
            super(props);
        };

    static get CONTAINER_STYLE() {
        return {
          position: "relative",
          top: "-150px",
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "middle",
        };
      }

      static get CARD_STYLE1() {
        return {
            height: "400px",
            width: "300px",
            paddingTop: "30px",
          textAlign: "center",
          background: "#7CDBD5",
          color: "#FFF",
          fontFamily: "sans-serif",
          fontSize: "12px",
          borderRadius: "10px",
          boxSizing: "border-box",

        };
      }

      static get CARD_STYLE2() {
        return {
            height: "400px",
            width: "300px",
            paddingTop: "30px",
          textAlign: "center",
          background: "#F9BE02",
          color: "#FFF",
          fontFamily: "sans-serif",
          fontSize: "12px",
          borderRadius: "10px",
          boxSizing: "border-box",
        };
      }

      static get CARD_STYLE3() {
        return {
            height: "400px",
            width: "300px",
            paddingTop: "30px",
          textAlign: "center",
          background: "#F53240",
          color: "#FFF",
          fontFamily: "sans-serif",
          fontSize: "12px",
          borderRadius: "10px",
          boxSizing: "border-box"
        };
      }
      static get CARD_STYLE4() {
        return {
            height: "400px",
            width: "300px",
            paddingTop: "30px",
          textAlign: "center",
          background: "#1e4b57",
          color: "#FFF",
          fontFamily: "sans-serif",
          fontSize: "12px",
          borderRadius: "10px",
          boxSizing: "border-box"
        };
      }
      static get CARD_STYLE5() {
        return {
            height: "400px",
            width: "300px",
            paddingTop: "30px",
          textAlign: "center",
          background: "#37836f",
          color: "#FFF",
          fontFamily: "sans-serif",
          fontSize: "12px",
          borderRadius: "10px",
          boxSizing: "border-box"
        };
      }

    toggle(image) {
        this.setState({ vis: false })
        //add to user db
        const userObject = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            dob: localStorage.getItem('dob'),
            image: image
        };
        axios.post('/delete', userObject)
        localStorage.setItem('image', image)
        window.location.reload()
        setTimeout(function() { //Start the timer
            this.props.history.push('/profile');
        }.bind(this), 1000)
        //window.location.replace("/#/profile")

    }

    render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="edit-avatar-modal"
    >
    <Modal.Header closeButton>            <h2 className="edit-box-title">Select an Avatar</h2>

    </Modal.Header>
    <Modal.Body>
                <div style={Modal1.CONTAINER_STYLE}>
                    <ReactCardCarousel>
                        <div style={Modal1.CARD_STYLE2}>
                            <img width='250px' height='250px' alt='userimage1.png' src={i1}/>
                            <button className = "report-button1" type="button" onClick={this.toggle.bind(this, 'userimage1.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE1}>
                            <img width='250px' height='250px' alt='userimage2.png' src={i2}/>
                            <button className = "report-button2" type="button" onClick={this.toggle.bind(this, 'userimage2.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE3}>
                            <img width='250px' height='250px' alt='userimage3.png' src={i3}/>
                            <button className = "report-button3" type="button" onClick={this.toggle.bind(this, 'userimage3.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE4}>
                            <img width='250px' height='250px' alt='userimage4.png' src={i4}/>
                            <button className = "report-button4" type="button" onClick={this.toggle.bind(this, 'userimage4.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE5}>
                            <img width='250px' height='250px' alt='userimage5.png' src={i5}/>
                            <button className = "report-button5" type="button" onClick={this.toggle.bind(this, 'userimage5.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE2}>
                            <img width='250px' height='250px' alt='userimage6.png' src={i6}/>
                            <button className = "report-button1" type="button" onClick={this.toggle.bind(this, 'userimage6.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE1}>
                            <img width='250px' height='250px' alt='userimage7.png' src={i7}/>
                            <button className = "report-button2" type="button" onClick={this.toggle.bind(this, 'userimage7.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE3}>
                            <img width='250px' height='250px' alt='userimage8.png' src={i8}/>
                            <button className = "report-button3" type="button" onClick={this.toggle.bind(this, 'userimage8.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE4}>
                            <img width='250px' height='250px' alt='userimage9.png' src={i9}/>
                            <button className = "report-button4" type="button" onClick={this.toggle.bind(this, 'userimage9.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE5}>
                            <img width='250px' height='250px' alt='userimage10.png' src={i10}/>
                            <button className = "report-button5" type="button" onClick={this.toggle.bind(this, 'userimage10.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE2}>
                            <img width='250px' height='250px' alt='userimage11.png' src={i11}/>
                            <button className = "report-button1" type="button" onClick={this.toggle.bind(this, 'userimage11.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE1}>
                            <img width='250px' height='250px' alt='userimage12.png' src={i12}/>
                            <button className = "report-button2" type="button" onClick={this.toggle.bind(this, 'userimage12.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE3}>
                            <img width='250px' height='250px' alt='userimage13.png' src={i13}/>
                            <button className = "report-button3" type="button" onClick={this.toggle.bind(this, 'userimage13.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE4}>
                            <img width='250px' height='250px' alt='userimage14.png' src={i14}/>
                            <button className = "report-button4" type="button" onClick={this.toggle.bind(this, 'userimage14.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE5}>
                            <img width='250px' height='250px' alt='userimage15.png' src={i15}/>
                            <button className = "report-button5" type="button" onClick={this.toggle.bind(this, 'userimage15.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE2}>
                            <img width='250px' height='250px' alt='userimage16.png' src={i16}/>
                            <button className = "report-button1" type="button" onClick={this.toggle.bind(this, 'userimage16.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE1}>
                            <img width='250px' height='250px' alt='userimage17.png' src={i17}/>
                            <button className = "report-button2" type="button" onClick={this.toggle.bind(this, 'userimage17.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE3}>
                            <img width='250px' height='250px' alt='userimage18.png' src={i18}/>
                            <button className = "report-button3" type="button" onClick={this.toggle.bind(this, 'userimage18.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE4}>
                            <img width='250px' height='250px' alt='userimage19.png' src={i19}/>
                            <button className = "report-button4" type="button" onClick={this.toggle.bind(this, 'userimage19.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE5}>
                            <img width='250px' height='250px' alt='userimage20.png' src={i20}/>
                            <button className = "report-button5" type="button" onClick={this.toggle.bind(this, 'userimage20.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE2}>
                            <img width='250px' height='250px' alt='userimage21.png' src={i21}/>
                            <button className = "report-button1" type="button" onClick={this.toggle.bind(this, 'userimage21.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE1}>
                            <img width='250px' height='250px' alt='userimage22' src={i22}/>
                            <button className = "report-button2" type="button" onClick={this.toggle.bind(this, 'userimage22.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE3}>
                            <img width='250px' height='250px' alt='userimage23' src={i23}/>
                            <button className = "report-button3" type="button" onClick={this.toggle.bind(this, 'userimage23.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE4}>
                            <img width='250px' height='250px' alt='userimage24' src={i24}/>
                            <button className = "report-button4" type="button" onClick={this.toggle.bind(this, 'userimage24.png')}> Pick Me </button>
                        </div>
                        <div style={Modal1.CARD_STYLE5}>
                            <img width='250px' height='250px' alt='userimage25' src={i25}/>
                            <button className = "report-button5" type="button" onClick={this.toggle.bind(this, 'userimage25.png')}> Pick Me </button>
                        </div>
                    </ReactCardCarousel>
                </div>
        </Modal.Body>
        </Modal>
    );
  }
}

Modal1.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default withRouter(Modal1);
