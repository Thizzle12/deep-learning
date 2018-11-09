import React, { Component } from 'react';
import ServerCalls from '../ServerCalls'
import './css/UserCreation.css'
import uuidv4 from 'uuid/v4'
import Base64 from 'base-64'

class UserCreation extends Component {
    state={
      yobList: [],
    }

    componentDidMount(){
      var yobList = [];
      for(var i = 0; i < 100; i++){
        yobList.push(1920 + i);
      }

      //YOB is year of birth
      this.setState({
        username: "",
        email: "",
        password: "",
        validatedPassword: "",
        uuid : "",
        yob: 1991,
        gender: "MALE",
        yobList: yobList,
      })
    }

    setUsername = (evt) =>{
      this.setState({
        username: evt.target.value,
      })
    }

    setEmail = (evt) =>{
      this.setState({
        email: evt.target.value,
      })
    }

    setPassword = (evt) =>{
      this.setState({
        password: evt.target.value,
      })
    }

    setValidatedPassword = (evt) =>{
      this.setState({
        validatedPassword: evt.target.value,
      })
    }

    selectAge = (evt) =>{
      this.setState({
        yob: evt.target.value,
      })
    }

    selectGender = (evt) =>{
      this.setState({
        gender: evt.target.value,
      })
    }

    validateInfo = () =>{
      console.log("Validating")

      if(this.state.password !== this.state.validatedPassword){
        console.log("Passwords are not the same");
        return
      }
      if(this.state.password.length < 8 || this.state.password.length > 24){
        console.log("Password length is invalid")
        return
      }
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      if(!strongRegex.test(this.state.password )){
        console.log("Password is not strong enough")
        return
      }
      if(!this.state.email.includes("@") || !this.state.email.includes(".")){
        console.log("Invalid email")
        return
      }


      this.createUser();
    }

    //id should be uuidv4()
    createUser = () =>{
      console.log("Creating")
      var user = {
        "id": uuidv4(),
        "userName": this.state.username,
        "password": this.state.password,
        "email": Base64.encode(this.state.email),
        "yob": this.state.yob,
        "gender": this.state.gender

      }
      ServerCalls.createUser(user, this.userCreationResponse)
    }

    userCreationResponse = (response) =>{
      console.log(response)
    }

    render(){
      const yob = this.state.yobList.map((yob, idx) =>
        <option key={idx} value={yob} className="age-option" >
          {yob}
        </option>
      );

      return(
        <div id="create-user-div">
          <h2 className="title">Create User</h2>
          <form>
            <div className="input-div">
              <div className="input-label">Username</div>
              <input type="text" className="input-field" id="username" name="username" placeholder="Your username.." onChange={this.setUsername}/>
            </div>
            <div className="input-div">
              <div className="input-label">Email</div>
              <input type="email" className="input-field" id="email" name="email" placeholder="Your email.." onChange={this.setEmail}/>
            </div>
            <div className="input-div">
              <label className="input-label">Password</label>
              <input type="password" className="input-field" id="password" name="password" placeholder="Your password.." onChange={this.setPassword}/>
            </div>
            <div className="input-div">
              <label className="input-label">Confirm Password</label>
              <input type="password" className="input-field"
               id="Confirm-password" name="Confirm-password" placeholder="Confirm password.." onChange={this.setValidatedPassword}/>
            </div>
            <div id="BaG-container">
              <div className="input-div" id="yob-div">
                <label className="input-label" id="yob-label">Select Year of Birth</label>
                <select value={this.state.yob} name="yob" className="selection-box" id="yob-selection"
                 onChange={this.selectAge}>
                  {yob}
                </select>
              </div>
              <div className="input-div" id="gender-div">
                <label className="input-label" id="gender-label">Select Gender</label>
                <select value={this.state.gender} name="gender" className="selection-box" id="gender-selection"
                 onChange={this.selectGender}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>
            <div id="create-user-btn" onClick={this.validateInfo}>Create User</div>
          </form>
        </div>
      )
    }
}

export default UserCreation;
