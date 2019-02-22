const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: String,
  github_username: String,
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      field_of_study: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedIn: String,
    instagram: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("Profile", profileSchema);
