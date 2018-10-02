import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      imageURL: "",
      content: "",
      redirect: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleImageURLChange = this.handleImageURLChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.createPosts = this.createPosts.bind(this);
  }

  handleTitleChange(title) {
    this.setState({ title });
  }

  handleImageURLChange(imageURL) {
    this.setState({ imageURL });
  }

  handleContentChange(content) {
    this.setState({ content });
  }

  handlePostClick() {
    let { title, imageURL, content } = this.state;
    let { id } = this.props;
    // console.log(this.props);
    this.createPosts(id, title, imageURL, content);
  }

  createPosts(id, title, imageURL, content) {
    // console.log(id, title, imageURL, content);
    axios
      .post(`/api/create/${id}`, { title, imageURL, content })
      .then(res => {
        // console.log(res);
        this.setState({ posts: res.data });
      })
      .then(() => {
        this.setState({
          redirect: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let { title, imageURL, content } = this.state;
    return (
      <div>
        <h2>Form</h2>
        <br />
        <br />

        <br />
        <br />

        <input
          onChange={e => this.handleTitleChange(e.target.value)}
          type="text"
          value={title || ""}
          placeholder="Title"
        />
        <br />
        <br />

        <input
          onChange={e => this.handleImageURLChange(e.target.value)}
          type="text"
          value={imageURL || ""}
          placeholder="URL"
        />
        <br />
        <br />

        <input
          onChange={e => this.handleContentChange(e.target.value)}
          type="text"
          value={content || ""}
          placeholder="Body"
        />
        <br />
        <br />
        <button
          type="post createbutton"
          onClick={() => this.handlePostClick()}
          className="Post_Create_Button"
        >
          Post
        </button>
        {this.state.redirect && <Redirect to="/dashboard" />}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(Form);
