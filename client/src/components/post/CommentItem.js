import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="/profile" rel="noopener noreferrer">
              <img
                src={comment.avatar}
                alt="post diplay"
                className="rounded-circle d-none d-md-block"
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
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

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
