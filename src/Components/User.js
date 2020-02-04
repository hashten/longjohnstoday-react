import React from 'react';
import agent from '../agent';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      currentuser: null
    };
  }
  componentDidMount() {
    agent.User.current()
      .then(result => {
        this.setState({
          currentuser: result.user
        });
      });
  }

  render() {
    return (
      <div class="content">
        <h2>{this.state.currentuser}</h2>
        <p>User data:</p>
        <ol>
          <li>Name: {this.state.currentuser}</li>
          <li>City: </li>
          <li>Long Johns temperature:</li>
        </ol>
      </div>
    );
  }
};

export default User;