import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { TextFieldGroup } from "../helpers/TextFieldGroup";
import { TextAreaFieldGroup } from "../helpers/TextAreaFieldGroup";
import { SelectGroup } from "../helpers/SelectGroup";
import { InputGroup } from "../helpers/InputGroup";

class CreateProfile extends Component {
  state = {
    dispalySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    github_username: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedIn: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="dispaly-4 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile unique
              </p>
              <small className="d-block pb-3">* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
