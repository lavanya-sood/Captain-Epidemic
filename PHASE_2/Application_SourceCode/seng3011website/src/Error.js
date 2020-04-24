import React from 'react';
import PageNotFound from './img/404.png';
import './css/Error.css';
import logo from './img/Logo.png';
import back from './img/back.png';

class NotFoundPage extends React.Component{
      goBack() {
        console.log(window.history)
        window.history.back()
      }
    	render(){
        return (
        <div>
            <img src={PageNotFound}  alt='bg' className='bg-err'/>
            <a href='#/home'><img src={logo} className='home-logo' alt="Website logo"/></a>
            <div>
              <button onClick={this.goBack}><img src={back} alt='back' className='back'/></button>
            </div>
          </div>
        )
    }
}
export default NotFoundPage;