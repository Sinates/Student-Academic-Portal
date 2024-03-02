const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const path = require("path");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
require("dotenv").config();

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};
const AUTH_OPTONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google Profile", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTONS, verifyCallback));
//Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//Read the session form the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

const app = express();
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    //Key Cookie key 1 will be the current one once key 2 is set new signins will
    // use the second one till all shift to the new one and old will get depricated.
  })
);
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log("Current user is:", req.user);
  isLoggedIn = req.isAuthenticated() && req.user; //If both values are truthy then sets its to bool true
  if (!isLoggedIn) {
    res.status(401).json({
      error: "You must be logged in",
    });
  }
  next();
}

app.use(
  cors({
    origin: "https://localhost",
  })
);

// app.use(morgan("combined"));
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failiureRedirect: "/failiure",
    successRedirect: "/",
    session: true, //No need to set actually default value is true
  }),
  (req, res) => {
    console.log("Callback from google!");
  }
);
app.get("/auth/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Secret is 30");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get("/failiure", (req, res) => {
  return res.send("Failed to login!");
});

module.exports = app;
