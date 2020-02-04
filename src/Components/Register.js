import { NavLink } from "react-router-dom";
import React from 'react';

class Register extends React.Component {

  state = { username: "", log: [] };
  
  addToLog = (text) => {
    this.setState({
      log: this.state.log.concat([<p style={{ color: "#FFFFFF", padding:0, margin:0 }}>{text}</p>])
    });
  }

  render() {
    return (
<div className="container">
        <div className="d-flex justify-content-center h-100 vertical-center">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
              <div className="d-flex justify-content-end social_icon">
                <span><i className="fab fa-facebook-square" /></span>
                <span><i className="fab fa-google-plus-square" /></span>
                <span><i className="fab fa-twitter-square" /></span>
              </div>
            </div>
            <div className="card-body">
              <form>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="username" />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input type="password" className="form-control" placeholder="passwordless register" disabled="true" />
                </div>
                <div className="form-group">
                  <input type="submit" Value="Register" className="btn float-right login_btn" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Already have an account?<NavLink to="/login">Login</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center h-100">
          <div class="card" style={{width:"1000px", overflow:"auto"}}>
            {this.state.log}
          </div>
        </div>
      </div>
    );
  }
};

export default Register;