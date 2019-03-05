import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

// import { getPosts } from "../../actions/postActions";

class PostItem extends Component {
  // componentDidMount = () => {
  //   this.props.getPosts();
  // };

  onDeleteClick(id) {
    //
  }

  render() {
    const { post, auth } = this.props;

    console.log(post);

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                src={post.avatar}
                alt="post diplay"
                className="rounded-circle d-none d-md"
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button className="btn btn-light mr-1" type="button">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button className="btn btn-light mr-1" type="button">
              <i className="text-secondary fas fa-thumbs-down" />
              <span className="badge badge-light">4</span>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDeleteClick.bind(this, post._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
