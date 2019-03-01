import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

// Actions
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import Spinner from "../helpers/Spinner";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p>
              Welcome,{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experiences={profile.experience} />
            <Education educations={profile.education} />

            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete Account
              </button>
            </div>
          </div>
        );
      } else {
        // User has no profile, Let's create one

        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You dont have a profile yet, please add one</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
