const gravatar = require("gravatar");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = process.env.USER_SECRET;

const User = require("../model/User");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

module.exports = {
  // Get all Users
  allUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password -__v");
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
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
      // A user with the email already exists
      errors.email = "Email already exists";
      return res.status(400).json({
        errors,
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

      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        date: user.date
      });
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
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    // Find the user
    let user = await User.findOne({ email });

    if (!user) {
      errors.email = "No such user found! Invalid Email";
      return res.status(404).json({
        errors,
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
        errors.password = "Incorrect password";
        return res.status(400).json({
          errors,
          success: false
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
        error
      });
    }
  },

  // Return Current user
  current: async (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
};
