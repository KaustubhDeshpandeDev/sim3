import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      search: "",
      myposts: true,
      editing: false,
      content: ""
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResetChange = this.handleResetChange.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
    this.getMyPosts = this.getMyPosts.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleEditFunc = this.handleEditFunc.bind(this);
    this.handleSendEdit = this.handleSendEdit.bind(this);
  }

  handleSearchChange(search) {
    this.setState({ search });
  }

  handleResetChange() {
    this.setState({ search: "", myposts: true });
  }

  handleMyPostsChange() {
    this.setState({ myposts: false });
  }

  handleClickSearch() {
    let { search, myposts } = this.state;
    let { id } = this.props;
    this.getMyPosts(id, search, myposts);
  }

  componentDidMount(getAllMyPosts) {
    this.getAllPosts();
  }

  getAllPosts() {
    axios.get(`/api/posts`).then(res => {
      // console.log(res);
      this.setState({ posts: res.data });
    });
  }

  getMyPosts(id, search, myposts) {
    // console.log(id, search, myposts);

    axios
      .post(`/api/posts/${id}`, { search: search, myposts: myposts })
      .then(res => {
        // console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }
  handleEditing() {
    this.setState({ editing: true });
    // console.log(this.state.editing);
  }
  handleEditFunc(content) {
    this.setState({ content });
  }

  handleSendEdit(title) {
    this.setState({ editing: false });
    // console.log(title);
    // console.log(this.state.content);
    axios
      .put(`/api/post/${title}`, { content: this.state.content })
      .then(res => {
        // console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log(this.state);
    // console.log(this.props);
    let posts = this.state.posts
      .filter((post, i) => {
        // console.log(post);
        let { title } = post;
        return title.includes(this.state.search);
      })
      .map((post, i) => {
        // console.log(post.id);
        let { id, title, profile_pic, img, username, content } = post;
        // console.log(title);
        return (
          <div key={i}>
            <div>{title}</div>
            <img src={img} alt="" height="120" width="120" />
            {!this.state.editing ? (
              <p onClick={e => this.handleEditing(e)}>{content}</p>
            ) : (
              <input
                onChange={e => this.handleEditFunc(e.target.value)}
                onBlur={e => this.handleSendEdit(title)}
              />
            )}
            <br />
            <Link to={`/post/${id}`}>Details</Link>
            <br />
            <div>{username}</div>
            <img src={profile_pic} alt="" height="60" width="60" />
          </div>
        );
      });
    return (
      <div>
        <h1>Dashboard</h1>
        <input
          onChange={e => this.handleSearchChange(e.target.value)}
          type="text"
          value={this.state.search || ""}
          placeholder="Search Posts by Title"
        />
        <br />
        <input
          type="checkbox"
          defaultChecked={this.state.myposts}
          name="myPosts_checkbox"
          onChange={() => this.handleMyPostsChange()}
        />
        My Posts
        <br />
        <br />
        <button
          type="search button"
          onClick={() => this.handleClickSearch()}
          className="Search_Button"
        >
          Search Posts
        </button>
        <br />
        <button
          className="Cancel_Button"
          onClick={() => this.handleResetChange()}
        >
          Reset
        </button>
        {posts}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(Dashboard);
