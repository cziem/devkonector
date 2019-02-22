const mongoose = require("mongoose");
const Profile = require("../model/Profile");
const User = require("../model/User");

const validateProfileInput = require("../validation/profile");

module.exports = {
  getProfile: async (req, res) => {
    const errors = {};

    try {
      let profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

      if (!profile) {
        errors.noProfile = `${req.user.name} currently has no profile`;
        return res.status(404).json({
          errors,
          success: false
        });
      }

      res.json(profile);
    } catch (error) {
      res.status(404).json({
        error,
        success: false
      });
    }
  },

  createProfile: async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check for validity
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    // Check for available fields and assign them...
    req.body.handle ? (profileFields.handle = req.body.handle) : "";
    req.body.company ? (profileFields.company = req.body.company) : "";
    req.body.website ? (profileFields.website = req.body.website) : "";
    req.body.location ? (profileFields.location = req.body.location) : "";
    req.body.bio ? (profileFields.bio = req.body.bio) : "";
    req.body.status ? (profileFields.status = req.body.status) : "";
    req.body.github_username
      ? (profileFields.github_username = req.body.github_username)
      : "";

    // skills
    req.body.skills ? (profileFields.skills = req.body.skills.split(",")) : "";

    // socials
    profileFields.social = {};
    req.body.youtube ? (profileFields.social.youtube = req.body.youtube) : "";
    req.body.facebook
      ? (profileFields.social.facebook = req.body.facebook)
      : "";
    req.body.twitter ? (profileFields.social.twitter = req.body.twitter) : "";
    req.body.linkedIn
      ? (profileFields.social.linkedIn = req.body.linkedIn)
      : "";
    req.body.instagram
      ? (profileFields.social.instagram = req.body.instagram)
      : "";

    // check for profile
    let foundProfile = await Profile.findOne({ user: req.user.id });

    if (foundProfile) {
      // Profile exists, Let's update it
      try {
        let updateProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(updateProfile);
      } catch (error) {
        res.status(400).json({
          error,
          success: false
        });
      }
    } else {
      // User has no profile, Let's create one

      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "That handle already exists";
          return res.status(400).json({
            errors,
            success: false
          });
        }

        // Save new profile handle
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  }
};
