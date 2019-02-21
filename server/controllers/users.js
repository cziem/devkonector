const gravatar = require("gravatar");
const bcyrpt = require("bcryptjs");

const User = require("../model/User");

module.exports = {
  // Get all Users
  allUsers: (req, res) => {
    res.json({
      message: "All users..."
    });
  },

  // Register a new user
  register: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // A user with the email already exists
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    // Register a New User
    try {
      const avatar = await gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      const salt = await bcyrpt.genSalt(10);
      const hash = await bcyrpt.hash(newUser.password, salt);

      newUser.password = hash;

      const user = await newUser.save();

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Could not save new user",
        error
      });
    }
  }
};
