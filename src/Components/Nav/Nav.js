import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      userid: 0,
      username: ""
    };
    this.handleclicklogout = this.handleclicklogout.bind(this);
  }
  componentDidMount() {
    axios.get(`/api/session`).then(res => {
      console.log(res);
      this.setState({ userid: res.data.userid, username: res.data.username });
      console.log("commit");
    });
  }

  handleclicklogout() {
    axios.post(`/api/auth/logout`).then(res => {
      this.setState({ userid: "", username: "" });
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        Nav Bar
        <h1 className="App-title">Nav</h1>
        <button>
          <Link to="/dashboard">Home</Link>
        </button>
        <button>
          <Link to="/new">New Post</Link>
        </button>
        <button onClick={() => this.handleclicklogout()}>
          <Link to="/">Logout</Link>
        </button>
        {/* <h5>{this.props.user_name}</h5> */}
        <h5>{this.state.username}</h5>
        <h6>{this.state.userid}</h6>
        <img src={this.props.profile_pic} height="100" width="100" alt="" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Nav);
