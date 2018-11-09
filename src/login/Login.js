import React, { Component } from 'react';
import './css/Login.css'
import ServerCalls from '../ServerCalls'

class Login extends Component {

  state={
    username: "",
    password: "",
  }

  setUsername = (evt) =>{
    this.setState({
      username : evt.target.value
    })
  }

  setPassword = (evt) =>{
    this.setState({
      password : evt.target.value
    })
  }

  login = () =>{
    if(this.state.username.length < 1 || this.state.password.length < 1){
      console.log("username and password are both required")
    }else{
      var objectBody = {
        "username": this.state.username,
        "password": this.state.password,
      }
      ServerCalls.login(objectBody ,this.handleLoginResponse);
    }
  }

  handleLoginResponse = (response) =>{
    if(response.id !== null){
      sessionStorage.setItem('id', response.id);
      this.props.toggleLogin();
    }
  }


  render(){

    return (

      <div id="login-div">
        <h2>Login</h2>
        <div className="input-div">
          <div className="input-label">Email</div>
          <input type="text" className="input-field" id="email" name="email" placeholder="Username" onChange={this.setUsername}/>
        </div>
        <div className="input-div">
          <label className="input-label">Password</label>
          <input type="password" className="input-field" id="password" name="password" placeholder="Password" onChange={this.setPassword}/>
        </div>
        <div id="login-btn" onClick={this.login}>Login</div>
      </div>

    );
  }

}

export default Login
