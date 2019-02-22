const mongoose = require("mongoose");
const Profile = require("../model/Profile");
const User = require("../model/User");

const validateProfileInput = require("../validation/profile");
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");

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
  },

  getPublicHandle: async (req, res) => {
    const errors = {};

    try {
      let profile = await Profile.findOne({
        handle: req.params.handle
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        errors.noProfile = `${req.user.name} currently has no profile`;
        return res.status(404).json({
          errors,
          success: false
        });
      }

      res.json(profile);
    } catch (error) {
      errors.noProfile = `${req.params.handle} has no profile`;
      res.status(404).json({
        errors,
        success: false
      });
    }
  },

  getUserByID: async (req, res) => {
    const errors = {};

    try {
      let profile = await Profile.findOne({
        user: req.params.user_id
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        errors.noProfile = `${req.user.name} currently has no profile`;
        return res.status(404).json({
          errors,
          success: false
        });
      }

      res.json(profile);
    } catch (error) {
      errors.noProfile = `Invalid Credentials. Check the userID...`;
      res.status(404).json({
        errors,
        success: false
      });
    }
  },

  getAllProfiles: async (req, res) => {
    const errors = {};

    try {
      let profiles = await Profile.find({}).populate("user", [
        "name",
        "avatar"
      ]);

      if (!profiles) {
        errors.noProfiles = "There are no profiles";
        return res.status(404).json({
          errors,
          success: false
        });
      }

      res.json(profiles);
    } catch (error) {
      errors.noProfiles = "There are no profiles";
      return res.status(400).json({
        errors,
        success: false
      });
    }
  },

  addExperience: async (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check for validity
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      // Find Profile
      let foundProfile = await Profile.findOne({ user: req.user.id });

      if (foundProfile) {
        const experience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        foundProfile.experience.unshift(experience);

        let profile = await foundProfile.save();
        return res.json(profile);
      }
    } catch (error) {
      errors.noProfile = `${req.user.name} has no profile yet`;
      return res.status(404).json({
        errors,
        success: false
      });
    }
  },

  addEducation: async (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check for validity
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      // Find Profile
      let foundProfile = await Profile.findOne({ user: req.user.id });

      if (foundProfile) {
        const education = {
          school: req.body.school,
          degree: req.body.degree,
          field_of_study: req.body.field_of_study,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        foundProfile.education.unshift(education);

        let profile = await foundProfile.save();
        return res.json(profile);
      }
    } catch (error) {
      errors.noProfile = `${req.user.name} has no profile yet`;
      return res.status(404).json({
        errors,
        success: false
      });
    }
  },

  deleteExperience: async (req, res) => {
    const errors = {};

    try {
      // Find Profile
      let foundProfile = await Profile.findOne({ user: req.user.id });

      if (foundProfile) {
        const removeIndex = foundProfile.experience
          .map(exp => exp.id)
          .indexOf(req.params.exp_id);

        // If experience was not found
        if (removeIndex === -1) {
          errors.noExperience = "Experince not found in our DB...";
          return res.status(404).json({
            errors,
            success: false
          });
        }

        // Splice out of the array
        foundProfile.experience.splice(removeIndex, 1);

        // Save and return to client
        let profile = await foundProfile.save();
        res.json(profile);
      }
    } catch (error) {
      errors.noProfile = `${req.user.name} has no profile yet`;
      return res.status(404).json({
        errors,
        success: false
      });
    }
  }
};
