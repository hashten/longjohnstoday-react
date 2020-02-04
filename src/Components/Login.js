import { NavLink } from "react-router-dom";
import React from 'react';

class Login extends React.Component {
  state = { username: "", log: [] };
  /* Handle for login form submission */
  submitUsername = () => {
    event.preventDefault();

    let username = this.state.username;

    if (!username) {
      alert('Username is missing!')
      return
    }

    getGetAssertionChallenge({ username: username })
      .then((response) => {
        this.addToLog("Response on getGetAssertionChallange: " + response);
        let publicKey = preformatGetAssertReq(response);
        return navigator.credentials.get({ publicKey })
      })
      .then((response) => {
        console.log()
        let getAssertionResponse = publicKeyCredentialToJSON(response);
        return sendWebAuthnResponse(getAssertionResponse)
      })
      .then((response) => {
        if (response.status === 'ok') {
          loadMainContainer()
        } else {
          alert(`Server responed with error. The message is: ${response.message}`);
        }
      })
      .catch((error) => alert(error))
  }

  getGetAssertionChallenge = (formBody) => {
    return fetch('/webauthn/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formBody)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status !== 'ok')
          throw new Error(`Server responed with error. The message is: ${response.message}`);

        return response
      })
  }

  /**
   * Decodes arrayBuffer required fields.
   */
  preformatGetAssertReq = (getAssert) => {
    getAssert.challenge = base64url.decode(getAssert.challenge);

    for (let allowCred of getAssert.allowCredentials) {
      allowCred.id = base64url.decode(allowCred.id);
    }

    return getAssert
  }

  addToLog = (text) => {
    this.setState({
      log: this.state.log.concat([<p style={{ color: "#FFFFFF", padding: 0, margin: 0 }}>{text}</p>])
    });
  }
  handleChangeUsername = (event) => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  clickHandler = (event) => {
    event.preventDefault();
    this.addToLog("Form submitted");
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center h-100 vertical-center">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon">
                <span><i className="fab fa-facebook-square" /></span>
                <span><i className="fab fa-google-plus-square" /></span>
                <span><i className="fab fa-twitter-square" /></span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={this.clickHandler} >
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                  <input type="text" className="form-control" placeholder="username" value={this.state.username} onChange={this.handleChangeUsername} />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key" /></span>
                  </div>
                  <input type="password" className="form-control" placeholder="passwordless login" disabled="true" />
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" className="btn float-right login_btn" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<NavLink to="/register">Sign Up</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center h-100">
          <div class="card" style={{ width: "1000px", overflow: "auto" }}>
            {this.state.log}
          </div>
        </div>
      </div>
    );
  }
};

export default Login;