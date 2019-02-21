const gravatar = require("gravatar");
const bcyrpt = require("bcryptjs");

const User = require("../model/User");

module.exports = {
  // Get all Users
  allUsers: async (req, res) => {
    const users = await User.find();
    res.json({
      message: "All users...",
      users
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
  },

  // Login a user and Send back Token
  login: async (req, res) => {
    const { email, password } = req.body;

    // Find the user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No such user found! Invalid Email",
        success: false
      });
    }

    try {
      let isMatch = await bcyrpt.compare(password, user.password);

      if (isMatch) {
        // Generate token
        res.json({
          message: "Login Successful",
          success: true
        });
      } else {
        return res.status(400).json({
          message: "Incorrect password",
          success: false
        });
      }
    } catch (error) {}
  }
};
