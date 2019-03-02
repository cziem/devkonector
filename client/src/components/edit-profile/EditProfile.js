import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import TextFieldGroup from "../helpers/TextFieldGroup";
import TextAreaFieldGroup from "../helpers/TextAreaFieldGroup";
import SelectListGroup from "../helpers/SelectListGroup";
import InputGroup from "../helpers/InputGroup";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skiils array back to CSV
      const skillsCSV = profile.skills.join(",");

      // if profile field doesnt exisit, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.github_username = !isEmpty(profile.github_username)
        ? profile.github_username
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.skills = !isEmpty(skillsCSV) ? skillsCSV : "";

      // For socials
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedIn = !isEmpty(profile.social.linkedIn)
        ? profile.social.linkedIn
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skills,
        github_username: profile.github_username,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedIn: profile.linkedIn,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    // Get data from state
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      github_username: this.state.github_username,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, dispalySocialInputs } = this.state;

    let socialInputs;

    if (dispalySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            error={errors.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            error={errors.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            error={errors.instagram}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            error={errors.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="LinkedIn profile URL"
            name="linkedIn"
            icon="fab fa-linkedin"
            value={this.state.linkedIn}
            error={errors.linkedIn}
            onChange={this.onChange}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      {
        label: "* Select Professional Status",
        value: 0
      },
      {
        label: "Developer",
        value: "Developer"
      },
      {
        label: "Junior Developer",
        value: "Junior Developer"
      },
      {
        label: "Senior Developer",
        value: "Senior Developer"
      },
      {
        label: "Designer",
        value: "Designer"
      },
      {
        label: "Junior Designer",
        value: "Junior Designer"
      },
      {
        label: "Senior Designer",
        value: "Senior Designer"
      },
      {
        label: "Manager",
        value: "Manager"
      },
      {
        label: "Product Manager",
        value: "Product Manager"
      },
      {
        label: "Student or Learning",
        value: "Student or Learning"
      },
      {
        label: "Instructor or Teacher",
        value: "Instructor or Teacher"
      },
      {
        label: "Intern",
        value: "Intern"
      },
      {
        label: "Others",
        value: "Others"
      }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="dispaly-4 text-center">Edit your profile</h1>
              <p className="lead text-center">Update your profile data</p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Profile Handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname etc."
                />
                <SelectListGroup
                  name="status"
                  placeholder="Status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your company or the one you work for"
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your website or company website"
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or City & state suggested e.g (Nigeria, Abia)"
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values e.g: (JavaScript, NodeJs, React, Vue, HTML, CSS, PHP)"
                />
                <TextFieldGroup
                  name="github_username"
                  placeholder="GitHub Username"
                  value={this.state.github_username}
                  onChange={this.onChange}
                  error={errors.github_username}
                  info="If you want your latest repos & a GitHub link, add your GitHub username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio about yourself..."
                  name="bio"
                  onChange={this.onChange}
                  value={this.state.bio}
                  info="Tell us a little about yourself"
                />

                {/* Social Networks Section */}
                <div className="mb-3">
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        dispalySocialInputs: !prevState.dispalySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                    type="button"
                  >
                    Add Social Network Links{" "}
                  </button>
                  <span className="text-muted">optional</span>
                </div>

                {socialInputs}

                {/* Submit */}
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
