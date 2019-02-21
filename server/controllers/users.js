const gravatar = require("gravatar");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.USER_SECRET;

const User = require("../model/User");

module.exports = {
  // Get all Users
  allUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json({
        message: "All users...",
        success: true,
        users
      });
    } catch (error) {
      return res.status(500).json({
        message: "Cannot get all users",
        success: false
      });
    }
  },

  // Register a new user
  register: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // A user with the email already exists
      return res.status(400).json({
        error: "Email already exists",
        success: false
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
        error,
        success: false
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
        // Matched user
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        };

        // Generate signed token
        const token = await jwt.sign(payload, secret, {
          expiresIn: 7200
        });

        // Should Token fail for what ever reason
        if (!token) {
          return res.status(400).json({
            message: "Cannot generate user Token...",
            success: false
          });
        }

        res.json({
          message: "Login Successful",
          success: true,
          token: `Bearer ${token}`
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
