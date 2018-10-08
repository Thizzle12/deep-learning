import React, { Component } from 'react';
import ServerCalls from '../ServerCalls'
import './css/UserCreation.css'

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
        userName: "",
        email: "",
        password: "",
        uuid : "",
        yob: 1991,
        gender: "MALE",
        yobList: yobList,
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
      this.createUser();
    }

    //id should be uuidv4()
    createUser = () =>{
      console.log("Creating")
      var user = {
        "id": 1,
        "userName": this.state.userName,
        "password": this.state.password,
        "email": this.state.email,
        "yob": this.state.yob,
        "gender": this.state.gender

      }
      ServerCalls.createUser(user, this.userCreationResponse)
    }

    userCreationResponse = (response) =>{
      console.log(response)
    }

    render(){
      console.dir(this.state)
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
              <div className="input-label">Email</div>
              <input type="email" className="input-field" id="email" name="email" placeholder="Your email.."/>

            </div>
            <div className="input-div">
              <label className="input-label">Password</label>
              <input type="password" className="input-field" id="password" name="password" placeholder="Your password.."/>
            </div>
            <div className="input-div">
              <label className="input-label">Confirm Password</label>
              <input type="password" className="input-field"
               id="Confirm-password" name="Confirm-password" placeholder="Confirm password.."/>
            </div>
            <div className="input-div">
              <label className="input-label">Select Year of Birth</label>
              <select value={this.state.yob} name="yob" className="selection-box" id="age-selection"
               onChange={this.selectAge}>
                {yob}
              </select>
            </div>
            <div className="input-div">
              <label className="input-label">Select Gender</label>
              <select value={this.state.gender} name="gender" className="selection-box" id="gender-selection"
               onChange={this.selectGender}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
            <div id="create-user-btn" onClick={this.validateInfo}>Create User</div>
          </form>
        </div>
      )
    }
}

export default UserCreation;
