import React, { Component } from 'react';
import MenuPic from './image/menu.png';
import Theis from './image/members/theis.jpg';
import Henrik from './image/members/henrik.jpg';
import Rasmus from './image/members/rasmus.jpg';
import AiImg1 from './image/ai1.jpg'
import AiImg2 from './image/ai2.jpg'
import AiImg3 from './image/ai3.jpg'
import TicTacToeImg from './image/tictactoe.png'
import Coverflow from 'react-coverflow';
import Login from './login/Login'
import { StyleRoot } from 'radium';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class MainPage extends Component{
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      login: false,
    };
  }

  toggleLogin = () =>{
    this.setState({
      login: !this.state.login
    })
  }

  logout = () =>{
    console.log("Click")
    sessionStorage.setItem('id', undefined)
    this.setState({
      loggedIn : false,
    })
  }

  redirect = (path) => {
    console.log(path)
    this.props.history.push('/' + path);
  }


  render(){
    console.log(sessionStorage.getItem('id'))
    return (

      <div>
        <header>
          <nav>
            <a id="company-name">Heralox</a>
            <a className="info-button" href="#projects">Projects</a>
            <a className="info-button" href="#team">Team</a>
            <a className="info-button">About Us</a>
            {(sessionStorage.getItem('id') === undefined || sessionStorage.getItem('id') === 'undefined')?<span>
            <a className="info-button user-btn" onClick={() => this.redirect("createuser")}>Create User</a>
            <a className="info-button user-btn" onClick={() => this.toggleLogin()}>Login</a></span>:
            <a className="info-button user-btn" onClick={() => this.logout()}>Logout</a>
            }
            <a href="#team"><img id="menu-icon" src={MenuPic}/></a>
          </nav>
          {this.state.login ? <Login toggleLogin={this.toggleLogin}/> : <span></span>}
          <h1 id="front-page-title">The Art of Deep Learning</h1>
          <h2 id="front-page-info">This website is an attempt to create different kinds of AI using Deep Learning</h2>
        </header>

        <div id="projects">
          <h1>Projects</h1>
          <StyleRoot >
          <Coverflow
            width={1320}
            height={660}
            displayQuantityOfSide={1}
            navigation
            clickable={true}
            enableHeading
            media={{
              '@media (min-width: 700px)': {
                width: '600px',
                height: '300px'
              },
              '@media (min-width: 900px)': {
                width: '700px',
                height: '350px'
              },
              '@media (min-width: 1100px)': {
                width: '900px',
                height: '450px'
              },
              '@media (min-width: 1300px)': {
                width: '1100px',
                height: '650px'
              },
              '@media (min-width: 1300px)': {
                width: '1320px',
                height: '660px'
              }
            }}
          >
           <img src={TicTacToeImg} alt='TicTacToe' style={{ display: 'block', width: '100%' }} onClick={() => this.redirect("tictactoe")}/>
           <img src={AiImg2} alt='Number Recognition' style={{ display: 'block', width: '100%' }} onClick={() => this.redirect("numbers")}/>
           <img src={AiImg3} alt='title or description' style={{ display: 'block', width: '100%' }}/>
          </Coverflow>
          </StyleRoot>

        </div>
        <div className="team" id="team">
          <h2>The projects seen on this webpage was created by the talented team of Software Engineers from DTU</h2>
          <div className="members">
            <div className="person">
              <img src={Theis}/>
              <h3>Theis Friis</h3>
            </div>

          </div>
        </div>
        <footer>
          <a>This is a footer containing information</a>
        </footer>
      </div>

    );
  }

}

export default MainPage;
