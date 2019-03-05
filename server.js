require("./server/config/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

const users = require("./server/routes/api/users");
const profile = require("./server/routes/api/profile");
const posts = require("./server/routes/api/posts");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.moment = require("moment");

// Passport Middleware & configuration
app.use(passport.initialize());
require("./server/config/passport")(passport);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("connected to DB..."))
  .catch(err => console.log("Failed to connect to DB...", err));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`devkonector running on http://localhost:${port}`)
);
